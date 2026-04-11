from django.contrib.auth import get_user_model
from django.db import models
from django.utils import timezone

User = get_user_model()


class BaseModel(models.Model):
    """Abstract base model with common fields"""

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class Service(BaseModel):
    """Church service model"""

    title = models.CharField(max_length=200)
    description = models.TextField()
    date_time = models.DateTimeField()
    location = models.CharField(max_length=200, default="Pingstkyrkan Elim")
    is_active = models.BooleanField(default=True)
    has_children_service = models.BooleanField(default=True)
    language_support = models.CharField(
        max_length=100, blank=True, help_text="e.g., 'English interpretation available'"
    )

    class Meta:
        db_table = "services"
        ordering = ["date_time"]

    def __str__(self):
        return f"{self.title} - {self.date_time.strftime('%Y-%m-%d %H:%M')}"


class Program(BaseModel):
    """Church programs and activities"""

    PROGRAM_TYPES = [
        ("alpha", "Alpha Course"),
        ("youth", "Youth Meeting"),
        ("sports", "Sports Activity"),
        ("prayer", "Prayer Meeting"),
        ("cafe", "Café Oasen"),
        ("other", "Other"),
    ]

    name = models.CharField(max_length=200)
    type = models.CharField(max_length=20, choices=PROGRAM_TYPES)
    description = models.TextField()
    schedule = models.CharField(
        max_length=200, help_text="e.g., 'Fridays 19:00' or 'Sundays 14:30-16:30'"
    )
    age_group = models.CharField(
        max_length=100, blank=True, help_text="e.g., '13-25 years' or 'All ages'"
    )
    location = models.CharField(max_length=200)
    is_active = models.BooleanField(default=True)
    contact_info = models.CharField(max_length=200, blank=True)
    image = models.ImageField(upload_to="programs/", blank=True, null=True)

    class Meta:
        db_table = "programs"
        ordering = ["name"]

    def __str__(self):
        return self.name


class NewsPost(BaseModel):
    """News and announcements"""

    title = models.CharField(max_length=200)
    content = models.TextField()
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    is_published = models.BooleanField(default=False)
    published_at = models.DateTimeField(blank=True, null=True)
    featured_image = models.ImageField(upload_to="news/", blank=True, null=True)
    tags = models.CharField(
        max_length=200, blank=True, help_text="Comma-separated tags"
    )

    class Meta:
        db_table = "news_posts"
        ordering = ["-published_at"]

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if self.is_published and not self.published_at:
            self.published_at = timezone.now()
        super().save(*args, **kwargs)


class Contact(BaseModel):
    """Contact form submissions"""

    name = models.CharField(max_length=100)
    email = models.EmailField()
    subject = models.CharField(max_length=200)
    message = models.TextField()
    is_read = models.BooleanField(default=False)
    response = models.TextField(blank=True)

    class Meta:
        db_table = "contacts"
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.name} - {self.subject}"


class Event(BaseModel):
    """Special events and activities"""

    DAYS_OF_WEEK = [
        (0, "Monday"),
        (1, "Tuesday"),
        (2, "Wednesday"),
        (3, "Thursday"),
        (4, "Friday"),
        (5, "Saturday"),
        (6, "Sunday"),
    ]

    title = models.CharField(max_length=200)
    description = models.TextField()
    start_date = models.DateTimeField()
    end_date = models.DateTimeField(blank=True, null=True)
    location = models.CharField(max_length=200)
    registration_required = models.BooleanField(default=False)
    max_participants = models.IntegerField(blank=True, null=True)
    contact_person = models.CharField(max_length=100, blank=True)
    image = models.ImageField(upload_to="events/", blank=True, null=True)
    is_active = models.BooleanField(default=True)
    registration_info = models.TextField(
        blank=True,
        help_text="Instructions for registration: contact person, phone, link, deadline, etc.",  # noqa: E501
    )

    # Recurrence fields
    is_recurring = models.BooleanField(
        default=False,
        help_text="Check if this event repeats weekly.",
    )
    recurrence_day = models.IntegerField(
        choices=DAYS_OF_WEEK,
        blank=True,
        null=True,
        help_text="Day of the week on which the event repeats.",
    )
    recurrence_time = models.TimeField(
        blank=True,
        null=True,
        help_text="Start time of the recurring event.",
    )
    recurrence_duration_minutes = models.IntegerField(
        blank=True,
        null=True,
        help_text="Duration in minutes (optional).",
    )
    is_suspended = models.BooleanField(
        default=False,
        help_text="Temporarily suspend the recurrence (holidays, summer break, etc.).",
    )
    suspended_until = models.DateField(
        blank=True,
        null=True,
        help_text="Automatically resume from this date. Leave blank to suspend indefinitely.",  # noqa: E501
    )

    # Extra features
    has_sunday_school = models.BooleanField(
        default=False,
        help_text="Check if Söndagsskolan (Sunday school) takes place during this event.",  # noqa: E501
    )
    has_communion = models.BooleanField(
        default=False,
        help_text="Check if nattvard (communion) is part of this event.",
    )

    class Meta:
        db_table = "events"
        ordering = ["start_date"]

    def __str__(self):
        if self.is_recurring and self.recurrence_day is not None:
            day = dict(self.DAYS_OF_WEEK).get(self.recurrence_day, "")
            return f"{self.title} (every {day})"
        return self.title

    def get_next_occurrence(self):
        """Returns the next datetime this recurring event will happen."""
        import datetime

        from django.utils import timezone as tz

        if (
            not self.is_recurring
            or self.recurrence_day is None
            or self.recurrence_time is None
        ):
            return None
        if self.is_suspended:
            if self.suspended_until is None:
                return None
            resume = datetime.datetime.combine(
                self.suspended_until,
                self.recurrence_time,
                tzinfo=tz.get_current_timezone(),
            )
            if resume > tz.now():
                return resume

        now = tz.now()
        today = now.date()
        days_ahead = (self.recurrence_day - today.weekday()) % 7
        if days_ahead == 0:
            candidate = datetime.datetime.combine(
                today, self.recurrence_time, tzinfo=tz.get_current_timezone()
            )
            if candidate <= now:
                days_ahead = 7
        next_date = today + datetime.timedelta(days=days_ahead)
        return datetime.datetime.combine(
            next_date, self.recurrence_time, tzinfo=tz.get_current_timezone()
        )


