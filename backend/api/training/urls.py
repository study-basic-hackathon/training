from django.urls import path,include
from . import views
from rest_framework.routers import DefaultRouter

# ★追加: AIGenerationTestView をインポート★
from .views import AIGenerationTestView 
 
router = DefaultRouter()
router.register(r'',views.TrainingViewSet, basename='training')
urlpatterns = [
    # ★追加: AI生成テスト用エンドポイントのパス★
    # このパスは /api/training/ai_test/ となります。
    path('ai_test/', AIGenerationTestView.as_view(), name='ai_test'),
    
    # path('', views.TrainingViewSet.as_view({'get':'list'}), name='training'),
    path('', include(router.urls)),
    
    
]