from django.db import models
from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver


class Device(models.Model):
    name = models.CharField(max_length=50)
    
    def __str__(self):
        return 'device {}'.format(self.name)

class Tasks(models.Model):
    device = models.ForeignKey(Device, on_delete=models.CASCADE)
    perform_time = models.IntegerField()
    delivery_time = models.IntegerField()

    def __str__(self):
        return 'device_id: {}, id: {} r={}, q={}'.format(self.device.id, self.id, self.perform_time, self.delivery_time)

@receiver(post_delete, sender=Tasks)
@receiver(post_save, sender=Tasks)
def task_post_save_handler(sender, **kwargs):
    post_save.disconnect(task_post_save_handler, sender=sender)
    tasks = Tasks.objects.all().order_by('-perform_time')

    number_of_devices = Device.objects.all().count()
    list_of_devices = [[] for i in range(number_of_devices)]

    schedule_tasks(tasks, list_of_devices)

    post_save.connect(task_post_save_handler, sender=sender)

def schedule_tasks(tasks, list_of_devices):
    for task in tasks:
        id_of_shortest = 0
        for index, j in enumerate(list_of_devices):
            time = calculate_tasks_time(j)
            if time < calculate_tasks_time(list_of_devices[id_of_shortest]):
                id_of_shortest = index
        list_of_devices[id_of_shortest].append(task)

    for index, list_of_tasks in enumerate(list_of_devices):
        for task in list_of_tasks:                
            task.device = Device.objects.get(id=index+1)
            task.save(update_fields=['device'])    

def calculate_tasks_time(device):
    if len(device) == 0:
        return 0
    else:
        time = 0
        for i in device:
            time += i.perform_time
        return time