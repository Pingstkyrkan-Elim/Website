from django.contrib.auth import get_user_model
from django.test import TestCase
from django.urls import reverse

from rest_framework import status
from rest_framework.test import APIClient
from rest_framework_simplejwt.tokens import RefreshToken

User = get_user_model()


def make_user(email="test@elim.se", password="Sekret123!", **kwargs):
    defaults = dict(username=email, first_name="Test", last_name="User")
    defaults.update(kwargs)
    return User.objects.create_user(email=email, password=password, **defaults)


def auth_client(user):
    client = APIClient()
    refresh = RefreshToken.for_user(user)
    client.credentials(HTTP_AUTHORIZATION=f"Bearer {str(refresh.access_token)}")
    return client


# ── Model tests ───────────────────────────────────────────────────────────────


class CustomUserModelTest(TestCase):

    def test_create_user(self):
        user = make_user()
        self.assertEqual(user.email, "test@elim.se")
        self.assertTrue(user.check_password("Sekret123!"))

    def test_full_name_property(self):
        user = make_user(first_name="Anna", last_name="Svensson")
        self.assertEqual(user.full_name, "Anna Svensson")

    def test_str(self):
        user = make_user(first_name="Anna", last_name="Svensson")
        self.assertIn("Anna", str(user))
        self.assertIn("test@elim.se", str(user))

    def test_username_field_is_email(self):
        self.assertEqual(User.USERNAME_FIELD, "email")

    def test_email_is_unique(self):
        make_user(email="unique@elim.se")
        with self.assertRaises(Exception):
            make_user(email="unique@elim.se")


# ── Auth endpoint tests ───────────────────────────────────────────────────────


class AuthEndpointTest(TestCase):

    def setUp(self):
        self.client = APIClient()
        self.user = make_user(email="auth@elim.se", password="Sekret123!")

    def test_login_returns_tokens(self):
        url = reverse("portal-login")
        resp = self.client.post(
            url, {"email": "auth@elim.se", "password": "Sekret123!"}, format="json"
        )
        self.assertEqual(resp.status_code, status.HTTP_200_OK)
        self.assertIn("access", resp.data)
        self.assertIn("refresh", resp.data)

    def test_login_wrong_password(self):
        url = reverse("portal-login")
        resp = self.client.post(
            url, {"email": "auth@elim.se", "password": "wrong"}, format="json"
        )
        self.assertEqual(resp.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_me_requires_auth(self):
        url = reverse("portal-me")
        resp = self.client.get(url)
        self.assertEqual(resp.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_me_authenticated(self):
        client = auth_client(self.user)
        url = reverse("portal-me")
        resp = client.get(url)
        self.assertEqual(resp.status_code, status.HTTP_200_OK)
        self.assertEqual(resp.data["email"], "auth@elim.se")

    def test_token_refresh(self):
        refresh = RefreshToken.for_user(self.user)
        url = reverse("token-refresh")
        resp = self.client.post(url, {"refresh": str(refresh)}, format="json")
        self.assertEqual(resp.status_code, status.HTTP_200_OK)
        self.assertIn("access", resp.data)


# ── Registration ──────────────────────────────────────────────────────────────


class UserRegistrationTest(TestCase):

    def setUp(self):
        self.client = APIClient()

    def test_register_user(self):
        url = reverse("user-register")
        data = {
            "email": "new@elim.se",
            "username": "new@elim.se",
            "first_name": "New",
            "last_name": "Member",
            "password": "Sekret123!",
            "password_confirm": "Sekret123!",
        }
        resp = self.client.post(url, data, format="json")
        self.assertEqual(resp.status_code, status.HTTP_201_CREATED)
        self.assertTrue(User.objects.filter(email="new@elim.se").exists())

    def test_register_duplicate_email(self):
        make_user(email="dup@elim.se")
        url = reverse("user-register")
        data = {
            "email": "dup@elim.se",
            "username": "dup@elim.se",
            "first_name": "Dup",
            "last_name": "User",
            "password": "Sekret123!",
            "password_confirm": "Sekret123!",
        }
        resp = self.client.post(url, data, format="json")
        self.assertIn(
            resp.status_code, [status.HTTP_400_BAD_REQUEST, status.HTTP_409_CONFLICT]
        )


# ── Profile ────────────────────────────────────────────────────────────────────


class UserProfileTest(TestCase):

    def setUp(self):
        self.user = make_user(email="profile@elim.se", password="Sekret123!")
        self.client = auth_client(self.user)

    def test_get_profile(self):
        url = reverse("user-profile")
        resp = self.client.get(url)
        self.assertEqual(resp.status_code, status.HTTP_200_OK)
        self.assertEqual(resp.data["email"], "profile@elim.se")

    def test_update_profile(self):
        url = reverse("user-profile-update")
        resp = self.client.patch(url, {"first_name": "Updated"}, format="json")
        self.assertEqual(resp.status_code, status.HTTP_200_OK)
        self.assertEqual(resp.data["first_name"], "Updated")
