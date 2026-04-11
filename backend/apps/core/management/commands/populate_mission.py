from django.core.management.base import BaseCommand
from apps.core.models import MissionCountry

MISSION_DATA = [
    {
        "name": "Bangladesh",
        "continent": "Asien",
        "description": "I Bangladesh stöder vi det sociala projektet Agape Social Concern samt skolan Home of Peace (HOP). Projektet arbetar med utbildning och social omsorg i utsatta områden.",
        "images": ["mission/Bangladesh1.webp", "mission/Bangladesh6.webp"],
        "coordinates_x": 74.4,
        "coordinates_y": 41.0,
        "order": 1,
    },
    {
        "name": "Burundi",
        "continent": "Afrika",
        "description": "I Burundi stöder vi ett arbete med föräldralösa och utsatta barn i Tubabarane. Organisationen ger barn en trygg uppväxt med utbildning och omsorg.",
        "images": ["mission/Burundi-2023-09.webp"],
        "coordinates_x": 58.0,
        "coordinates_y": 62.0,
        "order": 2,
    },
    {
        "name": "Kongo (DRC)",
        "continent": "Afrika",
        "description": "Via Barnsamariten som samarbetar med organisationen Let Africa Live stöder vi en sånads- och entreprenörsutbildning för utsatta kvinnor i Kongo. Projektet ger kvinnor verktyg för ekonomiskt oberoende.",
        "images": ["mission/Barnsamariten2.webp", "mission/Barnsamariten3.webp", "mission/Barnsamariten4.webp", "mission/Kongo_2024-04.webp"],
        "coordinates_x": 53.0,
        "coordinates_y": 60.0,
        "order": 3,
    },
    {
        "name": "Rwanda",
        "continent": "Afrika",
        "description": "I Rwanda stöder vi ett projekt för ungdomar i Gilgal. Projektet fokuserar på att ge unga människor hopp, utbildning och andlig vägledning.",
        "images": ["mission/Rwanda.webp", "mission/Rwanda1.webp", "mission/Rwanda2.webp"],
        "coordinates_x": 58.5,
        "coordinates_y": 59.0,
        "order": 4,
    },
    {
        "name": "Sri Lanka",
        "continent": "Asien",
        "description": "Vi samlar in pengar till fadderbarn som används till bland annat en förskola och en yrkesskola i Hirusara. Vi stöder också Smyrna Church i Galle. Det senaste bidraget användes till ett stort ungdomsläger, Build 2023 Youth Camp.",
        "images": ["mission/SriLanka1.webp", "mission/Hirusara-2023-1.webp", "mission/Hirusara-2023-4.webp", "mission/SriLanka-2023-09.webp"],
        "coordinates_x": 72.5,
        "coordinates_y": 52.0,
        "order": 5,
    },
    {
        "name": "Tanzania",
        "continent": "Afrika",
        "description": "Via Tandalaföreningen stöder vi olika projekt i Nzega i Tanzania. Det senaste projektet gick ut på att installera vattentankar som samlar upp regnvatten för lokalsamhällen.",
        "images": ["mission/Tandala-2023-10.webp"],
        "coordinates_x": 59.5,
        "coordinates_y": 63.5,
        "order": 6,
    },
    {
        "name": "Tchad",
        "continent": "Afrika",
        "description": "I Tchad stöder vi ett förskoleprojekt som innefattar 105 förskolor och som drivs av Folk & Språk. Projektet ger tusentals barn i ökenregioner tillgång till tidig utbildning.",
        "images": ["mission/Tchad.webp", "mission/Tchad2.webp"],
        "coordinates_x": 54.0,
        "coordinates_y": 48.0,
        "order": 7,
    },
]


class Command(BaseCommand):
    help = "Populate the database with Pingstkyrkan Elim mission countries"

    def handle(self, *args, **options):
        if MissionCountry.objects.exists():
            self.stdout.write(self.style.WARNING("Mission countries already exist. Skipping."))
            return

        for data in MISSION_DATA:
            MissionCountry.objects.create(**data)
            self.stdout.write(self.style.SUCCESS(f"Created: {data['name']} ({data['continent']})"))

        self.stdout.write(self.style.SUCCESS(f"\nDone! Created {len(MISSION_DATA)} mission countries."))
