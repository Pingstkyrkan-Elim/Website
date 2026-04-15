from django.db import migrations


SEED_MEMBERS = [
    {
        "name": "Thomas & Ingrid Eriksson",
        "role": "pastor",
        "section": "pastorer",
        "role_title": "Pastor & föreståndare",
        "bio": (
            "Thomas och Ingrid Eriksson leder tillsammans Pingstkyrkan Elim i Trelleborg. "
            "Med ett hjärta för Guds folk och en vision för ett levande och öppet samfund, "
            "har de under många år byggt upp en gemenskap präglad av kärlek, tillhörighet "
            "och tro. Thomas tjänstgör som föreståndare och Ingrid som medföreståndare och "
            "ledare för kvinnoarbetet. Deras ledarskap präglas av värme, ärlighet och en "
            "djup övertygelse om att varje människa bär på ett unikt värde."
        ),
        "photo": "team/pastors.jpg",
        "display_order": 1,
        "is_active": True,
    },
    {
        "name": "Tilda Persson",
        "role": "youth_leader",
        "section": "ungdom",
        "role_title": "Ungdomspastor",
        "bio": (
            "Tilda Persson leder ungdomsarbetet i Elim med ett brinnande engagemang för "
            "unga vuxna och deras väg in i tro och liv. Hon tror på en generation som söker "
            "mening, äkthet och gemenskap — och skapar en plats där alla är välkomna att "
            "ställa frågor, tvivla och växa. Med kreativitet och mod driver hon ett ungdomsarbete "
            "som är relevant, inkluderande och rotad i kristen tro."
        ),
        "photo": "team/tilda.jpg",
        "display_order": 2,
        "is_active": True,
    },
    {
        "name": "Styrelsen",
        "role": "elder",
        "section": "styrelse",
        "role_title": "Församlingens styrelse",
        "bio": (
            "Församlingens styrelse bär ansvaret för den gemensamma visionen och det "
            "administrativa arbetet i Pingstkyrkan Elim. Tillsammans med pastorerna sätter "
            "de riktningen för verksamheten och ser till att Elim kan vara en välsignelse "
            "för hela Trelleborg och världen. Styrelsen består av engagerade och erfarna "
            "ledare med en gemensam kärlek till Gud och till kyrkan."
        ),
        "photo": "team/board.jpg",
        "display_order": 3,
        "is_active": True,
    },
]


def seed_team_members(apps, schema_editor):
    TeamMember = apps.get_model('core', 'TeamMember')
    # Only seed if table is empty
    if TeamMember.objects.exists():
        return
    for member in SEED_MEMBERS:
        TeamMember.objects.create(**member)


def unseed_team_members(apps, schema_editor):
    TeamMember = apps.get_model('core', 'TeamMember')
    TeamMember.objects.filter(name__in=[m['name'] for m in SEED_MEMBERS]).delete()


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0017_team_member_section'),
    ]

    operations = [
        migrations.RunPython(seed_team_members, unseed_team_members),
    ]
