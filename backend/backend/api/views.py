from django.http import Http404, JsonResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Device, Tasks
from .serializers import TaskSerializer, DeviceSerializer


class DevicesView(APIView):

    def get(self, request, format=None):
        devices = Device.objects.all()
        serializer = DeviceSerializer(devices, many=True)
        return JsonResponse(serializer.data, safe=False)

    def post(self, request, format=None):
        return Response([1,2,3,4], status=status.HTTP_201_CREATED)


class TasksView(APIView):

    def get(self, request, format=None):
        tasks = Tasks.objects.all().order_by('device', '-perform_time')

        serializer = TaskSerializer(tasks, many=True)
        return JsonResponse(serializer.data, safe=False)

    def post(self, request, format=None):
        task = request.data['task']
        serializer = TaskSerializer(data=task)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)


class TaskDetailView(APIView):

    serializer_class = TaskSerializer

    def get(self,request, format=None):
        task = Tasks.objects.get(pk=request.data['id'])
        serializer = self.serializer_class(task)
        return Response(serializer.data)

    def put(self,request, format=None):
        task = Tasks.objects.get(pk=request.data['id'])
        serializer = self.serializer_class(task, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self,request, format=None):
        task = Tasks.objects.get(pk=request.GET.get('id', ''))
        task.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
