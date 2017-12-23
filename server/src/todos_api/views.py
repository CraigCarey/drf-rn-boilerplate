from rest_framework import viewsets
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

from . import serializers
from . import models
from . import permissions


class TodoViewSet(viewsets.ModelViewSet):
    """
    Handles creating, reading and updating Todo items
    """
    serializer_class = serializers.TodoItemSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated, permissions.IsOwner)

    def perform_create(self, serializer):
        """
        Sets the user profile to the logged in user
        """
        serializer.save(owner=self.request.user)

    def get_queryset(self):
        """
        Only return TodoItems belonging to the user
        """
        return models.TodoItem.objects.filter(owner=self.request.user)
