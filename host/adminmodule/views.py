from django.contrib.auth.models import User
import shutil
import logging
from rest_framework import status, response
from rest_framework.decorators import api_view
from rest_framework.permissions import AllowAny, IsAdminUser
from rest_framework.viewsets import ModelViewSet
from .serializers import RegistrationSerializer, AdminUsersSerializer
from fstorage.models import Storage_model
from rest_framework.response import Response
from django.shortcuts import render

from django.http import request

logger = logging.getLogger(__name__)


class RegistrationViewSet(ModelViewSet):
    permission_classes = [AllowAny]
    queryset = User.objects.filter(username="")
    serializer_class = RegistrationSerializer


class AdminUsersViewSet(ModelViewSet):
    permission_classes = [IsAdminUser]
    queryset = User.objects.all()
    serializer_class = AdminUsersSerializer

    def destroy(self, request, pk=None):
        user = User.objects.filter(id=pk)[0]
        storage = Storage_model.objects.filter(owner_id=user.id)[0]
        user.delete()
        try:
            shutil.rmtree(storage.path)
            logger.info(f'User {user.id} delete')
            return Response(status=status.HTTP_202_ACCEPTED)
        except:
            logger.error(f'User {user.id} not found')
            return Response(status=status.HTTP_404_NOT_FOUND)


def index(request):
    return render(request, 'index.html')


@api_view(http_method_names=['GET'])
def user_permissions(request):
    logger.info(f'User {request.user.id} checked permissions')
    return Response({"id": request.user.id, "is_staff": request.user.is_staff})


