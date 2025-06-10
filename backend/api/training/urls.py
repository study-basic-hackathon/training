from django.urls import path, include
from . import views
from rest_framework.routers import DefaultRouter # DefaultRouter をインポート

# Django REST Framework (DRF) の ModelViewSet を使う際、
# URLパターンを手動で一つずつ定義するのは少し手間がかかります。
# そこで非常に便利なのが DefaultRouter です。

# DefaultRouter は、ModelViewSet が提供する標準的なCRUD操作（一覧取得、作成、詳細取得、更新、削除）や、
# @action デコレーターで定義したカスタムアクションのためのURLパターンを自動的に生成してくれるツールです。

# 1. DefaultRouter のインスタンスを作成
router = DefaultRouter()

# 2. ルーターにビューセットを登録
# router.register(URLのプレフィックス, ビューセットクラス, basename)
# 'training' はこのビューセットに関連するURLの基本パス（例: /api/training/）
# basename='training' は、URLのリバース（URLを名前から取得）する際に使う名前空間
router.register(r'', views.TrainingViewSet, basename='training') 
# なぜ r'' (空文字列) をプレフィックスにしているのか？
# router.register(r'', TrainingViewSet, basename='training') の r'' は、
# TrainingViewSet に関連するURLが、この urls.py ファイルがインクルードされたパスの直下に生成されることを意味します。
# つまり、config/urls.py で path('api/training/', include('api.training.urls')) としているため、
# 結果的に /api/training/ の直下に TrainingViewSet のURLが展開されます。
# この設定は非常に一般的で、DRFのビューセットを使ったAPI設計では推奨される方法の一つです。

urlpatterns = [
    path('', views.TrainingViewSet.as_view({'get':'list'}), name='training'),
]

# 3. 生成されたURLパターンをurlpatternsに含める
urlpatterns = [
    # router.urls に、routerが自動生成した全てのURLパターンが含まれています。
    path('', include(router.urls)),
]
