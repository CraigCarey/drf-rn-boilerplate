from django.test import TestCase
from rest_framework.test import APIRequestFactory, force_authenticate
from rest_framework import status
from .models import UserProfile
from .views import UserProfileViewSet


class UserProfileTests(TestCase):

    def setUp(self):
        """
        Define the test client and other test variables
        """
        self.factory = APIRequestFactory()
        self.user1 = UserProfile.objects.create_user(
            email="test1@test.com",
            name="test1",
            password="S3cr3tP@55")

    def tearDown(self):
        self.user1.delete()

    def test_get_all_users(self):
        """
        Get all users fails
        """
        request = self.factory.get('')
        user_get_view = UserProfileViewSet.as_view({'get': 'list'})
        response = user_get_view(request)
        self.assertEqual(response.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)

    def test_get_user(self):
        """
        Get user fails for anyone including owner
        """
        request = self.factory.get('')
        user_get_view = UserProfileViewSet.as_view({'get': 'retrieve'})
        response = user_get_view(request, pk=self.user1.pk)
        self.assertEqual(response.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)
        force_authenticate(request, user=self.user1)
        response = user_get_view(request, pk=self.user1.pk)
        self.assertEqual(response.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)

    def test_create_user(self):
        """
        Can register new user
        """
        new_user = {
            'email': "test2@test.com",
            'name': "test2",
            'password': "S3cr3tP@55"
        }
        request = self.factory.post('', new_user, format='json')
        user_post_view = UserProfileViewSet.as_view({'post': 'create'})
        response = user_post_view(request)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        new_user_pk = response.data['id']
        new_user_db = UserProfile.objects.get(pk=new_user_pk)
        self.assertEquals(new_user_db.email, new_user['email'])
        self.assertEquals(new_user_db.name, new_user['name'])

    def test_create_user_no_password(self):
        """
        Register user fails when no password provided
        """
        new_user = {
            'email': "test3@test.com",
            'name': "test3"
        }
        request = self.factory.post('', new_user, format='json')
        user_post_view = UserProfileViewSet.as_view({'post': 'create'})
        response = user_post_view(request)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_create_user_short_password(self):
        """
        Register user fails when password too short
        """
        new_user = {
            'email': "test4@test.com",
            'name': "test4",
            'password': "123"
        }
        request = self.factory.post('', new_user, format='json')
        user_post_view = UserProfileViewSet.as_view({'post': 'create'})
        response = user_post_view(request)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_create_user_common_password(self):
        """
        Register user fails when password too common
        """
        new_user = {
            'email': "test5@test.com",
            'name': "test5",
            'password': "password"
        }
        request = self.factory.post('', new_user, format='json')
        user_post_view = UserProfileViewSet.as_view({'post': 'create'})
        response = user_post_view(request)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_create_user_no_email(self):
        """
        Register user fails when no email provided
        """
        new_user = {
            'name': "test6",
            'password': "S3cr3tP@55"
        }
        request = self.factory.post('', new_user, format='json')
        user_post_view = UserProfileViewSet.as_view({'post': 'create'})
        response = user_post_view(request)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_create_user_bad_email(self):
        """
        Register user fails when malformed email provided
        """
        new_user = {
            'email': "test7test.com",
            'name': "test7",
            'password': "S3cr3tP@55"
        }
        request = self.factory.post('', new_user, format='json')
        user_post_view = UserProfileViewSet.as_view({'post': 'create'})
        response = user_post_view(request)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
