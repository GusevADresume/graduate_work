from django.db import models
from django.contrib.auth.models import User


def directory_path(instance, original_file_name):
    folder = User.objects.filter(username=instance.storage.owner)[0].id
    return '{0}/{1}'.format(folder, original_file_name)


class Storage_model(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='storage')
    folder_name = models.CharField(max_length=40)
    path = models.CharField(max_length=70)


class User_file(models.Model):
    storage = models.ForeignKey(Storage_model, on_delete=models.CASCADE, related_name='file')
    file_name = models.CharField(max_length=350)
    original_file_name = models.CharField(max_length=350, null=True)
    comment = models.CharField(max_length=350, null=True)
    file = models.FileField(upload_to=directory_path)
    unique_url = models.CharField(max_length=200, null=True)
    size = models.DecimalField(max_digits=19, decimal_places=12, null=True)
    upload_date = models.DateField(auto_now=True)
    last_download = models.DateField(auto_now=False, null=True)
    file_path = models.CharField(max_length=150)
    ext = models.CharField(max_length=70)
