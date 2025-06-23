# backend/api/services/prompt_builder.py
import datetime # 日付操作のためにdatetimeモジュールをインポート

def build_prompt(data: dict) -> str:
    """
    ユーザーからのトレーニングプラン生成のための情報を基に、AIに渡すプロンプトを構築します。
    すべての利用可能な入力フィールドをプロンプトに含めます。
    """
    # 必須または主要なフィールドの取得。デフォルト値は、データが存在しない場合のフォールバックです。
    # exercises と frequency は views.py でリストに変換されてから渡される想定です。
    name = data.get("name", "未設定のトレーニングプラン")
    exercises = "、".join(data.get("exercises", [])) if isinstance(data.get("exercises"), list) else data.get("exercises", "指定なし")
    goal = data.get("goal", "健康維持")
    frequency = "、".join(data.get("frequency", [])) if isinstance(data.get("frequency"), list) else data.get("frequency", "指定なし")
    
    # start_date と end_date のデフォルト値を今日と1ヶ月後に設定
    today = datetime.date.today()
    # 約1ヶ月後として30日後を設定。必要に応じてより厳密な計算も可能です。
    one_month_later = today + datetime.timedelta(days=30) 
    # data.get() で値が取得できない場合、今日の日付と1ヶ月後の日付をYYYY-MM-DD形式で設定
    start_date = data.get("start_date", today.strftime("%Y-%m-%d"))
    end_date = data.get("end_date", one_month_later.strftime("%Y-%m-%d"))
    
    # これらのフィールドは、文字列または空文字列として渡されることを想定し、
    # 空の場合には「指定なし」というテキストを挿入します。
    available_equipment = data.get("available_equipment", "").strip() or "指定なし"
    custom_exercise = data.get("custom_exercise", "").strip() or "指定なし"
    focus_areas = data.get("focus_areas", "").strip() or "指定なし"
    health_limitations = data.get("health_limitations", "").strip() or "指定なし"
    session_length = data.get("session_length", "").strip() or "指定なし" # 文字列として取得

    # AIへのプロンプトを構築
    # 追加された情報をプロンプトに含め、AIがより具体的なプランを生成できるようにします。
    prompt = f"""あなたは経験豊富なフィットネストレーナーです。以下の情報に基づいて、実践的で効果的なトレーニングプランをJSON形式で作成してください。

トレーニングプランの要件:
目標: {goal}
一日の総トレーニング時間（分）: {session_length}
実施頻度: {frequency}
期間: {start_date} から {end_date} まで
含まれる可能性のある運動: {exercises}
特別なカスタム運動の要望: {custom_exercise}
利用可能な設備/器具: {available_equipment}
重点的に鍛えたい部位: {focus_areas}
健康上の制限事項: {health_limitations}

出力形式:
JSON形式で、各日付に対応するトレーニング内容をリストで提供してください。
各要素は date (YYYY-MM-DD形式の文字列) と exercise (HTMLの<ul>タグでフォーマットされた運動内容) の2つのキーを持つオブジェクトにしてください。
exercise の内容は、種目、回数、セット数などを具体的に記述し、<ul>と<li>タグを使って整形してください。
重要: 各日においてトレーニング時間の合計は、一日のトレーニング時間を超えないように調整してください。指定された期間内で、実施頻度で、曜日が指定されていたらその曜日のトレーニングプランを作成してください。該当しない曜日はプランに含めないでください。
運動内容には、目標達F成に役立つ具体的な種目を含め、強度やセット数も適切に設定してください。

例:
[
  {{ "date": "2025-07-01", "exercise": "<ul><li>スクワット：10回 × 3セット</li><li>プッシュアップ（膝つきでも可）：10回 × 3セット</li><li>バックエクステンション：10回 × 3セット</li><li>プランク：30秒 × 3セット</li></ul>" }},
  {{ "date": "2025-07-02", "exercise": "<ul><li>ランニング：30分</li></ul>" }}
]
""".strip()

    return prompt

