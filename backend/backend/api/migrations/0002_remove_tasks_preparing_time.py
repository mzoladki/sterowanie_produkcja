# Generated by Django 2.1.4 on 2018-12-14 23:03

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='tasks',
            name='preparing_time',
        ),
    ]
