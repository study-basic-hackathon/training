from django.urls import path
from . import views

urlpatterns = [
    path('', views.BackendView.as_view(), name='training'),
]