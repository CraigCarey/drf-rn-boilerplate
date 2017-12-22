from rest_framework import serializers

from . import models


class TodoItemSerializer(serializers.ModelSerializer):
    """
    Serializer for Todo Items
    """

    class Meta:
        model = models.TodoItem
        fields = ('id', 'owner', 'name', 'done', 'created_on')
        extra_kwargs = {'owner': {'read_only': True}}
