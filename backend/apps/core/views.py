from django.utils import timezone

from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import generics, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.filters import OrderingFilter, SearchFilter
from rest_framework.response import Response

from .models import (
    AlphaPhoto,
    AlphaProgram,
    Announcement,
    Contact,
    Donation,
    Event,
    HistoryEntry,
    MissionCountry,
    NewsPost,
    PreTeensContent,
    Program,
    SecondHandStore,
    Service,
    TeamMember,
)
from .serializers import (
    AlphaPhotoSerializer,
    AlphaProgramSerializer,
    AnnouncementSerializer,
    ContactSerializer,
    DonationSerializer,
    EventSerializer,
    HistoryEntrySerializer,
    MissionCountrySerializer,
    NewsPostSerializer,
    PortalEventSerializer,
    PreTeensContentSerializer,
    ProgramSerializer,
    SecondHandStoreSerializer,
    ServiceSerializer,
    TeamMemberSerializer,
)


class IsKalenderUser(permissions.BasePermission):
    """Allow access only to users in the 'kalender' group"""

    def has_permission(self, request, view):
        return (
            request.user
            and request.user.is_authenticated
            and request.user.groups.filter(name="kalender").exists()
        )


class IsAnnonserUser(permissions.BasePermission):
    """Allow access only to users in the 'annonser' group"""

    def has_permission(self, request, view):
        return (
            request.user
            and request.user.is_authenticated
            and request.user.groups.filter(name="annonser").exists()
        )


class IsAlphaUser(permissions.BasePermission):
    """Allow access only to users in the 'alpha' group"""

    def has_permission(self, request, view):
        return (
            request.user
            and request.user.is_authenticated
            and request.user.groups.filter(name="alpha").exists()
        )


class IsPreTeensUser(permissions.BasePermission):
    """Allow access only to users in the 'pre-teens' group"""

    def has_permission(self, request, view):
        return (
            request.user
            and request.user.is_authenticated
            and request.user.groups.filter(name="pre-teens").exists()
        )


class ServiceListView(generics.ListAPIView):
    """List all active services"""

    queryset = Service.objects.filter(is_active=True, date_time__gte=timezone.now())
    serializer_class = ServiceSerializer
    permission_classes = [permissions.AllowAny]
    filter_backends = [OrderingFilter]
    ordering = ["date_time"]


class ProgramListView(generics.ListAPIView):
    """List all active programs"""

    queryset = Program.objects.filter(is_active=True)
    serializer_class = ProgramSerializer
    permission_classes = [permissions.AllowAny]
    filter_backends = [DjangoFilterBackend, SearchFilter]
    filterset_fields = ["type", "is_active"]
    search_fields = ["name", "description"]


class NewsPostListView(generics.ListAPIView):
    """List published news posts"""

    queryset = NewsPost.objects.filter(is_published=True)
    serializer_class = NewsPostSerializer
    permission_classes = [permissions.AllowAny]
    filter_backends = [OrderingFilter, SearchFilter]
    search_fields = ["title", "content", "tags"]
    ordering = ["-published_at"]


class NewsPostDetailView(generics.RetrieveAPIView):
    """Get single news post"""

    queryset = NewsPost.objects.filter(is_published=True)
    serializer_class = NewsPostSerializer
    permission_classes = [permissions.AllowAny]


class ContactCreateView(generics.CreateAPIView):
    """Create contact form submission"""

    queryset = Contact.objects.all()
    serializer_class = ContactSerializer
    permission_classes = [permissions.AllowAny]


class EventListView(generics.ListAPIView):
    """List active events. Recurring events always included regardless of start_date."""

    queryset = Event.objects.filter(is_active=True)
    serializer_class = EventSerializer
    permission_classes = [permissions.AllowAny]
    filter_backends = [OrderingFilter]
    ordering = ["start_date"]

    def get_queryset(self):
        from django.db.models import Q

        queryset = super().get_queryset()
        show_past = self.request.query_params.get("show_past", False)
        if not show_past:
            # Always include recurring events; only filter one-time events by date
            queryset = queryset.filter(
                Q(start_date__gte=timezone.now()) | Q(is_recurring=True)
            )
        return queryset


