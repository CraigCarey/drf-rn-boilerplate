from rest_framework import permissions


class UpdateOwnTodos(permissions.BasePermission):
    """
    Allow users to edit their own todo
    """

    def has_object_permission(self, request, view, obj):
        """
        Check user is trying to edit their own todo
        """

        # Allow 'safe' methods (read-only, i.e. GET)
        if request.method in permissions.SAFE_METHODS:
            return True

        return obj.id == request.user.id


class PostOwnTodo(permissions.BasePermission):
    """
    Allows user to create their own todo list
    """

    def has_object_permission(self, request, view, obj):
        """
        Checks the user is trying to create their own todo list
        """

        if request.method in permissions.SAFE_METHODS:
            return True

        return obj.owner.id == request.user.id
