from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path
from django.views.generic import RedirectView

urlpatterns = [
    # Redirect root URL to admin
    path(
        "", RedirectView.as_view(url="/admin/", permanent=False), name="root-redirect"
    ),
    path("admin/", admin.site.urls),
    path("api/v1/users/", include("apps.users.urls")),
    path("api/v1/", include("apps.core.urls")),
]

# Serve media files in development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