class EventDetailView(generics.RetrieveAPIView):
    """Get single event"""

    queryset = Event.objects.filter(is_active=True)
    serializer_class = EventSerializer
    permission_classes = [permissions.AllowAny]


class DonationCreateView(generics.CreateAPIView):
    """Create donation record"""

    queryset = Donation.objects.all()
    serializer_class = DonationSerializer
    permission_classes = [permissions.AllowAny]


class MissionCountryListView(generics.ListAPIView):
    """List all active mission countries"""

    queryset = MissionCountry.objects.filter(is_active=True)
    serializer_class = MissionCountrySerializer
    permission_classes = [permissions.AllowAny]


class HistoryEntryListView(generics.ListAPIView):
    """List all history entries ordered by display order"""

    queryset = HistoryEntry.objects.all()
    serializer_class = HistoryEntrySerializer
    permission_classes = [permissions.AllowAny]


class TeamMemberListView(generics.ListAPIView):
    """List active team members"""

    queryset = TeamMember.objects.filter(is_active=True)
    serializer_class = TeamMemberSerializer
    permission_classes = [permissions.AllowAny]
    ordering = ["display_order", "name"]


@api_view(["GET"])
@permission_classes([permissions.AllowAny])
def church_info(request):
    """Get basic church information"""
    info = {
        "name": "Pingstkyrkan Elim",
        "address": {
            "street": "Engelbrektsgatan 68",
            "postal_code": "231 34",
            "city": "Trelleborg",
            "country": "Sweden",
        },
        "contact": {
            "phone": "0761-68 64 34",
            "email": "pingstkyrkan.trelleborg@gmail.com",
        },
        "donation_info": {
            "swish": "123 494 42 11",
            "bankgiro": "591-7703",
            "note": 'Märk med "gåva"',
        },
        "service_times": {
            "sunday_service": "11:00",
            "sunday_school": "11:00 (during service)",
        },
        "location_note": "Free parking between the church and Coop",
    }
    return Response(info)


@api_view(["GET"])
@permission_classes([permissions.AllowAny])
def upcoming_services(request):
    """Get next few services"""
    services = Service.objects.filter(
        is_active=True, date_time__gte=timezone.now()
    ).order_by("date_time")[:5]

    serializer = ServiceSerializer(services, many=True)
    return Response(serializer.data)


@api_view(["GET"])
@permission_classes([permissions.AllowAny])
def latest_news(request):
    """Get latest news posts"""
    limit = int(request.query_params.get("limit", 5))
    news = NewsPost.objects.filter(is_published=True)[:limit]

    serializer = NewsPostSerializer(news, many=True)
    return Response(serializer.data)


@api_view(["GET"])
@permission_classes([permissions.AllowAny])
def secondhand_store(request):
    """Get the single SecondHand store instance"""
    store = SecondHandStore.objects.filter(is_active=True).first()
    if not store:
        return Response(None)
    serializer = SecondHandStoreSerializer(store)
    return Response(serializer.data)


class AnnouncementListView(generics.ListAPIView):
    """List active announcements for the public home page"""

    queryset = Announcement.objects.filter(is_active=True)
    serializer_class = AnnouncementSerializer
    permission_classes = [permissions.AllowAny]


# ── Portal: Announcement CRUD (requires kalender permission) ──────────────────


class PortalAnnouncementListCreateView(generics.ListCreateAPIView):
    """List all announcements or create a new one (annonser users only)"""

    queryset = Announcement.objects.order_by("-date")
    serializer_class = AnnouncementSerializer
    permission_classes = [IsAnnonserUser]


