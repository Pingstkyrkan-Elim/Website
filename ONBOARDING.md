# Introduktionsguide för utvecklare — ELIM Website

Välkommen till teamet! Den här guiden täcker allt du behöver för att köra projektet lokalt och förstå arbetsflödet — från att klona repot till att driftsätta på produktionsservern Synology.

---

## Innehållsförteckning

1. [Projektarkitektur](#1-projektarkitektur)
2. [Förutsättningar](#2-förutsättningar)
3. [Klona repot](#3-klona-repot)
4. [Alternativ A — Starta med Docker (rekommenderas)](#4-alternativ-a--starta-med-docker-rekommenderas)
5. [Alternativ B — Lokal utveckling utan Docker](#5-alternativ-b--lokal-utveckling-utan-docker)
6. [Projektstruktur](#6-projektstruktur)
7. [Miljövariabler](#7-miljövariabler)
8. [Backend — Django](#8-backend--django)
9. [Frontend — React](#9-frontend--react)
10. [Kodkvalitetsstandarder](#10-kodkvalitetsstandarder)
11. [Tester](#11-tester)
12. [Git-arbetsflöde](#12-git-arbetsflöde)
13. [CI/CD — GitHub Actions](#13-cicd--github-actions)
14. [Driftsättning — Synology DS224+](#14-driftsättning--synology-ds224)

---

## 1. Projektarkitektur

```
┌─────────────┐     ┌──────────────────┐     ┌──────────────┐
│   Nginx     │────▶│  Django (8000)   │────▶│ PostgreSQL   │
│  (port 80)  │     │  Gunicorn WSGI   │     │   (5432)     │
│             │────▶│  REST Framework  │     └──────────────┘
│             │     │  JWT Auth        │
│             │────▶│  Celery Worker   │────▶│    Redis     │
│             │     └──────────────────┘     │   (6379)     │
│             │                              └──────────────┘
│             │────▶│ React SPA (80)   │
└─────────────┘     └──────────────────┘
```

| Lager | Teknologi | Version |
|---|---|---|
| Backend | Django + DRF | 4.2.7 / 3.14 |
| Frontend | React + TypeScript | 18.2 / 4.9 |
| Databas | PostgreSQL | 15 |
| Cache / Kö | Redis | 7 |
| Asynkrona uppgifter | Celery | 5.3 |
| Webbserver | Nginx + Gunicorn | — |
| Containers | Docker + Compose | — |

---

## 2. Förutsättningar

Installera dessa verktyg innan du fortsätter:

| Verktyg | Minimiversion | Installation |
|---|---|---|
| Git | 2.x | [git-scm.com](https://git-scm.com) |
| Docker Desktop | 4.x | [docker.com](https://www.docker.com/products/docker-desktop) |
| Docker Compose | ingår i Docker Desktop | — |
| Python | 3.11 | [python.org](https://www.python.org/downloads/) |
| Node.js | 18.x LTS | [nodejs.org](https://nodejs.org) |
| npm | 9.x (ingår med Node) | — |

Verifiera installationerna:

```bash
git --version
docker --version
docker compose version
python3 --version   # ska vara 3.11.x
node --version      # ska vara v18.x
npm --version
```

---

## 3. Klona repot

```bash
# 1. Klona repot
git clone https://github.com/DIN-ORG/Website.git
cd Website

# 2. Kontrollera att du är på main-grenen
git status
# → On branch main
```

---

## 4. Alternativ A — Starta med Docker (rekommenderas)

Det här är det snabbaste alternativet. Docker startar alla tjänster (PostgreSQL, Redis, Django, React) med ett enda kommando.

### 4.1 Konfigurera miljövariabler

```bash
# Kopiera exempelfilen
cp backend/.env.example backend/.env
```

Filen `backend/.env` innehåller redan giltiga standardvärden för lokal utveckling. **Du behöver inte ändra något** för att komma igång.

### 4.2 Starta alla tjänster

```bash
docker compose up --build
```

Första gången tar det några minuter medan Docker laddar ner images och bygger containers. Efterföljande starter är betydligt snabbare.

Du ser något liknande detta i terminalen:

```
elim_backend  | Starting development server at http://0.0.0.0:8000/
elim_frontend | Compiled successfully!
elim_frontend | You can now view elim-frontend in the browser.
```

### 4.3 Skapa superanvändare (första gången)

I ett nytt terminalfönster, medan containers körs:

```bash
docker exec -it elim_backend python manage.py createsuperuser
```

Ange e-postadress, namn och lösenord när du uppmanas.

### 4.4 Tillgängliga adresser

| Tjänst | URL |
|---|---|
| Frontend (React) | http://localhost:3000 |
| Backend API | http://localhost:8000/api/v1/ |
| Django Admin | http://localhost:8000/admin/ |
| Hälsokontroll | http://localhost:8000/api/health/ |

### 4.5 Användbara Docker-kommandon

```bash
# Starta i bakgrunden
docker compose up -d

# Visa loggar i realtid
docker compose logs -f

# Visa bara backend-loggar
docker compose logs -f backend

# Stoppa allt
docker compose down

# Stoppa och ta bort volymer (inkl. databasen)
docker compose down -v

# Bygg om bara backend efter ändringar i requirements.txt
docker compose build backend

# Kör ett kommando inuti backend-containern
docker exec -it elim_backend python manage.py <kommando>
```

---

## 5. Alternativ B — Lokal utveckling utan Docker

Användbart om du föredrar mer kontroll eller har problem med Docker.

### 5.1 Installera PostgreSQL och Redis lokalt

**macOS:**
```bash
brew install postgresql@15 redis
brew services start postgresql@15
brew services start redis
```

**Ubuntu/Debian:**
```bash
sudo apt install postgresql-15 redis-server
sudo systemctl start postgresql redis
```

Skapa databasen:
```bash
psql -U postgres -c "CREATE DATABASE elim_db;"
```

### 5.2 Backend

```bash
cd backend

# Skapa virtuell miljö
python3 -m venv venv
source venv/bin/activate        # Mac/Linux
# venv\Scripts\activate         # Windows

# Installera beroenden
pip install -r requirements.txt

# Konfigurera miljövariabler
cp .env.example .env
# Öppna .env i din editor och ändra DB_HOST=localhost
```

```bash
# Applicera migreringar
python manage.py migrate

# Skapa superanvändare
python manage.py createsuperuser

# Starta utvecklingsservern
python manage.py runserver
```

Backendet är tillgängligt på http://localhost:8000

### 5.3 Frontend

```bash
cd frontend

# Installera beroenden
npm ci

# Skapa miljöfil
echo "REACT_APP_API_URL=http://localhost:8000/api/v1" > .env.local

# Starta utvecklingsservern
npm start
```

Frontendet är tillgängligt på http://localhost:3000

### 5.4 Celery (bakgrundsuppgifter)

```bash
# I ett separat terminalfönster, från backend/ med venv aktiverat
celery -A elim_backend worker --loglevel=info
```

---

## 6. Projektstruktur

```
Website/
├── .github/
│   └── workflows/
│       ├── ci.yml              # Tester, bygg, Docker — körs vid varje push
│       └── code-quality.yml    # Black, isort, flake8, Prettier — körs vid varje push
│
├── backend/
│   ├── apps/
│   │   ├── core/               # Huvudlogik: evenemang, nyheter, program m.m.
│   │   │   ├── models.py       # Databasmodeller
│   │   │   ├── views.py        # REST-vyer (publika och portal)
│   │   │   ├── serializers.py  # Dataseralisering
│   │   │   ├── urls.py         # API-rutter
│   │   │   ├── admin.py        # Admingränssnittskonfiguration
│   │   │   └── tests.py        # Tester för core-appen
│   │   └── users/              # Användarhantering och JWT-autentisering
│   │       ├── models.py       # CustomUser (inloggning via e-post)
│   │       ├── views.py        # Inloggning, registrering, profil
│   │       ├── serializers.py
│   │       ├── urls.py
│   │       └── tests.py        # Tester för användare
│   ├── elim_backend/
│   │   ├── settings.py         # Django-konfiguration
│   │   ├── urls.py             # Rot-URLer (inkl. /api/health/)
│   │   ├── celery.py           # Celery-konfiguration
│   │   └── wsgi.py
│   ├── requirements.txt        # Python-beroenden
│   ├── Dockerfile              # Utvecklingsimage
│   ├── Dockerfile.prod         # Produktionsimage (multi-stage)
│   └── .env.example            # Mall för miljövariabler
│
├── frontend/
│   ├── src/
│   │   ├── components/         # Återanvändbara komponenter (Header, Icons m.m.)
│   │   ├── pages/              # En mapp per sida/rutt
│   │   ├── services/
│   │   │   └── api.ts          # Alla API-anrop samlade här
│   │   └── types/
│   │       └── index.ts        # Globala TypeScript-typer
│   ├── package.json
│   ├── tsconfig.json
│   ├── nginx.conf              # Nginx-konfiguration inuti frontend-containern
│   ├── Dockerfile              # Utvecklingsimage
│   └── Dockerfile.prod         # Produktionsimage (multi-stage + nginx)
│
├── nginx/
│   ├── nginx.conf              # HTTPS reverse proxy (produktion)
│   ├── nginx-http-only.conf    # HTTP reverse proxy (första uppsättning)
│   └── ssl/                    # SSL-certifikat (läggs inte i repot)
│
├── scripts/
│   ├── synology_deploy.sh      # Driftsättning och inställning på Synology
│   ├── synology_backup.sh      # Automatiska säkerhetskopior
│   └── synology_restore.sh     # Återställning från säkerhetskopia
│
├── docker-compose.yml          # Lokal utvecklingsmiljö
├── docker-compose.synology.yml # Produktionsmiljö (Synology)
├── .env.synology               # Mall för produktionsmiljövariabler
└── ONBOARDING.md               # Den här filen
```

---

## 7. Miljövariabler

### Backend (`backend/.env`)

```env
# ── Obligatoriska ─────────────────────────────────────────
SECRET_KEY=hemlig-nyckel-minst-50-tecken
DEBUG=True                          # False i produktion

# ── Databas ───────────────────────────────────────────────
DB_NAME=elim_db
DB_USER=postgres
DB_PASSWORD=postgres
DB_HOST=db                          # 'db' med Docker, 'localhost' utan Docker
DB_PORT=5432

# ── Celery / Redis ────────────────────────────────────────
CELERY_BROKER_URL=redis://redis:6379/0
CELERY_RESULT_BACKEND=redis://redis:6379/0

# ── CORS (tillåtna frontend-adresser) ─────────────────────
CORS_ALLOWED_ORIGINS=http://localhost:3000,http://127.0.0.1:3000

# ── E-post (valfritt i utveckling) ────────────────────────
EMAIL_BACKEND=django.core.mail.backends.console.EmailBackend
```

> **Lägg aldrig upp `.env` i repot.** Den är inkluderad i `.gitignore`.

### Frontend (`.env.local` i `frontend/`)

```env
REACT_APP_API_URL=http://localhost:8000/api/v1
```

---

## 8. Backend — Django

### Vanliga kommandon

```bash
# Alltid från backend/ med venv aktiverat,
# eller via docker exec -it elim_backend <kommando>

# Skapa migrering efter modelländring
python manage.py makemigrations

# Applicera väntande migreringar
python manage.py migrate

# Öppna Django-skal med fullständigt kontext
python manage.py shell

# Skapa superanvändare
python manage.py createsuperuser

# Samla statiska filer (produktion)
python manage.py collectstatic --noinput

# Visa alla registrerade URL:er
python manage.py show_urls
```

### Användarmodell

Projektet använder en anpassad användarmodell (`apps.users.CustomUser`) som **använder e-postadress som inloggningsfält** istället för användarnamn.

```python
# Rätt: referera till användarmodellen via helper
from django.contrib.auth import get_user_model
User = get_user_model()

# Fel: importera aldrig direkt
from django.contrib.auth.models import User  # ❌
```

### API-struktur

| Metod | Sökväg | Åtkomst | Beskrivning |
|---|---|---|---|
| GET | `/api/health/` | Publik | Hälsokontroll |
| GET | `/api/v1/church-info/` | Publik | Församlingsinformation |
| GET | `/api/v1/announcements/` | Publik | Annonser |
| GET | `/api/v1/events/` | Publik | Evenemang |
| GET | `/api/v1/news/` | Publik | Nyheter |
| GET | `/api/v1/programs/` | Publik | Program |
| POST | `/api/v1/users/auth/login/` | Publik | JWT-inloggning |
| POST | `/api/v1/users/register/` | Publik | Registrering |
| GET | `/api/v1/users/auth/me/` | Inloggad | Aktuell användare |
| GET/PUT | `/api/v1/portal/events/` | Inloggad + grupp | Portal CRUD |

### JWT-autentisering

```bash
# 1. Hämta tokens
curl -X POST http://localhost:8000/api/v1/users/auth/login/ \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@exempel.com","password":"ditt-losenord"}'

# Svar: { "access": "eyJ...", "refresh": "eyJ..." }

# 2. Använd token i förfrågningar
curl http://localhost:8000/api/v1/users/auth/me/ \
  -H "Authorization: Bearer eyJ..."
```

Access-tokens gäller i **8 timmar**. Refresh-tokens gäller i **7 dagar**.

---

## 9. Frontend — React

### Kommandon

```bash
# Från frontend/

npm start           # Utvecklingsserver med hot-reload
npm run build       # Produktionsbygge (hamnar i ./build/)
npm test            # Kör tester
npm run lint        # ESLint
npm run lint:fix    # ESLint med autokorrigering
npx tsc --noEmit    # Kontrollera TypeScript-typer utan att kompilera
```

### Lägga till en ny sida

1. Skapa mappen `src/pages/SidansNamn/`
2. Skapa huvudkomponenten `SidansNamn.tsx`
3. Skapa stilar `SidansNamn.styles.ts` (styled-components)
4. Registrera rutten i `src/App.tsx`

### API-anrop

Använd **alltid** funktionerna i `src/services/api.ts`. Gör aldrig direktanrop med `axios` från komponenterna.

```typescript
// ✅ Rätt
import { getEvents } from '../services/api';
const { data } = useQuery('events', getEvents);

// ❌ Fel
import axios from 'axios';
const { data } = await axios.get('/api/v1/events/');
```

### TypeScript-konventioner

- Alla globala typer hör hemma i `src/types/index.ts`
- Använd inte `any`. Om du inte vet exakt typ, använd `unknown` och förfina
- Props för varje komponent typas med ett lokalt `interface` i samma fil

---

## 10. Kodkvalitetsstandarder

CI **avvisar pushen** om koden inte klarar formateringsverktygen. Kör dessa kommandon innan du gör en commit.

### Backend (Python)

```bash
cd backend

# Formatera kod
python -m black .
python -m isort .

# Verifiera utan att ändra (det CI gör)
python -m black --check .
python -m isort --check-only .
python -m flake8 .
```

**Black** formaterar automatiskt om koden. **isort** sorterar imports. **flake8** hittar stilfel som Black inte åtgärdar.

### Frontend (TypeScript/React)

```bash
cd frontend

# Formatera kod
npx prettier --write "src/**/*.{ts,tsx,js,jsx,json,css}"

# Verifiera utan att ändra (det CI gör)
npx prettier --check "src/**/*.{ts,tsx,js,jsx,json,css}"
npm run lint
```

### Rekommenderat flöde innan varje commit

```bash
# Backend
cd backend && python -m black . && python -m isort . && python -m flake8 .

# Frontend
cd ../frontend && npx prettier --write "src/**/*.{ts,tsx}" && npm run lint
```

> **Tips:** Konfigurera din editor att köra Black och Prettier automatiskt vid sparande. Filerna `.editorconfig` och `.vscode/settings.json` i repot innehåller redan grundkonfigurationen.

---

## 11. Tester

### Backend

```bash
# Med Docker
docker exec -it elim_backend python manage.py test --verbosity=2

# Utan Docker (med venv aktiverat)
cd backend
python manage.py test --verbosity=2

# Med täckningsrapport
coverage run --source='.' manage.py test
coverage report
coverage html    # Genererar htmlcov/index.html
```

Tester finns i:
- `backend/apps/core/tests.py` — publika endpoints, modeller, kontaktformulär
- `backend/apps/users/tests.py` — registrering, inloggning, JWT, profil

### Frontend

```bash
cd frontend

# Kör alla tester
npm test -- --watchAll=false

# Med täckning
npm test -- --coverage --watchAll=false
```

### Skriva nya tester

**Backend:** Ärv från `django.test.TestCase`. Använd `APIClient` från DRF för HTTP-förfrågningar i tester.

```python
from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status

class MittTest(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_min_endpoint(self):
        resp = self.client.get('/api/v1/min-rutt/')
        self.assertEqual(resp.status_code, status.HTTP_200_OK)
```

**Frontend:** Nuvarande tester verifierar att modulerna laddas utan fel. För mer utförliga tester, lägg till `@testing-library/react`:

```bash
npm install --save-dev @testing-library/react @testing-library/user-event
```

---

## 12. Git-arbetsflöde

### Grenar

| Gren | Syfte |
|---|---|
| `main` | Produktion — alltid stabil, aktiverar deploy-kontroll i CI |
| `develop` | Integration — bas för ny funktionalitet |
| `feature/namn` | Arbetsgre för en ny funktion |
| `fix/namn` | Arbetsgren för att rätta ett fel |

### Dagligt arbetsflöde

```bash
# 1. Synkronisera med develop innan du börjar
git checkout develop
git pull origin develop

# 2. Skapa din arbetsgren
git checkout -b feature/namn-pa-funktionen

# 3. Arbeta och gör små, beskrivande commits
git add fil.py
git commit -m "feat: lägg till endpoint för donationshistorik"

# 4. Formatera och kör tester innan push
cd backend && python -m black . && python -m isort . && python -m flake8 .
cd ../frontend && npx prettier --write "src/**/*.{ts,tsx}" && npm run lint

# 5. Push och öppna en Pull Request mot develop
git push origin feature/namn-pa-funktionen
```

### Commit-meddelandekonvention

```
typ: kort beskrivning med gemener

feat:     ny funktionalitet
fix:      felrättning
chore:    underhållsändringar (beroenden, konfiguration)
style:    bara formatering, ingen logikändring
test:     lägga till eller rätta tester
docs:     bara dokumentation
refactor: omstrukturering utan beteendeändring
```

Exempel:
```
feat: lägg till datumfilter i evenemangslistning
fix: rätta serialisering av bild i TeamMember
chore: uppdatera Django till 4.2.10
test: lägg till tester för donationsendpoint
```

---

## 13. CI/CD — GitHub Actions

Varje push eller Pull Request mot `main` eller `develop` aktiverar automatiskt dessa jobb:

```
push/PR
  ├── backend-tests     → Django-kontroller + migreringar + tester + täckning
  ├── frontend-tests    → ESLint + TypeScript + Jest + produktionsbygge
  ├── security-scan     → Bandit (Python) + npm audit
  │
  ├── docker-build      → (kräver backend-tests + frontend-tests)
  │   └── Bygger Docker-produktionsimages och validerar compose-filen
  │
  └── deployment-check  → (bara på main)
      └── Kontrollerar att alla driftsättningsfiler finns och är giltiga
```

**Om CI misslyckas på din PR** måste du rätta felet innan du kan merga. Vanligaste felen:

| Fel | Lösning |
|---|---|
| `black --check` misslyckas | Kör `python -m black .` i `backend/` |
| `isort --check-only` misslyckas | Kör `python -m isort .` i `backend/` |
| `flake8` misslyckas | Rätta felen som anges |
| `prettier --check` misslyckas | Kör `npx prettier --write "src/**/*.{ts,tsx}"` i `frontend/` |
| `eslint` misslyckas | Kör `npm run lint:fix` i `frontend/` |
| Tester misslyckas | Läs felmeddelandena och rätta testet eller koden |
| Docker build misslyckas | Prova `docker compose build` lokalt |

---

## 14. Driftsättning — Synology DS224+

Produktionen körs på ett Synology DS224+ NAS med Docker.

### 14.1 Första gången — inställning på Synology

**Anslut via SSH till Synology:**
```bash
ssh admin@192.168.x.x
```

**Ladda upp projektet till Synology** (från din lokala dator):
```bash
# Alternativ 1: klona direkt på NAS (om Git är installerat)
ssh admin@192.168.x.x "cd /volume1/docker && git clone https://github.com/DIN-ORG/Website.git ELIM"

# Alternativ 2: kopiera med rsync
rsync -avz --exclude node_modules --exclude .git \
  /lokal/sökväg/ELIM/ admin@192.168.x.x:/volume1/docker/ELIM/
```

**Kör initialiseringsskriptet:**
```bash
# På Synology via SSH
cd /volume1/docker/ELIM
chmod +x scripts/synology_deploy.sh
./scripts/synology_deploy.sh --init
```

Det här skapar nödvändig katalogstruktur och genererar en `.env`-fil med säkra, slumpmässiga hemliga nycklar.

**Redigera produktionskonfigurationen:**
```bash
nano .env
```

Värden som **måste ändras**:
```env
SYNOLOGY_IP=192.168.1.XXX        # Synologys riktiga IP-adress i nätverket
ALLOWED_HOSTS=192.168.1.XXX,din-domän.se
CORS_ALLOWED_ORIGINS=https://din-domän.se
CSRF_TRUSTED_ORIGINS=https://din-domän.se
REACT_APP_API_URL=/api/v1         # Relativ sökväg fungerar med reverse proxy
```

### 14.2 SSL-certifikat

**Alternativ A — Självsignerat (för intern testning):**
```bash
./scripts/synology_deploy.sh --generate-ssl
```

**Alternativ B — Let's Encrypt (publik domän, rekommenderas):**
```bash
# Du behöver en domän som pekar på din publika IP
# Synology DSM kan hantera Let's Encrypt automatiskt:
# DSM → Kontrollpanel → Säkerhet → Certifikat → Lägg till
# Kopiera sedan filerna till nginx/ssl/:
cp /usr/syno/etc/certificate/system/default/fullchain.pem nginx/ssl/
cp /usr/syno/etc/certificate/system/default/privkey.pem nginx/ssl/
```

### 14.3 Starta i produktion

```bash
./scripts/synology_deploy.sh --update
```

Det här kommandot:
1. Validerar konfigurationen
2. Kör `docker compose build` för alla images
3. Applicerar databasmigreringar automatiskt
4. Startar alla tjänster med `docker compose up -d`

### 14.4 Skapa första administratörskontot

```bash
docker exec -it elim_backend_prod python manage.py createsuperuser
```

### 14.5 Verifiera att allt fungerar

```bash
./scripts/synology_deploy.sh --status
```

Besök:
- `http://DIN-IP/` → Frontend
- `http://DIN-IP/admin/` → Django-adminpanel
- `http://DIN-IP/api/health/` → Hälsokontroll (ska svara `{"status": "ok"}`)

### 14.6 Framtida uppdateringar

Så här uppdaterar du applikationen efter ett push till `main`:

```bash
# På Synology via SSH
cd /volume1/docker/ELIM

# Uppdatera koden
git pull origin main

# Bygg om och starta om
./scripts/synology_deploy.sh --update
```

### 14.7 Säkerhetskopior

Säkerhetskopieringsskriptet finns på `scripts/synology_backup.sh`. Automatisera det via DSM:s uppgiftsschemaläggare:

```
DSM → Kontrollpanel → Uppgiftsschemaläggare → Skapa → Schemalagd uppgift
Kommando: /volume1/docker/ELIM/scripts/synology_backup.sh
Frekvens: Dagligen kl. 03:00
```

För att återställa från en säkerhetskopia:
```bash
./scripts/synology_restore.sh
```

---

## Felsökning av vanliga problem

### Docker startar inte backend

```bash
# Visa detaljerade backend-loggar
docker compose logs backend

# Kontrollera att databasen är redo
docker compose ps
```

### Fel med migreringar

```bash
# Visa migreringsläget
docker exec -it elim_backend python manage.py showmigrations

# Skapa och applicera migreringar
docker exec -it elim_backend python manage.py makemigrations
docker exec -it elim_backend python manage.py migrate
```

### Frontend kan inte ansluta till backend (CORS)

Kontrollera att `CORS_ALLOWED_ORIGINS` i `backend/.env` innehåller frontendets adress (som standard `http://localhost:3000`).

### Porten är redan i användning

```bash
# Hitta vilken process som använder port 8000
lsof -i :8000
# Avsluta processen
kill -9 <PID>
```

### Återställ utvecklingsdatabasen

```bash
docker compose down -v    # tar bort volymer, inklusive databasen
docker compose up --build # skapar om allt från grunden
```

