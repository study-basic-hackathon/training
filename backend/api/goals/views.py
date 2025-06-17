from django.shortcuts import render
from rest_framework import viewsets,status
from rest_framework.response import Response
from django.db import transaction
from .models import Goal, Exercise
from api.goals.serializers import GoalSerializer, ExerciseSerializer

from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes
from rest_framework.permissions import AllowAny
# Create your views here.

@permission_classes([IsAuthenticated])
class GoalViewSet(viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    serializer_class = GoalSerializer

    def get_queryset(self):
        if not self.request.user.is_anonymous:
            return Goal.objects.filter(user = self.request.user)
        return Goal.objects.none()
    
    @transaction.atomic
    def create(self,request):
        data = request.data

        if not data.get('name'):
            return Response(
                {'error' : '目標名は必須です'},
                status = status.HTTP_400_BAD_REQUEST
            )
        
        
        user = request.user if not request.user.is_anonymous else None
        goal = Goal.objects.create(
            name = data.get('name'),
            frequency = data.get('frequency'),
            start_date = data.get('start_date'),
            end_date = data.get('end_date'),
            user = request.user,
        )

        

        exercises_data = data.get('exercises', [])
        for index, exercises_data in enumerate(exercises_data):
            Exercise.objects.create(
                name = exercises_data.get('name'),
                goal = goal)
         
        
        # from training.services import create_trainging_plan
        # create_trainging_plan(goal)

        # serializer = self.get_serializer(goal)
        # return Response(serializer.data, status = status.HTTP_201_CREATED)


from django.http import JsonResponse

def test_view(request):
    """
    A simple test view to verify that the backend is working.
    """
    return JsonResponse({"message": "Hello from the goals app!"})