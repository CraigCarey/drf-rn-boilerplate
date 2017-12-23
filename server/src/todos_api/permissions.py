from rest_framework import permissions


class IsOwner(permissions.BasePermission):
    """
    Checks the user is trying to modify/delete their own todo item
    """

    def has_object_permission(self, request, view, obj):
        return obj.owner.id == request.user.id
