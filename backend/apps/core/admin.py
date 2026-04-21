from django.contrib import admin

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
    UngdomarNews,
    PreTeensNews,
)


class AlphaPhotoInline(admin.TabularInline):
    model = AlphaPhoto
    extra = 1
    fields = ("image", "caption", "order")


@admin.register(AlphaProgram)
class AlphaProgramAdmin(admin.ModelAdmin):
    inlines = [AlphaPhotoInline]
    fieldsets = (
        ("Hero", {"fields": ("hero_eyebrow", "hero_title", "hero_subtitle")}),
        ("Intro", {"fields": ("intro_quote", "intro_body", "intro_image")}),
        ("Video", {"fields": ("video_url", "video_title")}),
        ("Content", {"fields": ("steps", "topics")}),
        (
            "Nästa Alpha",
            {
                "fields": (
                    "next_alpha_tag",
                    "next_alpha_title",
                    "next_alpha_desc",
                    "next_alpha_location",
                    "next_alpha_email",
                )
            },
        ),
        ("Closing", {"fields": ("closing_quote", "is_active")}),
    )


@admin.register(Announcement)
class AnnouncementAdmin(admin.ModelAdmin):
    list_display = ("title", "date", "location", "is_active", "created_at")
    list_filter = ("is_active", "date")
    search_fields = ("title", "description", "location")
    list_editable = ("is_active",)
    date_hierarchy = "date"
    ordering = ("-date",)


@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "date_time",
        "location",
        "is_active",
        "has_children_service",
    )
    list_filter = ("is_active", "has_children_service", "date_time")
    search_fields = ("title", "description", "location")
    list_editable = ("is_active",)
    date_hierarchy = "date_time"
    ordering = ("-date_time",)


@admin.register(Program)
class ProgramAdmin(admin.ModelAdmin):
    list_display = ("name", "type", "schedule", "age_group", "is_active")
    list_filter = ("type", "is_active")
    search_fields = ("name", "description", "location")
    list_editable = ("is_active",)
    ordering = ("name",)


@admin.register(NewsPost)
class NewsPostAdmin(admin.ModelAdmin):
    list_display = ("title", "author", "is_published", "published_at", "created_at")
    list_filter = ("is_published", "author", "published_at")
    search_fields = ("title", "content", "tags")
    list_editable = ("is_published",)
    date_hierarchy = "published_at"
    ordering = ("-created_at",)
    readonly_fields = ("published_at",)

    def save_model(self, request, obj, form, change):
        if not obj.author_id:
            obj.author = request.user
        super().save_model(request, obj, form, change)


@admin.register(Contact)
class ContactAdmin(admin.ModelAdmin):
    list_display = ("name", "email", "subject", "is_read", "created_at")
    list_filter = ("is_read", "created_at")
    search_fields = ("name", "email", "subject", "message")
    list_editable = ("is_read",)
    readonly_fields = ("created_at", "updated_at")
    ordering = ("-created_at",)

    fieldsets = (
        ("Contact Information", {"fields": ("name", "email", "subject")}),
        ("Message", {"fields": ("message",)}),
        ("Status", {"fields": ("is_read", "response")}),
        (
            "Timestamps",
            {"fields": ("created_at", "updated_at"), "classes": ("collapse",)},
        ),
    )


