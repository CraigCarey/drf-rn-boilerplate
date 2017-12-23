from rest_framework import viewsets
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from . import serializers
from . import models


class UserProfileViewSet(viewsets.ModelViewSet):
    """
    Handles creating, reading and updating profiles
    """
    serializer_class = serializers.UserProfileSerializer
    queryset = models.UserProfile.objects.all()
    http_method_names = ['post']


class LoginViewSet(viewsets.ViewSet):
    """
    Checks email and password and return an auth token
    """
    serializer_class = AuthTokenSerializer

    def create(self, request):
        """
        Use the ObtainAuthToken APIView to validate and create a token
        """
        return ObtainAuthToken().post(request)


class LogoutViewSet(viewsets.ViewSet):
    """
    Logs the current user out EVERYWHERE by deleting their token on the server
    You may not wish to use this, and instead simply delete the client token
    """
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def create(self, request):
        """
        Remove the current authenticated users token
        """
        Token.objects.filter(user=request.user).delete()
        return Response({'success': True})
