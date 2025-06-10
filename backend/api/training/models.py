import datetime
from django.db import models
from django.conf import settings

# Goalモデルは削除されたので、Goalモデルのインポートは不要です。
# from api.goals.models import Goal 

class TrainingPlan(models.Model):
    # goal = models.ForeignKey(Goal, on_delete=models.CASCADE)
    """
    ユーザーが持つ個々のトレーニングプランを表すモデル。
    AIが生成した詳細プラン内容を含みます。
    """
    # ユーザーとの紐付け: どのユーザーがこのプランを所有しているか (無くても良い)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='training_plans',
        verbose_name="所有ユーザー",
        null=True,   # ★ここをTrueにする★ データベースでNULLを許可
        blank=True   # ★ここをTrueにする★ フォームで空欄を許可
    )
    #後で認証機能を実装した際に、必要であればこのフィールドを null=False に戻すこともできますが、
    # 一般的には、ログインユーザーのプランと、匿名ユーザーが作成したプラン（またはログインが必須ではないプラン）を共存させるために 
    # null=True のままにすることもあります。
    
    # プラン名
    name = models.CharField(max_length=255, verbose_name="プラン名", help_text="例: 3ヶ月ダイエット")
    
    # 具体的な目標 (ユーザーが自由形式で入力するテキスト)
    goal = models.CharField(max_length=255, verbose_name="具体的な目標", 
                                       help_text="例: 体重を5kg減らす、フルマラソンを完走する") 
    
    # 運動内容 (ユーザーが自由形式で入力するテキスト)
    exercises = models.CharField(max_length=500, verbose_name="運動内容", 
                                 help_text="例: ランニング、水泳、筋トレ、ヨガ、インナーマッスルトレーニング") 
    
    # 実施頻度 (ユーザーが自由形式で入力するテキスト)
    frequency = models.CharField(max_length=255, verbose_name="実施頻度", 
                                 help_text="例: 週3回（月・水・金）、または毎日") 
    
    # プランの開始日と終了日
    start_date = models.DateField(verbose_name="開始日")
    end_date = models.DateField(verbose_name="終了日")

    # AIによって生成された詳細なトレーニングプラン内容（JSON形式で保存）
    # 例: [{'date': 'YYYY-MM-DD', 'exercise': '<ul>...</ul>'}, ...] のような構造
    plan = models.JSONField(
        verbose_name="AI生成プラン詳細", 
        help_text="AIによって生成された各日付の運動内容（JSON配列）"
    )

    # プランのステータス (例: active, completed, archived)
    status = models.CharField(
        max_length=50, 
        default='active', 
        verbose_name="プランステータス",
        help_text="例: active, completed, archived"
    )

    # 作成日時と更新日時 (自動的に設定)
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="作成日時")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="更新日時") 
    
    class Meta:
        db_table = 'training_plans' # データベースのテーブル名を明示的に指定
        verbose_name = "トレーニングプラン" # Django管理サイトでの表示名（単数形）
        verbose_name_plural = "トレーニングプラン" # Django管理サイトでの表示名（複数形）
        ordering = ['-created_at'] # デフォルトの並び順: 新しいものが上に来るように作成日時で降順ソート

    def __str__(self):
        # TrainingPlan の __str__ メソッド:
        # Django管理サイトで、TrainingPlanのオブジェクトがTrainingPlan object (1)のように表示されるのを防ぎ、plan_nameを表示させるために__str__メソッドを追加すると良いでしょう。
        
        return self.name
    
class TrainingSession(models.Model):
    training_plan = models.ForeignKey(TrainingPlan, on_delete=models.CASCADE)
    session_date = models.DateField()
    completed = models.BooleanField(default=False)
    notes = models.TextField(blank = True)
    
    class Meta:
        db_table = 'training_sessions'
