"""
URL configuration for config project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
# config/urls.py
from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView # 追加
from django.conf import settings # 追加
from django.conf.urls.static import static # 追加
from django.views.static import serve as static_serve # <-- この行を追加！
from django.urls import path, include, re_path # re_path をインポート！
import os # 追加

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/training/', include('api.training.urls')),  # スラッシュを追加
]

# 開発サーバーで静的ファイルとメディアファイルを配信するための設定 (本番環境では使用しない)
if settings.DEBUG:
    # 1. Djangoの管理画面やその他の静的ファイル（STATIC_URLで指定されたパス）を配信
    # STATIC_ROOT に collectstatic で集められたファイルがここから配信されます
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

    # 2. Viteでビルドされたフロントエンドのファイルを直接配信するルールを追加
    # この設定は、ビルドされた index.html とそのアセット（CSS/JS/画像など）を正しくMIMEタイプで配信します。
    # settings.BASE_DIR.parent はプロジェクトルート (C:\...\training) を指す
    frontend_dist_path = os.path.join(settings.BASE_DIR.parent, 'frontend', 'dist')

    # Viteが出力するアセットファイル（JS, CSS, SVGなど）を正しくMIMEタイプで配信するための正規表現
    # '/assets/' ディレクトリ内のファイルと、ルート直下の特定のファイル（vite.svgなど）を対象
    urlpatterns += [
        re_path(
            r'^(?P<path>(assets/.*|[^/]+\.(?:svg|ico|png|jpg|jpeg|gif|css|js|woff|woff2|ttf|eot)))$',
            static_serve,
            {'document_root': frontend_dist_path}
        ),
    ]

    # 3. SPA のインデックスHTMLを配信するルートを、**最も低い優先順位**で追加する
    # これにより、APIリクエストや静的ファイルのリクエストが先に処理され、
    # それらにマッチしないパスのみが index.html にフォールバックします。
    urlpatterns += [
        path('', TemplateView.as_view(template_name='index.html')), # ルートURL (/) にアクセスした場合
        # SPAのルーティングのために、API、Admin、静的ファイルにマッチしない全てのパスを index.html にフォールバックさせる
        # (?!...) は否定の先読み (Negative Lookahead) で、指定されたパターンで始まらないものにマッチします。
        re_path(r'^(?!api/)(?!admin/)(?!static/)(?P<path>.*)$', TemplateView.as_view(template_name='index.html')),
    ]