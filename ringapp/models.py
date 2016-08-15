from django.db import models
from django.contrib import admin
import datetime
# Create your models here.


class Ringset(models.Model):
    name = models.CharField('ringset name', max_length=32)
    ring_length = models.IntegerField('ring length (sec)', default=2)

    def __str__(self):
        return self.name


class Ringtime(models.Model):
    ring_time = models.TimeField('ring time', default=datetime.time)
    description = models.CharField(max_length=32, blank=True)
    ringset = models.ForeignKey(Ringset, on_delete=models.CASCADE)


class Ringshedule(models.Model):
    date = models.DateField(default=datetime.date.today)
    ringset = models.ForeignKey(Ringset)


class Settings(models.Model):
    key = models.CharField(max_length=32)
    name = models.CharField(max_length=32)
    description = models.CharField(max_length=128)
    value = models.CharField(max_length=32)

    class Meta:
        verbose_name_plural = 'Settings'
