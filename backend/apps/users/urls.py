from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView

from . import views

urlpatterns = [
    # Portal auth
    path("auth/login/", views.PortalLoginView.as_view(), name="portal-login"),
    path("auth/refresh/", TokenRefreshView.as_view(), name="token-refresh"),
    path("auth/me/", views.portal_me, name="portal-me"),
    # Users
    path("", views.UserListView.as_view(), name="user-list"),
    path("register/", views.UserCreateView.as_view(), name="user-register"),
    path("profile/", views.user_profile, name="user-profile"),
    path("profile/update/", views.update_profile, name="user-profile-update"),
    path("me/", views.UserDetailView.as_view(), name="user-detail"),
]
