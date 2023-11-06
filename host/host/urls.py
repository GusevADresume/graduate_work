"""
URL configuration for host project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include, re_path
from rest_framework.routers import DefaultRouter
from django.urls import include

from adminmodule.views import RegistrationViewSet, AdminUsersViewSet
from fstorage.views import StorageViewSet, FileViewSet, file_download
from adminmodule.views import index, user_permissions




login_router = DefaultRouter()
login_router.register('api-reg', RegistrationViewSet)
admin_router = DefaultRouter()
admin_router.register('users-list', AdminUsersViewSet)
storage_router = DefaultRouter()
storage_router.register('storage', StorageViewSet)
f_router = DefaultRouter()
f_router.register('files', FileViewSet)

urlpatterns = [
                  path('admin/', admin.site.urls),
                  path('', index),
                  path('api-auth/', include('rest_framework.urls')),
                  path('download/', file_download),
                  path('accounts/profile/', user_permissions),
                  #re_path(r"^", index),
              ] + login_router.urls + admin_router.urls + storage_router.urls + f_router.urls

handler404 = "host.views.page_not_found_view"
