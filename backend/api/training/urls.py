from django.urls import path
from . import views

urlpatterns = [
    path('', views.TrainingViewSet.as_view({'get':'list'}), name='training'),
]