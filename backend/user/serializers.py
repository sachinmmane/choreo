from django.contrib.auth.models import User
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    class Meta :
        # Specify the model to be used for serialization
        model = User
        # Define the fields to be included in the serialization
        fields = ["id", "username", "email","password", "is_active", "first_name", "last_name", "user_permissions", "groups"]
        # Additional keyword arguments for specific fields
        extra_kwargs = {"password": {"write_only": True}} # Make the password write-only

    def create(self, validate_data):
        # Override the create method to use the create_user method from the User model
        user_permissions = validate_data.pop('user_permissions', [])
        groups = validate_data.pop('groups', [])
        user = User.objects.create_user(**validate_data)
        user.user_permissions.set(user_permissions)
        user.groups.set(groups)
        return user