from django.contrib.auth import get_user_model

from rest_framework import generics, permissions, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response

from .serializers import UserCreateSerializer, UserSerializer, UserUpdateSerializer

User = get_user_model()


class UserListView(generics.ListAPIView):
    """List all users"""

    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]


class UserCreateView(generics.CreateAPIView):
    """Create a new user"""

    queryset = User.objects.all()
    serializer_class = UserCreateSerializer
    permission_classes = [permissions.AllowAny]


class UserDetailView(generics.RetrieveUpdateDestroyAPIView):
    """Retrieve, update or delete a user"""

    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_serializer_class(self):
        if self.request.method in ["PUT", "PATCH"]:
            return UserUpdateSerializer
        return UserSerializer

    def get_object(self):
        # Users can only access their own profile
        return self.request.user


@api_view(["GET"])
@permission_classes([permissions.IsAuthenticated])
def user_profile(request):
    """Get current user's profile"""
    serializer = UserSerializer(request.user)
    return Response(serializer.data)


@api_view(["PUT", "PATCH"])
@permission_classes([permissions.IsAuthenticated])
def update_profile(request):
    """Update current user's profile"""
    serializer = UserUpdateSerializer(request.user, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(UserSerializer(request.user).data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
