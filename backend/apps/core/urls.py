from django.urls import path

from . import views

urlpatterns = [
    # Church information
    path("church-info/", views.church_info, name="church-info"),
    # Alpha program (public)
    path("alpha-program/", views.alpha_program, name="alpha-program"),
    # Portal — Alpha content management (authenticated, kalender group)
    path(
        "portal/alpha-program/",
        views.PortalAlphaProgramView.as_view(),
        name="portal-alpha-program",
    ),
    path(
        "portal/alpha-photos/",
        views.PortalAlphaPhotoListCreateView.as_view(),
        name="portal-alpha-photo-list",
    ),
    path(
        "portal/alpha-photos/<int:pk>/",
        views.PortalAlphaPhotoDetailView.as_view(),
        name="portal-alpha-photo-detail",
    ),
    # Announcements (public)
    path(
        "announcements/", views.AnnouncementListView.as_view(), name="announcement-list"
    ),
    # Portal — announcement management (authenticated, kalender group)
    path(
        "portal/announcements/",
        views.PortalAnnouncementListCreateView.as_view(),
        name="portal-announcement-list",
    ),
    path(
        "portal/announcements/<int:pk>/",
        views.PortalAnnouncementDetailView.as_view(),
        name="portal-announcement-detail",
    ),
    # Services
    path("services/", views.ServiceListView.as_view(), name="service-list"),
    path("services/upcoming/", views.upcoming_services, name="upcoming-services"),
    # Programs
    path("programs/", views.ProgramListView.as_view(), name="program-list"),
    # News
    path("news/", views.NewsPostListView.as_view(), name="news-list"),
    path("news/latest/", views.latest_news, name="latest-news"),
    path("news/<int:pk>/", views.NewsPostDetailView.as_view(), name="news-detail"),
    # Events
    path("events/", views.EventListView.as_view(), name="event-list"),
    path("events/<int:pk>/", views.EventDetailView.as_view(), name="event-detail"),
    # Contact
    path("contact/", views.ContactCreateView.as_view(), name="contact-create"),
    # Donations
    path("donations/", views.DonationCreateView.as_view(), name="donation-create"),
    # Team
    path("team/", views.TeamMemberListView.as_view(), name="team-list"),
    # History
    path("history/", views.HistoryEntryListView.as_view(), name="history-list"),
    # Mission
    path("mission/", views.MissionCountryListView.as_view(), name="mission-list"),
    # Second Hand
    path("second-hand/", views.secondhand_store, name="secondhand-store"),
    # Pre-Teens (public — next upcoming event)
    path("pre-teens/", views.preteens_content, name="preteens-content"),
    # Portal — Pre-Teens CRUD (pre-teens group)
    path(
        "portal/pre-teens/",
        views.PortalPreTeensListCreateView.as_view(),
        name="portal-preteens-list",
    ),
    path(
        "portal/pre-teens/<int:pk>/",
        views.PortalPreTeensDetailView.as_view(),
        name="portal-preteens-detail",
    ),
    # Portal — event management (authenticated, kalender group)
    path(
        "portal/events/",
        views.PortalEventListCreateView.as_view(),
        name="portal-event-list",
    ),
    path(
        "portal/events/<int:pk>/",
        views.PortalEventDetailView.as_view(),
        name="portal-event-detail",
    ),
]
