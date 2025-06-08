import os
import google.generativeai as genai
from dotenv import load_dotenv
from backend.api.sevices.prompt_builder import build_prompt

# .env 読み込み
load_dotenv()
api_key = os.getenv("GENAI_API_KEY")

# APIキー設定
genai.configure(api_key=api_key)

# モデルの指定
model = genai.GenerativeModel(model_name="gemini-1.5-flash")  # or "gemini-1.5-pro"

# セッション開始
chat = model.start_chat()

# フロントから渡される引数
data = {
    "name": "3ヶ月ダイエット",
    "exercises": ["ランニング", "水泳"],
    "goal": "やせる",
    "frequency": ["月", "水", "金"],
    "start_date": "2025-05-29",
    "end_date": "2025-08-29"
}

# プロンプト生成
prompt = build_prompt(data)
print(prompt)

# ユーザーのメッセージ送信
response = chat.send_message(prompt)

# AIの返答表示
print("AIの返答:", response.text)
