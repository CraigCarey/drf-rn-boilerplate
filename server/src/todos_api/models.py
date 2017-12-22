from django.db import models


class TodoItem(models.Model):

    owner = models.ForeignKey('auth_api.UserProfile', on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    done = models.BooleanField(default=False)
    created_on = models.DateTimeField(auto_now_add=True)

    def __str__(self):

        return self.name
