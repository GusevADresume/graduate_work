import os
from .models import Storage_model
from host.settings import MEDIA_ROOT


def create_storage_model(name, path):
    new_storage = Storage_model(owner=name, folder_name=name.id, path=path)
    new_storage.save()


def create_folder(user):
    path = os.path.join(str(MEDIA_ROOT), str(user.id))
    os.makedirs(path)
    create_storage_model(user, path)
