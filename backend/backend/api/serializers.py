from rest_framework import serializers
from .models import Tasks, Device


class TaskSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Tasks
        fields = (
            'id',
            'device',
            'perform_time',
            'delivery_time'
        )


class DeviceSerializer(serializers.ModelSerializer):

    class Meta:
        model = Device
        fields = (
            'id', 'name'
        )