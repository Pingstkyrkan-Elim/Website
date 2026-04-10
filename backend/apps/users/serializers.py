from django.contrib.auth import get_user_model

from rest_framework import serializers

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    """User serializer for API responses"""

    full_name = serializers.ReadOnlyField()

    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "email",
            "first_name",
            "last_name",
            "full_name",
            "profile_picture",
            "bio",
            "is_verified",
            "date_joined",
            "created_at",
            "updated_at",
        ]
        read_only_fields = [
            "id",
            "date_joined",
            "created_at",
            "updated_at",
            "is_verified",
        ]


class UserCreateSerializer(serializers.ModelSerializer):
    """User creation serializer"""

    password = serializers.CharField(write_only=True, min_length=8)
    password_confirm = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = [
            "username",
            "email",
            "first_name",
            "last_name",
            "password",
            "password_confirm",
            "bio",
        ]

    def validate(self, attrs):
        if attrs["password"] != attrs["password_confirm"]:
            raise serializers.ValidationError("Passwords don't match")
        return attrs

    def create(self, validated_data):
        validated_data.pop("password_confirm")
        user = User.objects.create_user(**validated_data)
        return user


class UserUpdateSerializer(serializers.ModelSerializer):
    """User update serializer"""

    class Meta:
        model = User
        fields = ["first_name", "last_name", "bio", "profile_picture"]
