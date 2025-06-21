import os
import google.generativeai as genai
from dotenv import load_dotenv
from backend.api.services.prompt_builder import build_prompt

# .env 読み込み
load_dotenv()
api_key = os.getenv("GENAI_API_KEY")

# APIキー設定
genai.configure(api_key=api_key)

# モデルの指定
model = genai.GenerativeModel(model_name="gemini-1.5-flash")  # or "gemini-1.5-pro"

# セッション開始
chat = model.start_chat()

def generate_training_plan(goal, goal_description, exercises, frequency, start_date, end_date):
    data = {
        "goal": goal,
        "goal_description": goal_description,
        "exercises": exercises,
        "frequency": frequency,
        "start_date": start_date,
        "end_date": end_date
    }

    # プロンプト生成
    prompt = build_prompt(data)
    print("送信プロンプト:", prompt)

    # AIへメッセージ送信
    response = chat.send_message(prompt)

    # AIの返答を返す
    return response.text

print("AIの返答:", response)