from rest_framework import viewsets
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from . import serializers
from . import models
from . import permissions


class TodoViewSet(viewsets.ModelViewSet):
    """
    Handles creating, reading and updating Todo items
    """
    serializer_class = serializers.TodoItemSerializer
    queryset = models.TodoItem.objects.all()
    authentication_classes = (TokenAuthentication,)
    permission_classes = (permissions.PostOwnTodo, IsAuthenticatedOrReadOnly)

    def perform_create(self, serializer):
        """
        Sets the user profile to the logged in user
        """
        serializer.save(owner=self.request.user)
