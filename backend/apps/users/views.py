from django.contrib.auth import get_user_model

from rest_framework import generics, permissions, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from .serializers import UserCreateSerializer, UserSerializer, UserUpdateSerializer

User = get_user_model()


# ── JWT Auth ──────────────────────────────────────────────────────────────────


class EmailTokenObtainPairSerializer(TokenObtainPairSerializer):
    """Accept email instead of username for login"""

    username_field = User.USERNAME_FIELD  # = "email"


class PortalLoginView(TokenObtainPairView):
    """POST email + password → access + refresh JWT tokens"""

    serializer_class = EmailTokenObtainPairSerializer


@api_view(["GET"])
@permission_classes([permissions.IsAuthenticated])
def portal_me(request):
    """Return current user info + portal permission groups"""
    user = request.user
    groups = list(user.groups.values_list("name", flat=True))
    return Response(
        {
            "id": user.id,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "full_name": user.full_name,
            "email": user.email,
            "groups": groups,
        }
    )


# ── Users ─────────────────────────────────────────────────────────────────────


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
