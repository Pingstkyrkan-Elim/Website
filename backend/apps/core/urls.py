from django.urls import path

from . import views

urlpatterns = [
    # Church information
    path("church-info/", views.church_info, name="church-info"),
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
]
