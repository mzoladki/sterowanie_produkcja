from django.contrib import admin
from django.urls import path
from .views import DevicesView, TasksView, TaskDetailView

urlpatterns = [
    path('devices/', DevicesView.as_view(), name='devices'),
    path('tasks/', TasksView.as_view(), name='tasks'),
    path('task-detail/', TaskDetailView.as_view(), name='task-id')
]