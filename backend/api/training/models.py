from django.db import models
from api.goals.models import Goal
# Create your models here.


class TrainingPlan(models.Model):
    goal = models.ForeignKey(Goal, on_delete=models.CASCADE)
    plan_name = models.CharField(max_length=200)
    # ai_generated_content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'training_plans'

class TrainingSession(models.Model):
    training_plan = models.ForeignKey(TrainingPlan, on_delete=models.CASCADE)
    session_date = models.DateField()
    completed = models.BooleanField(default=False)
    notes = models.TextField(blank = True)

    class Meta:
        db_table = 'training_sessions'