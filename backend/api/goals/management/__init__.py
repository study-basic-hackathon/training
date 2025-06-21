from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from api.goals.models import Goal, Exercise
from datetime import date, timedelta

class Command(BaseCommand):
    help = '初期の目標データを作成します'

    def handle(self, *args, **kwargs):
        # テストユーザーを取得または作成
        user, created = User.objects.get_or_create(
            username='testuser',
            defaults={'email': 'test@example.com'}
        )
        if created:
            user.set_password('testpass123')
            user.save()
            self.stdout.write(self.style.SUCCESS(f'テストユーザーを作成しました: {user.username}'))

        # 初期目標データを作成
        goals_data = [
            {
                'name': '体重を5kg減らす',
                'frequency': 'every day',
                'exercises': ['ランニング', 'スクワット', 'プランク']
            },
            {
                'name': '筋力を向上させる',
                'frequency': '3 times a week',
                'exercises': ['ベンチプレス', 'デッドリフト', 'ショルダープレス']
            },
            {
                'name': 'マラソン完走',
                'frequency': '4 times a week',
                'exercises': ['長距離走', 'インターバル走', 'ストレッチ']
            },
            {
                'name': '柔軟性を高める',
                'frequency': 'every day',
                'exercises': ['ヨガ', 'ストレッチ', 'ピラティス']
            }
        ]

        for goal_data in goals_data:
            goal, created = Goal.objects.get_or_create(
                name=goal_data['name'],
                user=user,
                defaults={
                    'frequency': goal_data['frequency'],
                    'start_date': date.today(),
                    'end_date': date.today() + timedelta(days=90)
                }
            )
            
            if created:
                self.stdout.write(self.style.SUCCESS(f'目標を作成しました: {goal.name}'))
                
                # エクササイズを作成
                for exercise_name in goal_data['exercises']:
                    Exercise.objects.create(
                        name=exercise_name,
                        goal=goal
                    )
                    self.stdout.write(self.style.SUCCESS(f'  - エクササイズを追加: {exercise_name}'))
            else:
                self.stdout.write(self.style.WARNING(f'目標は既に存在します: {goal.name}'))

        self.stdout.write(self.style.SUCCESS('初期データの作成が完了しました！'))