from rest_framework import viewsets
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from . import serializers
from . import models
from . import permissions


class UserProfileFeedViewSet(viewsets.ModelViewSet):
    """Handles creating, reading and updating profile feed items"""

    serializer_class = serializers.ProfileFeedItemSerializer
    queryset = models.ProfileFeedItem.objects.all()
    authentication_classes = (TokenAuthentication,)
    permission_classes = (permissions.PostOwnStatus, IsAuthenticatedOrReadOnly)

    def perform_create(self, serializer):
        """Sets the user profile to the logged in user"""

        serializer.save(user_profile=self.request.user)