class Donation(BaseModel):
    """Donation tracking"""

    DONATION_TYPES = [
        ("tithe", "Tithe"),
        ("offering", "Offering"),
        ("mission", "Mission"),
        ("building", "Building Fund"),
        ("other", "Other"),
    ]

    donor_name = models.CharField(max_length=100, blank=True)
    donor_email = models.EmailField(blank=True)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    donation_type = models.CharField(
        max_length=20, choices=DONATION_TYPES, default="offering"
    )
    message = models.TextField(blank=True)
    is_anonymous = models.BooleanField(default=False)

    class Meta:
        db_table = "donations"
        ordering = ["-created_at"]

    def __str__(self):
        return f"Donation: {self.amount} SEK - {self.get_donation_type_display()}"


class MissionCountry(BaseModel):
    """Active mission fields supported by Pingstkyrkan Elim"""

    CONTINENTS = [
        ("Afrika", "Afrika"),
        ("Asien", "Asien"),
        ("Europa", "Europa"),
        ("Amerika", "Amerika"),
    ]

    name = models.CharField(max_length=100)
    continent = models.CharField(max_length=20, choices=CONTINENTS)
    description = models.TextField()
    images = models.JSONField(
        default=list,
        blank=True,
        help_text="List of image filenames served from /images/mission/ folder",
    )
    coordinates_x = models.FloatField(
        default=50.0, help_text="Horizontal % position on world map (0-100)"
    )
    coordinates_y = models.FloatField(
        default=50.0, help_text="Vertical % position on world map (0-100)"
    )
    is_active = models.BooleanField(default=True)
    order = models.IntegerField(default=0)

    class Meta:
        db_table = "mission_countries"
        ordering = ["order", "name"]

    def __str__(self):
        return f"{self.name} ({self.continent})"


class HistoryEntry(BaseModel):
    """Church history timeline entries"""

    period = models.CharField(
        max_length=100,
        help_text="e.g. '1919' or '1920- och 1930-talet'",
    )
    year_start = models.IntegerField(help_text="Starting year for sorting")
    title = models.CharField(max_length=200)
    content = models.TextField()
    images = models.JSONField(
        default=list,
        blank=True,
        help_text="List of image filenames served from /images/ folder",
    )
    leaders = models.JSONField(
        default=list,
        blank=True,
        help_text="List of leader strings, e.g. 'Georg Steen 1919–1921'",
    )
    order = models.IntegerField(default=0, help_text="Display order")

    class Meta:
        db_table = "history_entries"
        ordering = ["order", "year_start"]

    def __str__(self):
        return f"{self.period} — {self.title}"


class SecondHandStore(BaseModel):
    """PMU Second Hand store information — single-instance model"""

    name = models.CharField(max_length=200, default="PMU Second Hand")
    tagline = models.CharField(max_length=300, blank=True)
    description = models.TextField()
    address = models.CharField(max_length=200)
    phone = models.CharField(max_length=50, blank=True)
    email = models.EmailField(blank=True)
    opening_hours = models.JSONField(
        default=list,
        blank=True,
        help_text='List of {day, hours} objects, e.g. [{"day": "Måndag", "hours": "10:00–16:00"}]',  # noqa: E501
    )
    donation_hours = models.JSONField(
        default=list,
        blank=True,
        help_text="Opening hours for Gåvomottagning (donation drop-off), same format as opening_hours",  # noqa: E501
    )
    images = models.JSONField(
        default=list,
        blank=True,
        help_text="List of image filenames served from /images/secondhand/ folder",
    )
    pmu_url = models.URLField(blank=True, default="https://pmu.se")
    donation_info = models.TextField(
        blank=True,
        help_text="Instructions for donating items to the store",
    )
    is_active = models.BooleanField(default=True)

    class Meta:
        db_table = "secondhand_store"

    def __str__(self):
        return self.name


class TeamMember(BaseModel):
    """Church team members and leadership"""

    ROLES = [
        ("pastor", "Pastor"),
        ("elder", "Elder"),
        ("deacon", "Deacon"),
        ("worship_leader", "Worship Leader"),
        ("youth_leader", "Youth Leader"),
        ("volunteer", "Volunteer"),
        ("staff", "Staff"),
    ]

    name = models.CharField(max_length=100)
    role = models.CharField(max_length=20, choices=ROLES)
    bio = models.TextField(blank=True)
    photo = models.ImageField(upload_to="team/", blank=True, null=True)
    email = models.EmailField(blank=True)
    phone = models.CharField(max_length=20, blank=True)
    is_active = models.BooleanField(default=True)
    display_order = models.IntegerField(default=0)

    class Meta:
        db_table = "team_members"
        ordering = ["display_order", "name"]

    def __str__(self):
        return f"{self.name} - {self.get_role_display()}"
