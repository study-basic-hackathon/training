from rest_framework import serializers
from .models import TrainingPlan, TrainingSession

class TrainingPlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = TrainingPlan
        fields = ['id', 'goal', 'plan_name', 'created_at']

class TrainingSessionSerializer(serializers.ModelSerializer):
    class Meta:
        model =TrainingSession
        fields = ['id', 'training_plan', 'session_date', 'completed', 'notes']