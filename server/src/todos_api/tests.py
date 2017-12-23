from django.test import TestCase
from django.contrib.auth import get_user_model
from rest_framework.test import APIRequestFactory, force_authenticate
from rest_framework import status
from .views import TodoViewSet
from .models import TodoItem


class TodosApiTests(TestCase):

    def setUp(self):
        """
        Define the test client and other test variables
        """
        self.factory = APIRequestFactory()
        self.password = "S3cr3tP@55"
        user_profile = get_user_model()
        self.user1 = user_profile.objects.create_user(
            email="test1@test.com",
            name="test1",
            password=self.password)
        self.todo1 = TodoItem.objects.create(
            owner=self.user1,
            name="Test todo 1"
        )

    def tearDown(self):
        self.user1.delete()

    def test_create_todo_no_login(self):
        """
        Can't create todo unless logged in
        """
        test_data = {
            'name': "Test todo"
        }
        request = self.factory.post('', test_data, format='json')
        todo_post_view = TodoViewSet.as_view({'post': 'create'})
        response = todo_post_view(request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_create_todo(self):
        """
        Registered user can create new todo
        """
        test_data = {
            'name': "Test todo"
        }
        request = self.factory.post('', test_data, format='json')
        force_authenticate(request, user=self.user1)
        todo_post_view = TodoViewSet.as_view({'post': 'create'})
        response = todo_post_view(request)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        new_todo = TodoItem.objects.get(pk=response.data['id'])
        self.assertEquals(new_todo.name, response.data['name'])
        self.assertEquals(new_todo.owner.pk, self.user1.pk)

    def test_create_empty_todo(self):
        """
        Creation of an empty todo fails
        """
        test_data = {
        }
        request = self.factory.post('', test_data, format='json')
        force_authenticate(request, user=self.user1)
        todo_post_view = TodoViewSet.as_view({'post': 'create'})
        response = todo_post_view(request)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_create_todo_no_data(self):
        """
        Creation of a todo with no data fails
        """
        test_data = {
            'name': ""
        }
        request = self.factory.post('', test_data, format='json')
        force_authenticate(request, user=self.user1)
        todo_post_view = TodoViewSet.as_view({'post': 'create'})
        response = todo_post_view(request)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_owner_put_todo(self):
        """
        Only the owner of a todo can update it
        """
        test_data = {
            'name': "New test todo text PUT"
        }
        request = self.factory.put('', test_data)
        todo_put_view = TodoViewSet.as_view({'put': 'update'})

        response = todo_put_view(request, pk=self.todo1.pk)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

        force_authenticate(request, user=self.user1)
        response = todo_put_view(request, pk=self.todo1.pk)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.todo1 = TodoItem.objects.get(pk=self.todo1.pk)
        self.assertEqual(self.todo1.name, test_data['name'])

    def test_owner_patch_todo(self):
        """
        Only the owner of a todo can partially update it
        """
        test_data = {
            'name': "New test todo text PATCH"
        }
        request = self.factory.patch('', test_data)
        todo_patch_view = TodoViewSet.as_view({'patch': 'partial_update'})

        response = todo_patch_view(request, pk=self.todo1.pk)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

        force_authenticate(request, user=self.user1)
        response = todo_patch_view(request, pk=self.todo1.pk)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.todo1 = TodoItem.objects.get(pk=self.todo1.pk)
        self.assertEqual(self.todo1.name, test_data['name'])

    def test_owner_delete_todo(self):
        """
        Only the owner of a todo can delete it
        """
        request = self.factory.delete('')
        todo_delete_view = TodoViewSet.as_view({'delete': 'destroy'})

        response = todo_delete_view(request, pk=self.todo1.pk)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

        force_authenticate(request, user=self.user1)
        response = todo_delete_view(request, pk=self.todo1.pk)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

        with self.assertRaises(TodoItem.DoesNotExist):
            TodoItem.objects.get(pk=self.todo1.pk)

    def test_get(self):
        """
        Only the owner of a todo can view it
        """
        request = self.factory.get('')
        todo_get_view = TodoViewSet.as_view({'get': 'retrieve'})
        response = todo_get_view(request, pk=self.todo1.pk)
        self.assertEquals(response.status_code, status.HTTP_401_UNAUTHORIZED)

        force_authenticate(request, user=self.user1)
        response = todo_get_view(request, pk=self.todo1.pk)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEquals(response.data['name'], self.todo1.name)
