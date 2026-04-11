from rest_framework import serializers

from .models import (
    Contact,
    Donation,
    Event,
    HistoryEntry,
    MissionCountry,
    NewsPost,
    Program,
    SecondHandStore,
    Service,
    TeamMember,
)


class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = "__all__"
        read_only_fields = ["created_at", "updated_at"]


class ProgramSerializer(serializers.ModelSerializer):
    type_display = serializers.CharField(source="get_type_display", read_only=True)

    class Meta:
        model = Program
        fields = "__all__"
        read_only_fields = ["created_at", "updated_at"]


class NewsPostSerializer(serializers.ModelSerializer):
    author_name = serializers.CharField(source="author.get_full_name", read_only=True)

    class Meta:
        model = NewsPost
        fields = "__all__"
        read_only_fields = ["created_at", "updated_at", "published_at"]


class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = ["name", "email", "subject", "message"]

    def create(self, validated_data):
        return Contact.objects.create(**validated_data)


class ContactAdminSerializer(serializers.ModelSerializer):
    """Full serializer for admin use"""

    class Meta:
        model = Contact
        fields = "__all__"
        read_only_fields = ["created_at", "updated_at"]


class EventSerializer(serializers.ModelSerializer):
    recurrence_day_display = serializers.CharField(
        source="get_recurrence_day_display", read_only=True
    )
    next_occurrence = serializers.SerializerMethodField()

    class Meta:
        model = Event
        fields = "__all__"
        read_only_fields = ["created_at", "updated_at"]

    def get_next_occurrence(self, obj):
        dt = obj.get_next_occurrence()
        if dt is None:
            return None
        return dt.isoformat()


class DonationSerializer(serializers.ModelSerializer):
    donation_type_display = serializers.CharField(
        source="get_donation_type_display", read_only=True
    )

    class Meta:
        model = Donation
        fields = [
            "donor_name",
            "donor_email",
            "amount",
            "donation_type",
            "donation_type_display",
            "message",
            "is_anonymous",
            "created_at",
        ]
        read_only_fields = ["created_at"]

    def create(self, validated_data):
        return Donation.objects.create(**validated_data)


class MissionCountrySerializer(serializers.ModelSerializer):
    class Meta:
        model = MissionCountry
        fields = [
            "id",
            "name",
            "continent",
            "description",
            "images",
            "coordinates_x",
            "coordinates_y",
            "order",
        ]


class HistoryEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = HistoryEntry
        fields = [
            "id",
            "period",
            "year_start",
            "title",
            "content",
            "images",
            "leaders",
            "order",
        ]


class SecondHandStoreSerializer(serializers.ModelSerializer):
    class Meta:
        model = SecondHandStore
        fields = [
            "id",
            "name",
            "tagline",
            "description",
            "address",
            "phone",
            "email",
            "opening_hours",
            "donation_hours",
            "images",
            "pmu_url",
            "donation_info",
        ]


class TeamMemberSerializer(serializers.ModelSerializer):
    role_display = serializers.CharField(source="get_role_display", read_only=True)

    class Meta:
        model = TeamMember
        fields = [
            "id",
            "name",
            "role",
            "role_display",
            "bio",
            "photo",
            "email",
            "phone",
            "display_order",
        ]
        read_only_fields = ["id"]
