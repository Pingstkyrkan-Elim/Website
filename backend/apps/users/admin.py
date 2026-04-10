from django.contrib import admin
from django.contrib.auth import get_user_model
from django.contrib.auth.admin import UserAdmin

User = get_user_model()


@admin.register(User)
class CustomUserAdmin(UserAdmin):
    list_display = (
        "email",
        "username",
        "first_name",
        "last_name",
        "is_verified",
        "is_staff",
        "date_joined",
    )
    list_filter = (
        "is_staff",
        "is_superuser",
        "is_active",
        "is_verified",
        "date_joined",
    )
    search_fields = ("email", "username", "first_name", "last_name")
    ordering = ("-date_joined",)

    fieldsets = UserAdmin.fieldsets + (
        ("Additional Info", {"fields": ("bio", "profile_picture", "is_verified")}),
    )
