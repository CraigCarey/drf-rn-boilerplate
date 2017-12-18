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

    def tearDown(self):
        self.user1.delete()

    def test_create_todo(self):
        """
        Registered user can create new todo
        """
        test_data = {
            'todo_text': "Test todo"
        }
        request = self.factory.post('', test_data, format='json')
        force_authenticate(request, user=self.user1)
        todo_post_view = TodoViewSet.as_view({'post': 'create'})
        response = todo_post_view(request)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        new_todo = TodoItem.objects.get(pk=response.data['id'])
        self.assertEquals(new_todo.todo_text, response.data['todo_text'])
        self.assertEquals(new_todo.owner.pk, self.user1.pk)
