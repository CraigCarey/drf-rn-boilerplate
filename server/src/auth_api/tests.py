from django.test import TestCase
from rest_framework.test import APIRequestFactory, force_authenticate
from rest_framework.authtoken.models import Token
from rest_framework import status
from .models import UserProfile
from .views import UserProfileViewSet, LoginViewSet, LogoutViewSet


class UserProfileTests(TestCase):

    def setUp(self):
        """
        Define the test client and other test variables
        """
        self.factory = APIRequestFactory()
        self.password = "S3cr3tP@55"
        self.user1 = UserProfile.objects.create_user(
            email="test1@test.com",
            username="test1",
            password=self.password)

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
        test_data = {
            'email': "test2@test.com",
            'username': "test2",
            'password': self.password
        }
        request = self.factory.post('', test_data, format='json')
        user_post_view = UserProfileViewSet.as_view({'post': 'create'})
        response = user_post_view(request)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        new_user = UserProfile.objects.get(pk=response.data['id'])
        self.assertEquals(new_user.email, test_data['email'])
        self.assertEquals(new_user.username, test_data['username'])

    def test_create_user_no_password(self):
        """
        Register user fails when no password provided
        """
        test_data = {
            'email': "test3@test.com",
            'username': "test3"
        }
        request = self.factory.post('', test_data, format='json')
        user_post_view = UserProfileViewSet.as_view({'post': 'create'})
        response = user_post_view(request)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_create_user_short_password(self):
        """
        Register user fails when password too short
        """
        test_data = {
            'email': "test4@test.com",
            'username': "test4",
            'password': "123"
        }
        request = self.factory.post('', test_data, format='json')
        user_post_view = UserProfileViewSet.as_view({'post': 'create'})
        response = user_post_view(request)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_create_user_common_password(self):
        """
        Register user fails when password too common
        """
        test_data = {
            'email': "test5@test.com",
            'username': "test5",
            'password': "password"
        }
        request = self.factory.post('', test_data, format='json')
        user_post_view = UserProfileViewSet.as_view({'post': 'create'})
        response = user_post_view(request)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_create_user_no_email(self):
        """
        Register user fails when no email provided
        """
        test_data = {
            'username': "test6",
            'password': self.password
        }
        request = self.factory.post('', test_data, format='json')
        user_post_view = UserProfileViewSet.as_view({'post': 'create'})
        response = user_post_view(request)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_create_user_bad_email(self):
        """
        Register user fails when malformed email provided
        """
        test_data = {
            'email': "test7test.com",
            'username': "test7",
            'password': self.password
        }
        request = self.factory.post('', test_data, format='json')
        user_post_view = UserProfileViewSet.as_view({'post': 'create'})
        response = user_post_view(request)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_login_user_wrong_password(self):
        """
        Login fails when password is incorrect
        """
        test_data = {
            'username': self.user1.email,
            'password': 'Wr0n6Pass'
        }
        request = self.factory.post('', test_data, format='json')
        login_post_view = LoginViewSet.as_view({'post': 'create'})
        response = login_post_view(request)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_login_user_invalid_user(self):
        """
        Login fails when email isn't registered
        """
        test_data = {
            'username': "testwrong@fail.com",
            'password': self.password
        }
        request = self.factory.post('', test_data, format='json')
        login_post_view = LoginViewSet.as_view({'post': 'create'})
        response = login_post_view(request)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_login_user_email(self):
        """
        Login returns a valid Token when email and password are correct
        """
        test_data = {
            'username': self.user1.email,
            'password': self.password
        }
        request = self.factory.post('', test_data, format='json')
        login_post_view = LoginViewSet.as_view({'post': 'create'})
        response = login_post_view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        user_token = Token.objects.get(user=self.user1.pk)
        self.assertEquals(str(user_token), response.data['token'])

    def test_login_user_username(self):
        """
        Login returns a valid Token when username and password are correct
        """
        test_data = {
            'username': self.user1.username,
            'password': self.password
        }
        request = self.factory.post('', test_data, format='json')
        login_post_view = LoginViewSet.as_view({'post': 'create'})
        response = login_post_view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        user_token = Token.objects.get(user=self.user1.pk)
        self.assertEquals(str(user_token), response.data['token'])

    def test_logout_user(self):
        """
        Posting a valid token to the logout url deletes it from the server
        """
        test_data = {
            'username': self.user1.email,
            'password': self.password
        }
        request = self.factory.post('', test_data, format='json')
        login_post_view = LoginViewSet.as_view({'post': 'create'})
        response = login_post_view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        user_token = Token.objects.get(user=self.user1.pk)
        self.assertEquals(str(user_token), response.data['token'])

        request = self.factory.post('', {}, HTTP_AUTHORIZATION='Token {}'.format(user_token))
        logout_post_view = LogoutViewSet.as_view({'post': 'create'})
        response = logout_post_view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        with self.assertRaises(Token.DoesNotExist):
            Token.objects.get(user=self.user1.pk)
