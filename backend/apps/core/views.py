from django.utils import timezone

from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import generics, permissions, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.filters import OrderingFilter, SearchFilter
from rest_framework.response import Response

from .models import Contact, Donation, Event, NewsPost, Program, Service, TeamMember
from .serializers import (
    ContactSerializer,
    DonationSerializer,
    EventSerializer,
    NewsPostSerializer,
    ProgramSerializer,
    ServiceSerializer,
    TeamMemberSerializer,
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
    """List active events. Recurring events are always included regardless of start_date."""

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
        "contact": {"phone": "0761-68 64 34", "email": "info@pingstkyrkan-elim.com"},
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
