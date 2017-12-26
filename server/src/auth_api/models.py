from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin


class UserProfileManager(BaseUserManager):
    """
    Class required by Django for managing our users from the management command
    """
    def create_user(self, email, username, password=None):
        """
        Creates a new user with the given details
        """
        # Check that the user provided an email
        if not email:
            raise ValueError('Users must have an email address.')

        if not password or len(password) < 8:
            raise ValueError('Users must have a password at least 8 characters long.')

        # Create a new user object.
        user = self.model(
            email=self.normalize_email(email),
            username=username
        )

        # Create a password hash instead of storing it in clear text
        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, email, username, password):
        """
        Creates and saves a new superuser with given details
        """
        # Create a new user with the function we created above
        user = self.create_user(
            email,
            username,
            password
        )

        # Make this user an admin
        user.is_superuser = True
        user.is_staff = True
        user.save(using=self._db)

        return user


class UserProfile(AbstractBaseUser, PermissionsMixin):
    """
    A user profile in our system
    """
    email = models.EmailField(max_length=255, unique=True)
    username = models.CharField(max_length=255, unique=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserProfileManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def get_full_name(self):
        """
        Required function so Django knows what to use as the users full name
        """
        self.username

    def get_short_name(self):
        """
        Required function so Django knows what to use as the users short name
        """
        self.username

    def __str__(self):
        """
        What to show when we output an object as a string
        """
        return self.username
