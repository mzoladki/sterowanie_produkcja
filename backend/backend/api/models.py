from django.db import models
from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
import random
from django.core import serializers

NUMBER_OF_ITERATIONS = 20
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


@receiver(post_save, sender=Tasks)
def task_post_save_handler(sender, **kwargs):
    post_save.disconnect(task_post_save_handler, sender=sender)
    number_of_tasks = Tasks.objects.all().count() - 1 
    number_of_devices = Device.objects.all().count()
    
    delay = 1000000000000
    new_delay = 0
    for _ in range(NUMBER_OF_ITERATIONS):
        tasks = list(Tasks.objects.all())#.order_by('-perform_time') if we want to schedule by perform time
        list_of_devices = [[] for _ in range(number_of_devices)]
        
        for task in tasks:
            task.pk = None
        Tasks.objects.all().delete()

        if _ > 0 and delay >= new_delay:
            delay = new_delay
            change_order_of_the_tasks(tasks, number_of_tasks, number_of_devices)
        schedule_tasks(tasks, list_of_devices)
        new_delay = count_delay(list_of_devices)

        print('delay', delay)
    post_save.connect(task_post_save_handler, sender=sender)


def count_delay(list_of_devices):
    delay = 0
    for index, station in enumerate(list_of_devices):
        cmax = 0
        delay_on_task = 0
        for task in station:
            cmax += task[1].perform_time
            delay_on_task = cmax - task[1].delivery_time
            if delay < delay_on_task:
                delay = delay_on_task
    return delay


def schedule_tasks(tasks, list_of_devices):
    for id_of_the_task, task in enumerate(tasks):
        id_of_shortest = 0
        for index, j in enumerate(list_of_devices):
            time = calculate_tasks_time(j)
            if time < calculate_tasks_time(list_of_devices[id_of_shortest]):
                id_of_shortest = index
        list_of_devices[id_of_shortest].append((id_of_the_task, task))

    # adding device
    for index, list_of_tasks in enumerate(list_of_devices):
        for task in list_of_tasks:                
            task[1].device = Device.objects.get(id=index+1)
    
    # saving
    list_of_tasks = list_of_devices[0] + list_of_devices[1] + list_of_devices[2]
    list_of_tasks.sort(key=lambda x: x[0])
    for index, task in list_of_tasks:
        task.save()

    
def calculate_tasks_time(device):
    if len(device) == 0:
        return 0
    else:
        time = 0
        for i in device:
            time += i[1].perform_time
        return time

def change_order_of_the_tasks(tasks, number_of_tasks, number_of_devices):
    if len(tasks) > 1:
        index_of_first_task = random.randint(0, number_of_tasks)
        index_of_second_task = random.randint(0, number_of_tasks)
        # print(index_of_first_task)
        # print(index_of_second_task)
        # print(tasks)
        # for _ in tasks:
        #     print(_)
        # print('\n\n')
        tasks[index_of_first_task], tasks[index_of_second_task] = tasks[index_of_second_task], tasks[index_of_first_task]
        # for _ in tasks:
            # print(_)