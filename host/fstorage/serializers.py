from pathlib import Path
import logging
from django.contrib.auth.models import User
from .models import Storage_model, User_file
from rest_framework import serializers
import uuid
from datetime import datetime
import os
from host.settings import MEDIA_ROOT
from .rename_file import rename_file

logger = logging.getLogger(__name__)


class File_serializer(serializers.ModelSerializer):
    class Meta:
        model = User_file
        fields = ['id', 'file', 'original_file_name', 'comment', 'size', 'unique_url', 'last_download', 'upload_date']

    def create(self, validated_data):
        try:
            user = User.objects.filter(username=self.context.get("request").user)[0].id
            storage = Storage_model.objects.filter(owner_id=user)[0]
            file_name = f'{uuid.uuid5(uuid.NAMESPACE_DNS, f"python.org{datetime.now()}")}.{Path(validated_data["file"].name).suffix[1:].lower()}'
            validated_data['storage'] = storage
            validated_data['file_name'] = file_name
            validated_data['original_file_name'] = validated_data['file']
            validated_data['size'] = validated_data['file'].size
            validated_data['file_path'] = os.path.join(str(MEDIA_ROOT), str(user))
            validated_data['unique_url'] = f'http://{self.context["request"].META["HTTP_HOST"]}/download/?f={file_name}'
            validated_data['ext'] = str(Path(validated_data['file'].name).suffix[1:].lower())
            super().create(validated_data)
            rename_file(file_name)
            logger.info(f'{user} upload new file {validated_data["file_name"]}')
            return validated_data
        except:
            logger.error('file upload failed')
            return validated_data

    def update(self, instance, validated_data):
        try:
            if 'comment' in instance[0].keys():
                User_file.objects.filter(id=instance[1]).update(comment=instance[0]['comment'])
                logger.info(f'new comment on file {instance[1]} - {instance[0]["comment"]}')
            if 'original_file_name' in instance[0].keys():
                logger.info(f'change filename {instance[1]} to {instance[0]["original_file_name"]}')
                User_file.objects.filter(id=instance[1]).update(
                    original_file_name=f"{instance[0]['original_file_name']}.{User_file.objects.filter(id=instance[1])[0].ext}")
            return validated_data
        except:
            logger.error('file update failed')
            return validated_data


class Storage_serializer(serializers.ModelSerializer):
    file = File_serializer(many=True)

    class Meta:
        model = Storage_model
        fields = ['owner', 'file']


class File_shrot_data_serializer(serializers.ModelSerializer):
    class Meta:
        model = User_file
        fields = ['size']


class Shrot_storage_serializer(serializers.ModelSerializer):
    file = File_shrot_data_serializer(many=True)

    class Meta:
        model = Storage_model
        fields = ['owner', 'file']
