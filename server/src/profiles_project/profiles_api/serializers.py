from rest_framework import serializers

from . import models


class UserProfileSerializer(serializers.ModelSerializer):
    """A serializer for our user profile object"""

    class Meta:
        model = models.UserProfile
        fields = ('id', 'email', 'name', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        """Create and return a new user"""

        user = models.UserProfile(
            email=validated_data['email'],
            name = validated_data['name']
        )

        # encrypt the password so it's stored as a hash
        user.set_password(validated_data['password'])

        user.save()

        return user


class ProfileFeedItemSerializer(serializers.ModelSerializer):
    """Serializer for ProfileFeed Items"""

    class Meta:
        model = models.ProfileFeedItem
        fields = ('id', 'user_profile', 'status_text', 'created_on')
        extra_kwargs = {'user_profile': {'read_only': True}}
