# Pingstkyrkan Elim — Webbplats

Officiell webbplats för Pingstkyrkan Elim i Trelleborg. Projektet består av ett REST API byggt med Django och ett React-gränssnitt, driftsatt med Docker på en Synology NAS.

---

## Innehåll

- [Teknikstack](#teknikstack)
- [Funktioner](#funktioner)
- [Snabbstart](#snabbstart)
- [Projektstruktur](#projektstruktur)
- [Tillgängliga sidor](#tillgängliga-sidor)
- [API-översikt](#api-översikt)
- [Driftsättning](#driftsättning)
- [För utvecklare](#för-utvecklare)

---

## Teknikstack

**Backend**
- [Django 4.2](https://www.djangoproject.com/) + [Django REST Framework 3.14](https://www.django-rest-framework.org/)
- [PostgreSQL 15](https://www.postgresql.org/) — databas
- [Redis 7](https://redis.io/) — cache och meddelandekö
- [Celery 5.3](https://docs.celeryq.dev/) — asynkrona bakgrundsuppgifter
- [Gunicorn](https://gunicorn.org/) — WSGI-server för produktion

**Frontend**
- [React 18](https://react.dev/) med [TypeScript 4.9](https://www.typescriptlang.org/)
- [Styled Components 6](https://styled-components.com/) — CSS-in-JS
- [React Query 3](https://tanstack.com/query/v3) — datahämtning och cachelagring
- [React Router 6](https://reactrouter.com/) — klientrouting
- [Framer Motion](https://www.framer.com/motion/) — animationer

**Infrastruktur**
- [Docker](https://www.docker.com/) + [Docker Compose](https://docs.docker.com/compose/)
- [Nginx](https://nginx.org/) — reverse proxy och SSL-terminering
- [Synology DS224+](https://www.synology.com/) — produktionsserver
- [GitHub Actions](https://github.com/features/actions) — CI/CD

---

## Funktioner

**Publik webbplats**
- Startsida med välkomstsektion, kommande gudstjänster och annonser
- Evenemangssida med detaljvyer
- Nyheter och artiklar
- Alpha-programinformation
- Program och aktiviteter
- Missionssida med länder och missionärer
- Historik och bakgrund om församlingen
- Teamets medarbetare
- Second Hand-butiksinformation
- Pre-Teens-sida
- Kontaktformulär

**Redaktionsportal (inloggningsskyddad)**
- Hantera evenemang (skapa, redigera, ta bort)
- Publicera annonser
- Administrera Alpha-program och bilder
- Pre-Teens-innehåll

**Tekniska funktioner**
- JWT-autentisering med e-postinloggning
- Rollbaserad åtkomstkontroll via grupper
- REST API med paginering, sökning och filtrering
- Automatiska säkerhetskopior

---

## Snabbstart

### Förutsättningar

- [Docker Desktop](https://www.docker.com/products/docker-desktop) installerat och igång
- [Git](https://git-scm.com)

### Starta lokalt

```bash
# 1. Klona repot
git clone https://github.com/Pingstkyrkan-Elim/Website.git
cd Website

# 2. Sätt upp miljövariabler
cp backend/.env.example backend/.env

# 3. Starta alla tjänster
docker compose up --build

# 4. Skapa superanvändare (i nytt terminalfönster)
docker exec -it elim_backend python manage.py createsuperuser
```

| Tjänst | URL |
|---|---|
| Webbplats | http://localhost:3000 |
| API | http://localhost:8000/api/v1/ |
| Admin | http://localhost:8000/admin/ |

---

## Projektstruktur

```
Website/
├── backend/          # Django REST API
│   ├── apps/
│   │   ├── core/     # Huvudlogik (evenemang, nyheter, program m.m.)
│   │   └── users/    # Användarhantering och autentisering
│   └── elim_backend/ # Django-inställningar och konfiguration
├── frontend/         # React SPA
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── services/ # API-anrop
│       └── types/
├── nginx/            # Reverse proxy-konfiguration
├── scripts/          # Driftsättnings- och säkerhetskopieringsskript
├── docker-compose.yml              # Lokal utvecklingsmiljö
├── docker-compose.synology.yml     # Produktionsmiljö
└── ONBOARDING.md                   # Introduktionsguide för utvecklare
```

---

## Tillgängliga sidor

| Sida | Sökväg | Beskrivning |
|---|---|---|
| Startsida | `/` | Välkomst, gudstjänster, annonser |
| Evenemang | `/evenemang` | Kalender och evenemangsdetaljer |
| Nyheter | `/nyheter` | Artiklar och nyheter |
| Alpha | `/alpha` | Alpha-programinformation |
| Program | `/program` | Aktiviteter och program |
| Mission | `/mission` | Missionärer och länder |
| Historia | `/historia` | Församlingens historik |
| Teamet | `/teamet` | Medarbetare och kontakt |
| Second Hand | `/second-hand` | Butiksinformation |
| Pre-Teens | `/pre-teens` | Pre-Teens-verksamhet |
| Kontakt | `/kontakt` | Kontaktformulär |
| Portal | `/portal` | Redaktionsportal (kräver inloggning) |

---

## API-översikt

Bas-URL: `/api/v1/`

| Endpoint | Åtkomst | Beskrivning |
|---|---|---|
| `GET /api/health/` | Publik | Hälsokontroll |
| `GET /church-info/` | Publik | Församlingsinformation |
| `GET /announcements/` | Publik | Annonser |
| `GET /events/` | Publik | Evenemang |
| `GET /news/` | Publik | Nyheter |
| `GET /programs/` | Publik | Program |
| `GET /team/` | Publik | Teammedlemmar |
| `GET /alpha-program/` | Publik | Alpha-information |
| `GET /pre-teens/` | Publik | Pre-Teens-innehåll |
| `GET /mission/` | Publik | Missionsinformation |
| `GET /second-hand/` | Publik | Second Hand-information |
| `POST /contact/` | Publik | Skicka kontaktformulär |
| `POST /users/auth/login/` | Publik | Logga in (returnerar JWT) |
| `POST /users/register/` | Publik | Registrera ny användare |
| `GET /users/auth/me/` | Inloggad | Hämta inloggad användare |
| `* /portal/events/` | Inloggad + grupp | Hantera evenemang |
| `* /portal/announcements/` | Inloggad + grupp | Hantera annonser |
| `* /portal/alpha-program/` | Inloggad + grupp | Hantera Alpha-innehåll |

Fullständig API-dokumentation finns via Django Admin på `/admin/`.

---

## Driftsättning

Produktionen körs på en Synology DS224+ NAS med Docker.

```bash
# Första gången
./scripts/synology_deploy.sh --init    # Skapa kataloger och generera .env
nano .env                               # Konfigurera med din IP och domän
./scripts/synology_deploy.sh --update  # Bygg och starta

# Uppdatera efter ny push
git pull origin main
./scripts/synology_deploy.sh --update

# Kontrollera status
./scripts/synology_deploy.sh --status
```

Detaljerade driftsättningsinstruktioner finns i [ONBOARDING.md](./ONBOARDING.md#14-driftsättning--synology-ds224).

---

## Arbetsregler — obligatoriska för alla i teamet

> Dessa regler gäller utan undantag. De skyddar produktionsmiljön och säkerställer att alla i teamet kan lita på koden.

### Branchstrategi

```
main
 └── feature/namn-på-funktionen   ← du arbetar här
 └── fix/namn-på-buggfixen        ← eller här
```

**Alltid** skapa en ny branch från `main` innan du börjar arbeta:

```bash
git checkout main
git pull origin main
git checkout -b feature/namn-på-funktionen
```

### Pull Request — obligatorisk process

```
din branch ──► Pull Request ──► granskning ──► merge till main
```

**Ingen kod går in i `main` utan ett godkänt Pull Request.** Inga undantag — inte för snabba fixar, inte för småändringar, aldrig.

Innan du öppnar ett PR, kontrollera att:

- [ ] Alla automatiska CI-tester är gröna
- [ ] Du har kört formateringsverktygen (`black`, `prettier`) lokalt
- [ ] Du har testat funktionen manuellt i din lokala miljö
- [ ] Commit-meddelandena är beskrivande och förklarar *varför* — inte bara *vad*

### Kodgranskning — krav för godkännande

Ett PR **kräver minst 1 godkännande** från en annan utvecklare i teamet innan det kan mergas.

Den som granskar har ansvar att:

- Läsa igenom all ändrad kod — inte bara skumma
- Förstå vad ändringen gör och varför
- Testa funktionen manuellt i sin lokala miljö
- Kontrollera att inga edge cases missats
- Ge konstruktiv återkoppling om något behöver förbättras

> **Godkänn aldrig ett PR som du inte har testat och förstått fullt ut.** Ett godkännande är ditt personliga intyg på att koden är redo för produktion.

### Vad som aldrig är tillåtet

| ❌ Förbjudet | ✅ Rätt sätt |
|---|---|
| Pusha direkt till `main` | Skapa en branch och öppna ett PR |
| Merga sitt eget PR utan godkännande | Vänta på granskning från en kollega |
| Godkänna ett PR utan att ha testat | Testa manuellt innan du godkänner |
| Merga när CI-tester är röda | Rätta felen, pusha igen |
| "Jag fixar det sen" — merga ändå | Fixa det ordentligt nu |

### Varför vi gör det här

Dessa regler finns inte för att bromsa arbetet — de finns för att **skydda teamet och produktionsmiljön**. Ett PR som granskas noggrant av en kollega hittar buggar som den ursprungliga utvecklaren inte såg. Det sprider också kunskap om koden i hela teamet så att ingen person blir en flaskhals.

---

## För utvecklare

Fullständig dokumentation för att sätta upp utvecklingsmiljön, arbetsflöde, kodstandarder och testning finns i **[ONBOARDING.md](./ONBOARDING.md)**.

### Kodkvalitet

```bash
# Backend — kör innan varje commit
cd backend && python -m black . && python -m isort . && python -m flake8 .

# Frontend — kör innan varje commit
cd frontend && npx prettier --write "src/**/*.{ts,tsx}" && npm run lint
```

### Tester

```bash
# Backend
docker exec -it elim_backend python manage.py test --verbosity=2

# Frontend
cd frontend && npm test -- --watchAll=false
```

### CI/CD

Varje push till `main` eller `develop` kör automatiskt:
- Backend-tester mot en riktig PostgreSQL-databas
- Frontend-tester, TypeScript-kontroll och produktionsbygge
- Säkerhetsskanning med Bandit och npm audit
- Docker-byggtest för produktionsimages

---

*Pingstkyrkan Elim · Trelleborg*
