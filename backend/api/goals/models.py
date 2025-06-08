from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Goal(models.Model):
    name = models.CharField(max_length=200)
    frequency = models.CharField(max_length=200)
    start_date = models.DateField()
    end_date = models.DateField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    status = models.CharField(max_length=20, default='active')
    created_at = models.DateTimeField(auto_now_add=True) # 自動的に作成日時を設定

    class Meta:
        db_table = 'goals'  # 明示的にテーブル名を指定


class Exercise(models.Model):
    name = models.CharField(max_length=200)
    goal = models.ForeignKey(Goal, on_delete = models.CASCADE, related_name='exercises')

    class Meta:
        db_table = 'exercises'

