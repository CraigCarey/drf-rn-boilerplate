from django.conf.urls import url
from django.conf.urls import include
from rest_framework.routers import DefaultRouter

from . import views

router = DefaultRouter()
router.register('todo', views.TodoViewSet, base_name='todos')

urlpatterns = [
    url(r'', include(router.urls))
]
