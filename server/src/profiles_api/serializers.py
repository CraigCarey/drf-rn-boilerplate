from rest_framework import serializers

from . import models


class ProfileFeedItemSerializer(serializers.ModelSerializer):
    """Serializer for ProfileFeed Items"""

    class Meta:
        model = models.ProfileFeedItem
        fields = ('id', 'user_profile', 'status_text', 'created_on')
        extra_kwargs = {'user_profile': {'read_only': True}}
