from datetime import date

from django.contrib.auth import get_user_model
from django.test import TestCase
from django.urls import reverse
from django.utils import timezone

from rest_framework import status
from rest_framework.test import APIClient
from rest_framework_simplejwt.tokens import RefreshToken

from .models import Announcement, Contact, Event, NewsPost, Program, Service

User = get_user_model()


def make_user(email="core@elim.se", password="Sekret123!"):
    return User.objects.create_user(
        email=email,
        username=email,
        first_name="Test",
        last_name="User",
        password=password,
    )


def auth_client(user):
    client = APIClient()
    refresh = RefreshToken.for_user(user)
    client.credentials(HTTP_AUTHORIZATION=f"Bearer {str(refresh.access_token)}")
    return client


# ── Health check ──────────────────────────────────────────────────────────────


class HealthCheckTest(TestCase):

    def test_health_returns_ok(self):
        resp = self.client.get("/api/health/")
        self.assertEqual(resp.status_code, 200)
        self.assertEqual(resp.json(), {"status": "ok"})


# ── Church info ───────────────────────────────────────────────────────────────


class ChurchInfoTest(TestCase):

    def test_church_info_public(self):
        resp = self.client.get(reverse("church-info"))
        self.assertNotEqual(resp.status_code, status.HTTP_404_NOT_FOUND)
        self.assertNotEqual(resp.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)


# ── Announcements ─────────────────────────────────────────────────────────────


class AnnouncementPublicTest(TestCase):

    def setUp(self):
        Announcement.objects.create(
            title="Test Announcement",
            description="Announcement body",
            date=date.today(),
            is_active=True,
        )

    def test_list_announcements_is_public(self):
        resp = self.client.get(reverse("announcement-list"))
        self.assertEqual(resp.status_code, status.HTTP_200_OK)

    def test_announcements_returns_list(self):
        resp = self.client.get(reverse("announcement-list"))
        data = resp.json()
        self.assertTrue(isinstance(data, (list, dict)))


# ── Services ──────────────────────────────────────────────────────────────────


class ServicePublicTest(TestCase):

    def setUp(self):
        Service.objects.create(
            title="Sunday Service",
            description="Weekly gathering",
            date_time=timezone.now(),
            is_active=True,
        )

    def test_services_list_public(self):
        resp = self.client.get(reverse("service-list"))
        self.assertEqual(resp.status_code, status.HTTP_200_OK)

    def test_upcoming_services_public(self):
        resp = self.client.get(reverse("upcoming-services"))
        self.assertIn(
            resp.status_code, [status.HTTP_200_OK, status.HTTP_204_NO_CONTENT]
        )


# ── News ──────────────────────────────────────────────────────────────────────


class NewsPublicTest(TestCase):

    def setUp(self):
        self.user = make_user()
        NewsPost.objects.create(
            title="Church News",
            content="Some news content",
            author=self.user,
            is_published=True,
        )

    def test_news_list_public(self):
        resp = self.client.get(reverse("news-list"))
        self.assertEqual(resp.status_code, status.HTTP_200_OK)

    def test_latest_news_public(self):
        resp = self.client.get(reverse("latest-news"))
        self.assertEqual(resp.status_code, status.HTTP_200_OK)


# ── Events ────────────────────────────────────────────────────────────────────


class EventPublicTest(TestCase):

    def setUp(self):
        self.event = Event.objects.create(
            title="Summer Festival",
            description="Annual summer event",
            start_date=timezone.now(),
            location="Elim Church",
            is_active=True,
        )

    def test_events_list_public(self):
        resp = self.client.get(reverse("event-list"))
        self.assertEqual(resp.status_code, status.HTTP_200_OK)

    def test_event_detail_public(self):
        resp = self.client.get(reverse("event-detail", kwargs={"pk": self.event.pk}))
        self.assertEqual(resp.status_code, status.HTTP_200_OK)
        self.assertEqual(resp.json()["title"], "Summer Festival")


# ── Programs ──────────────────────────────────────────────────────────────────


class ProgramPublicTest(TestCase):

    def setUp(self):
        Program.objects.create(
            name="Alpha Course",
            type="alpha",
            description="Introduction course",
            schedule="Fridays 19:00",
            location="Elim Church",
            is_active=True,
        )

    def test_programs_list_public(self):
        resp = self.client.get(reverse("program-list"))
        self.assertEqual(resp.status_code, status.HTTP_200_OK)


# ── Contact form ──────────────────────────────────────────────────────────────


class ContactTest(TestCase):

    def test_contact_create(self):
        url = reverse("contact-create")
        data = {
            "name": "Anna Svensson",
            "email": "anna@example.com",
            "subject": "Question",
            "message": "Hello, I have a question about the Alpha course.",
        }
        resp = self.client.post(url, data, format="json")
        self.assertIn(resp.status_code, [status.HTTP_201_CREATED, status.HTTP_200_OK])
        self.assertTrue(Contact.objects.filter(email="anna@example.com").exists())

    def test_contact_requires_fields(self):
        url = reverse("contact-create")
        resp = self.client.post(url, {}, format="json")
        self.assertEqual(resp.status_code, status.HTTP_400_BAD_REQUEST)


# ── Portal auth required ──────────────────────────────────────────────────────


class PortalAuthRequiredTest(TestCase):

    def test_portal_announcements_requires_auth(self):
        resp = self.client.get(reverse("portal-announcement-list"))
        self.assertEqual(resp.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_portal_events_requires_auth(self):
        resp = self.client.get(reverse("portal-event-list"))
        self.assertEqual(resp.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_portal_alpha_program_requires_auth(self):
        resp = self.client.get(reverse("portal-alpha-program"))
        self.assertEqual(resp.status_code, status.HTTP_401_UNAUTHORIZED)


# ── Portal authenticated access ───────────────────────────────────────────────


class PortalAuthenticatedTest(TestCase):

    def setUp(self):
        self.user = make_user()
        self.client = auth_client(self.user)

    def test_portal_announcements_authenticated(self):
        resp = self.client.get(reverse("portal-announcement-list"))
        # Group check may return 403, but not 401
        self.assertNotEqual(resp.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_portal_events_authenticated(self):
        resp = self.client.get(reverse("portal-event-list"))
        self.assertNotEqual(resp.status_code, status.HTTP_401_UNAUTHORIZED)
