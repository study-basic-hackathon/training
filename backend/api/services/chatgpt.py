import os
import json # JSONのパースとエラーハンドリングのために追加
import google.generativeai as genai
from dotenv import load_dotenv
from .prompt_builder import build_prompt
import re

# .env 読み込み
load_dotenv()
api_key = os.getenv("GOOGLE_API_KEY")
if not api_key:
    raise ValueError("GEMINI_API_KEY が設定されていません。.envファイルを確認してください。")
# APIキー設定
genai.configure(api_key=api_key)

# モデルの指定
model = genai.GenerativeModel(model_name="gemini-1.5-flash")  # or "gemini-1.5-pro"

# 以下は、AIから返ってきた「JSON風テキスト」から
# コメント（や#で始まる行）
# コードブロック（json ... )
# 末尾の余計なカンマ
# 先頭・末尾の説明文
# を除去し、有効なJSONだけを抽出するプリプロセス関数です。
import re
def clean_json_response(response_text):
    # 1. ```json ... ``` で囲まれている場合はその中だけ抽出
    match = re.search(r"```json\s*(.*?)\s*```", response_text, re.DOTALL)
    if match:
        response_text = match.group(1)
    # 2. コメント行（//や#で始まる）を削除
    response_text = re.sub(r'^\s*(//|#).*$', '', response_text, flags=re.MULTILINE)
    # 3. 末尾のカンマを削除（配列やオブジェクトの直前）
    response_text = re.sub(r',(\s*[\]}])', r'\1', response_text)
    # 4. 空行を削除
    response_text = '\n'.join([line for line in response_text.splitlines() if line.strip() != ''])
    # 5. 前後の空白を除去
    response_text = response_text.strip()
    return response_text

# TODO: ここからAIにトレーニングプランを生成させる関数を定義します。
def generate_training_plan(data: dict) -> list:
    """
    フロントから渡される引数の例:
    data = {
        "name": "3ヶ月ダイエット",
        "exercises": ランニング", "水泳", // 配列ではなく、何でもOKのインプットにしました。
        "goal": "やせる",
        "frequency": "月", "水", "金", // 配列ではなく、曜日でも「週2回」でも何でもOKにしました
        "start_date": "2025-05-29",
        "end_date": "2025-08-29"
    }
    """
    
    # プロンプト生成
    prompt = build_prompt(data)
    print(prompt)
    
    # セッション開始
    chat = model.start_chat()

    # ユーザーのメッセージ送信
    response = chat.send_message(prompt)
    
    # AIの返答表示
    print("AIの返答:", response.text)

    # TODO:AIの応答を整形
    cleaned_response = clean_json_response(response.text)
    print("整形後の応答:", cleaned_response)

    # TODO:AIの応答をJSONとしてパース
    try:
        # JSON文字列をPythonのリスト/辞書に変換
        parsed_plan = json.loads(cleaned_response)
        print("パース済みプラン:", parsed_plan)
    except json.JSONDecodeError as e:
        print(f"JSONパースエラー: {e}")
        print(f"パースに失敗した文字列:\n{cleaned_response}")
        # エラーが発生した場合は、フロントエンドにエラーを伝えるか、空のリストを返す
        return [{"date": "Error", "exercise": f"JSONパースエラーが発生しました: {e}"}]
    except Exception as e:
        print(f"予期せぬエラー: {e}")
        return [{"date": "Error", "exercise": f"予期せぬエラーが発生しました: {e}"}]
    # TODO:パースしたものを返す
    return parsed_plan
    # 今は仮に何か応答を返しておきます。
    # return [{ "date": "2025-07-01",
    #          "exercise": "仮の応答です。/backend/api/services/chatgpt.pyを編集してください。" }]

