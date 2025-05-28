from django.apps import AppConfig


class TrainingConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    # name = 'training'　# ★ここを修正！
    # INSTALLED_APPS に 'api.training' と指定しているので、
    # ここもアプリのフルパス 'api.training' に変更します。
    name = 'api.training'

    # (もしあれば、verbose_name など他の設定はそのまま残してください)
    # verbose_name = "トレーニング"