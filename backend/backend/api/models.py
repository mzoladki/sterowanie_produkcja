from django.db import models

class Device(models.Model):
    name = models.CharField(max_length=50)
    
    def __str__(self):
        return 'device {}'.format(self.name)

class Tasks(models.Model):
    device = models.ForeignKey(Device, on_delete=models.CASCADE)
    preparing_time = models.IntegerField()
    perform_time = models.IntegerField()
    delivery_time = models.IntegerField()

    def __str__(self):
        return 'id: {} r={}, p={}, q={}'.format(self.id, self.preparing_time, self.perform_time, self.delivery_time)