@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "start_date",
        "location",
        "is_recurring",
        "recurrence_day",
        "is_suspended",
        "has_sunday_school",
        "has_communion",
        "registration_required",
        "is_active",
    )
    list_filter = (
        "is_recurring",
        "is_suspended",
        "has_sunday_school",
        "has_communion",
        "registration_required",
        "is_active",
        "recurrence_day",
    )
    search_fields = ("title", "description", "location")
    list_editable = ("is_active", "is_suspended", "has_sunday_school", "has_communion")
    date_hierarchy = "start_date"
    ordering = ("-start_date",)

    fieldsets = (
        (
            "Event information",
            {
                "fields": (
                    "title",
                    "description",
                    "location",
                    "image",
                    "contact_person",
                ),
            },
        ),
        (
            "Date & time",
            {
                "fields": ("start_date", "end_date"),
            },
        ),
        (
            "Weekly recurrence",
            {
                "fields": (
                    "is_recurring",
                    "recurrence_day",
                    "recurrence_time",
                    "recurrence_duration_minutes",
                ),
                "description": (
                    "Enable 'Recurring' and select the day of the week "  # noqa: E501
                    "to have this event appear automatically every week."
                ),
            },
        ),
        (
            "Suspension",
            {
                "fields": ("is_suspended", "suspended_until"),
                "description": (
                    "Enable 'Suspended' to pause the recurring event (e.g. holidays). "
                    "Optionally set a resume date for automatic reactivation."
                ),
                "classes": ("collapse",),
            },
        ),
        (
            "Söndagsskolan & Nattvard",
            {
                "fields": ("has_sunday_school", "has_communion"),
                "description": "Mark which special elements are part of this event.",
            },
        ),
        (
            "Registration",
            {
                "fields": (
                    "registration_required",
                    "max_participants",
                    "registration_info",
                ),
                "description": (  # noqa: E501
                    "If registration is required, fill in the "
                    "registration_info field with instructions "
                    "(contact, phone, link, deadline, etc.)."
                ),
                "classes": ("collapse",),
            },
        ),
        (
            "Status",
            {
                "fields": ("is_active",),
            },
        ),
    )


@admin.register(Donation)
class DonationAdmin(admin.ModelAdmin):
    list_display = (
        "donor_name",
        "amount",
        "donation_type",
        "is_anonymous",
        "created_at",
    )
    list_filter = ("donation_type", "is_anonymous", "created_at")
    search_fields = ("donor_name", "donor_email", "message")
    readonly_fields = ("created_at", "updated_at")
    ordering = ("-created_at",)

    fieldsets = (
        (
            "Donor Information",
            {"fields": ("donor_name", "donor_email", "is_anonymous")},
        ),
        ("Donation Details", {"fields": ("amount", "donation_type", "message")}),
        (
            "Timestamps",
            {"fields": ("created_at", "updated_at"), "classes": ("collapse",)},
        ),
    )


@admin.register(MissionCountry)
class MissionCountryAdmin(admin.ModelAdmin):
    list_display = ("name", "continent", "is_active", "order")
    list_filter = ("continent", "is_active")
    list_editable = ("is_active", "order")
    search_fields = ("name", "description")
    ordering = ("order", "name")


@admin.register(HistoryEntry)
class HistoryEntryAdmin(admin.ModelAdmin):
    list_display = ("period", "title", "year_start", "order")
    list_editable = ("order",)
    search_fields = ("period", "title", "content")
    ordering = ("order", "year_start")


@admin.register(TeamMember)
class TeamMemberAdmin(admin.ModelAdmin):
    list_display = ("name", "role", "is_active", "display_order")
    list_filter = ("role", "is_active")
    search_fields = ("name", "bio", "email")
    list_editable = ("is_active", "display_order")
    ordering = ("display_order", "name")


@admin.register(PreTeensContent)
class PreTeensContentAdmin(admin.ModelAdmin):
    list_display = ("event_name", "event_datetime", "updated_at")
    fieldsets = (
        ("Nedräkning", {"fields": ("event_name", "event_datetime")}),
        ("Foto", {"fields": ("photo",)}),
    )


@admin.register(SecondHandStore)
class SecondHandStoreAdmin(admin.ModelAdmin):
    list_display = ("name", "address", "phone", "is_active")
    list_editable = ("is_active",)
    search_fields = ("name", "description", "address")
    fieldsets = (
        ("General", {"fields": ("name", "tagline", "description", "is_active")}),
        ("Kontakt & Plats", {"fields": ("address", "phone", "email")}),
        ("Öppettider", {"fields": ("opening_hours",)}),
        ("Media", {"fields": ("images",)}),
        ("PMU", {"fields": ("pmu_url", "donation_info")}),
    )


@admin.register(UngdomarNews)
class UngdomarNewsAdmin(admin.ModelAdmin):
    list_display = ("tag", "title", "is_active", "created_at")
    list_filter = ("is_active",)
    list_editable = ("is_active",)
    search_fields = ("tag", "title", "description")
    ordering = ("-created_at",)


@admin.register(PreTeensNews)
class PreTeensNewsAdmin(admin.ModelAdmin):
    list_display = ("tag", "title", "is_active", "created_at")
    list_filter = ("is_active",)
    list_editable = ("is_active",)
    search_fields = ("tag", "title", "description")
    ordering = ("-created_at",)
