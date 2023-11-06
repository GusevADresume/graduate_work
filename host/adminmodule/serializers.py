from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework.exceptions import ValidationError
import re
import logging
from passlib.hash import django_pbkdf2_sha256
from fstorage.create_store_folder import create_folder
from fstorage.serializers import Storage_serializer

logger = logging.getLogger(__name__)


class RegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'first_name', 'last_name']

    def validate(self, attrs):
        if not re.match('(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}', attrs['password']):
            logger.error('Wrong passport at check-in')
            raise ValidationError('Wrong Password')
        return attrs

    def create(self, validated_data):
        try:
            password = django_pbkdf2_sha256.hash(validated_data['password'], rounds=320000)
            validated_data['password'] = password
            super().create(validated_data)
            user = User.objects.filter(username=validated_data['username'])[0]
            create_folder(user)
            logger.info(f'New user {validated_data["username"]} create')
            return validated_data
        except:
            logger.error(f'New user {validated_data["username"]} do not create')
            return validated_data


class AdminUsersSerializer(serializers.ModelSerializer):
    storage = Storage_serializer(many=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'is_staff', 'storage', 'first_name', 'last_name']
