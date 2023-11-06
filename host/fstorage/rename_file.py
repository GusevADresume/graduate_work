import os
from .models import User_file
from host.settings import MEDIA_ROOT


def rename_file(u_file_name):
    file = User_file.objects.filter(file_name=u_file_name)[0]
    os.rename(os.path.join(str(MEDIA_ROOT), str(file.file)),
              os.path.join(str(file.file_path + '/'), str(file.file_name)))
