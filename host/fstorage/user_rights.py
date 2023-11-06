from django.contrib.auth.models import User
from .models import User_file, Storage_model


def user_rights(user, file_id):
    user_id = User.objects.filter(username=user)[0].id
    storage_id = Storage_model.objects.filter(owner_id=user_id)[0].id
    file_storage = User_file.objects.filter(id=file_id)[0].storage.id
    if file_storage == storage_id:
        return True
    return False
