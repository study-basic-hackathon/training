from rest_framework import serializers
from .models import TrainingPlan, TrainingSession

class TrainingPlanSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(read_only=True)
    class Meta:
        model = TrainingPlan
        fields = ['id', 'user', 'name', 'exercises', 'goal','frequency', 'start_date', 'end_date', 'plan','status', 'created_at', 'updated_at']
        extra_kwargs = {'plan': {'required': False}}

class TrainingSessionSerializer(serializers.ModelSerializer):
    class Meta:
        model =TrainingSession
        fields = ['id', 'training_plan', 'session_date', 'completed', 'notes']