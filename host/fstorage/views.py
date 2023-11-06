import os.path
from django.http import HttpResponse, FileResponse
from django.contrib.auth.models import User
from datetime import datetime

from rest_framework.decorators import api_view

from .models import Storage_model, User_file
from rest_framework import status
from rest_framework.parsers import JSONParser
from rest_framework.permissions import AllowAny, IsAdminUser, IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from .serializers import Storage_serializer, File_serializer
from .user_rights import user_rights
import logging

logger = logging.getLogger(__name__)


class StorageViewSet(ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Storage_model.objects.all()
    serializer_class = Storage_serializer
    http_method_names = ['get']

    def list(self, request, *args, **kwargs):
        try:
            owner = User.objects.filter(username=self.request.user)[0].id
            storage = Storage_model.objects.filter(owner=owner)
            serializer = self.get_serializer(storage, many=True)
            logger.info(f"user {self.request.user} get his store")
            return Response(serializer.data)
        except:
            logger.warning('Something wrong in StorageViewSet => List')
            return Response(status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, pk=None):
        try:
            if self.request.user.is_staff:
                storage = Storage_model.objects.filter(owner=pk)
                serializer = self.get_serializer(storage, many=True)
                return Response(serializer.data)
                logger.info(f'admin {self.request.user} get {storage} storage')
            else:
                logger.warning(f'user try {self.request.user} get {pk} storage')
                return Response(status=status.HTTP_403_FORBIDDEN)
        except:
            logger.error('Something wrong in StorageViewSet => retrieve')
            return Response(status=status.HTTP_400_BAD_REQUEST)


class FileViewSet(ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = User_file.objects.all()
    serializer_class = File_serializer
    http_method_names = ['get', 'post', 'patch', 'delete']

    def list(self, request, *args, **kwargs):
        try:
            owner_id = User.objects.filter(username=self.request.user)[0].id
            storage = Storage_model.objects.filter(owner=owner_id)[0].id
            files = User_file.objects.filter(storage_id=storage)
            serializer = self.get_serializer(files, many=True)
            logger.info(f"user {self.request.user} get his files")
            return Response(serializer.data)
        except:
            logger.warning('Something wrong in StorageViewSet => retrieve')
            return Response(status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, *args, **kwargs):
        logger.warning(f'user try {self.request.user} get files')
        return Response(status=status.HTTP_403_FORBIDDEN)

    def update(self, request, *args, **kwargs):
        logger.warning(f'user {self.request.user} try update files')
        return Response(status=status.HTTP_403_FORBIDDEN)

    def partial_update(self, request, pk=None):
        try:
            if self.request.user.is_staff or user_rights(request.user, pk):
                serializer = File_serializer([request.data, pk], data=request.data, partial=True)
                serializer.is_valid()
                serializer.save()
                logger.info(f'admin {self.request.user} change {pk} file')
                return Response(status=status.HTTP_202_ACCEPTED)
            else:
                logger.warning(f'user {self.request.user} try change files {pk}')
                return Response(status=status.HTTP_403_FORBIDDEN)
        except:
            logger.error('Something wrong in FileViewSet => partial_update')
            return Response(status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None):
        try:
            if self.request.user.is_staff or user_rights(request.user, pk):
                file = User_file.objects.filter(id=pk)[0]
                file_path = os.path.join(file.file_path, file.file_name)
                if os.path.isfile(file_path):
                    os.remove(file_path)
                    file.delete()
                    logger.info(f'user {self.request.user} delete {pk} file')
                    return Response(status=status.HTTP_202_ACCEPTED)
                else:
                    logger.info(f'when deleting a file {pk}, the file was not found')
                    return Response(status=status.HTTP_404_NOT_FOUND)

            else:
                logger.warning(f'user {self.request.user} try delete files {pk}')
                return Response(status=status.HTTP_403_FORBIDDEN)
        except:
            logger.error('Something wrong in FileViewSet => destroy')
            return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(http_method_names=['GET'])
def file_download(request):
    try:
        file_name = request.GET.get('f')
        file = User_file.objects.filter(file_name=file_name)
        if len(file) > 0:
            file[0].last_download = datetime.date(datetime.now())
            file[0].save()
            response = FileResponse(open(f'{file[0].file_path}/{file[0].file_name}', 'rb'))
            response['Content-Disposition'] = 'attachment; filename=' + file[0].original_file_name
            response['X-Sendfile'] = file[0].original_file_name
            logger.info(f'the file {file[0].id} was downloaded by an external user')
            return response
        else:
            logger.info(f'the file {file_name} not found')
            return Response(status=status.HTTP_404_NOT_FOUND)
    except:
        logger.error('Something wrong in file_download')
        return Response(status=status.HTTP_404_NOT_FOUND)


