from rest_framework import serializers
from .models import Goal, Exercise

class ExerciseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exercise
        fields = ['id', 'name']

class GoalSerializer(serializers.ModelSerializer):
    exercises = ExerciseSerializer(many = True, read_only = True)
    class Meta:
        model = Goal
        fields = ['id', 'name', 'frequency', 'start_date', 'end_date', 'exercise', 'status', 'created_at']