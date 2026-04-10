from django.urls import path

from . import views

urlpatterns = [
    path("", views.UserListView.as_view(), name="user-list"),
    path("register/", views.UserCreateView.as_view(), name="user-register"),
    path("profile/", views.user_profile, name="user-profile"),
    path("profile/update/", views.update_profile, name="user-profile-update"),
    path("me/", views.UserDetailView.as_view(), name="user-detail"),
]