class PortalAnnouncementDetailView(generics.RetrieveUpdateDestroyAPIView):
    """Retrieve, update or delete a single announcement (annonser users only)"""

    queryset = Announcement.objects.all()
    serializer_class = AnnouncementSerializer
    permission_classes = [IsAnnonserUser]


@api_view(["GET"])
@permission_classes([permissions.AllowAny])
def alpha_program(request):
    """Get the single Alpha program instance"""
    instance = AlphaProgram.objects.first()
    if not instance:
        instance = AlphaProgram.objects.create()
    serializer = AlphaProgramSerializer(instance, context={"request": request})
    return Response(serializer.data)


class PortalAlphaProgramView(generics.RetrieveUpdateAPIView):
    """Retrieve or update Alpha program content (alpha users only)"""

    serializer_class = AlphaProgramSerializer
    permission_classes = [IsAlphaUser]

    def get_object(self):
        obj = AlphaProgram.objects.first()
        if not obj:
            obj = AlphaProgram.objects.create()
        return obj

    def get_parsers(self):
        from rest_framework.parsers import FormParser, JSONParser, MultiPartParser
        return [MultiPartParser(), FormParser(), JSONParser()]


class PortalAlphaPhotoListCreateView(generics.ListCreateAPIView):
    """List or upload gallery photos for Alpha (alpha users only)"""

    serializer_class = AlphaPhotoSerializer
    permission_classes = [IsAlphaUser]

    def get_queryset(self):
        return AlphaPhoto.objects.all()

    def perform_create(self, serializer):
        alpha, _ = AlphaProgram.objects.get_or_create(pk=1)
        serializer.save(alpha=alpha)


class PortalAlphaPhotoDetailView(generics.RetrieveUpdateDestroyAPIView):
    """Retrieve, update or delete a gallery photo (alpha users only)"""

    queryset = AlphaPhoto.objects.all()
    serializer_class = AlphaPhotoSerializer
    permission_classes = [IsAlphaUser]


# ── Portal: Event CRUD (requires kalender permission) ─────────────────────────


class PortalEventListCreateView(generics.ListCreateAPIView):
    """List all events or create a new one (kalender users only)"""

    queryset = Event.objects.select_related("created_by").order_by("-start_date")
    serializer_class = PortalEventSerializer
    permission_classes = [IsKalenderUser]

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)


class PortalEventDetailView(generics.RetrieveUpdateDestroyAPIView):
    """Retrieve, update or delete a single event (kalender users only)"""

    queryset = Event.objects.select_related("created_by")
    serializer_class = PortalEventSerializer
    permission_classes = [IsKalenderUser]


# ── Pre-Teens content (public GET + portal CRUD, pre-teens group) ─────────────


@api_view(["GET"])
@permission_classes([permissions.AllowAny])
def preteens_content(request):
    """Return the next upcoming Pre-Teens event (or the most recent past one)."""
    from django.utils import timezone as tz

    obj = (
        PreTeensContent.objects.filter(event_datetime__gte=tz.now())
        .order_by("event_datetime")
        .first()
    ) or PreTeensContent.objects.order_by("-event_datetime").first()

    if obj is None:
        return Response({})
    serializer = PreTeensContentSerializer(obj, context={"request": request})
    return Response(serializer.data)


class PortalPreTeensListCreateView(generics.ListCreateAPIView):
    """List all Pre-Teens events or create a new one (pre-teens group only)"""

    queryset = PreTeensContent.objects.order_by("event_datetime")
    serializer_class = PreTeensContentSerializer
    permission_classes = [IsPreTeensUser]


class PortalPreTeensDetailView(generics.RetrieveUpdateDestroyAPIView):
    """Retrieve, update or delete a single Pre-Teens event (pre-teens group only)"""

    queryset = PreTeensContent.objects.all()
    serializer_class = PreTeensContentSerializer
    permission_classes = [IsPreTeensUser]
