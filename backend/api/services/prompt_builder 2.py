# prompt_builder.py

def build_prompt(data: dict) -> str:
    name = data.get("name", "ダイエットプラン")
    exercises = "、".join(data.get("exercises", []))
    goal = data.get("goal", "健康になる")
    frequency = "・".join(data.get("frequency", []))
    start_date = data.get("start_date", "開始日不明")
    end_date = data.get("end_date", "終了日不明")

    prompt = f"""あなたは経験豊富なフィットネストレーナーです。以下の情報に基づいて、実践的で効果的なトレーニングプランをJSON形式で作成してください。

トレーニングプランの要件:
プラン名: {name}
含まれる可能性のある運動: {exercises}
目標: {goal}
実施頻度: {frequency}
期間: {start_date} から {end_date} まで

出力形式:
JSON形式で、各日付に対応するトレーニング内容をリストで提供してください。
各要素は date (YYYY-MM-DD形式の文字列) と exercise (HTMLの<ul>タグでフォーマットされた運動内容) の2つのキーを持つオブジェクトにしてください。
exercise の内容は、種目、回数、セット数などを具体的に記述し、<ul>と<li>タグを使って整形してください。
重要: 指定された期間内で、実施頻度で指定された曜日にのみトレーニングプランを作成してください。該当しない曜日はプランに含めないでください。
運動内容には、目標達成に役立つ具体的な種目を含め、強度やセット数も適切に設定してください。

例:
[
  {{ "date": "2025-07-01", "exercise": "<ul><li>スクワット：10回 × 3セット</li><li>プッシュアップ（膝つきでも可）：10回 × 3セット</li><li>バックエクステンション：10回 × 3セット</li><li>プランク：30秒 × 3セット</li></ul>" }},
  {{ "date": "2025-07-02", "exercise": "<ul><li>ランニング：30分</li></ul>" }}
]
""".strip()

    return prompt
