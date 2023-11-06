from django.contrib import admin
from .models import Storage_model, User_file
from .serializers import File_serializer


# Register your models here.
@admin.register(Storage_model)
class StorageAdmin(admin.ModelAdmin):
    list_display = ("owner", 'folder_name', "file_list")

    def file_list(self, obj):
        f_list = User_file.objects.filter(storage=obj.id)
        serializer = File_serializer(f_list)
        return serializer
