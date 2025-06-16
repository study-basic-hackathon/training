from django.urls import path
from . import views

# ★追加: AIGenerationTestView をインポート★
from .views import AIGenerationTestView 
# 

urlpatterns = [
    # ★追加: AI生成テスト用エンドポイントのパス★
    # このパスは /api/training/ai_test/ となります。
    path('ai_test/', AIGenerationTestView.as_view(), name='ai_test'),
    
    path('', views.TrainingViewSet.as_view({'get':'list'}), name='training'),
]