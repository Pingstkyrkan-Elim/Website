# ELIM Church Website Project

Welcome to the official website of **Pingstkyrkan Elim** in Trelleborg, Sweden. This modern full-stack application is built with Django REST Framework and React, serving our church community with features for managing services, programs, and community activities.

## 🏛️ About Pingstkyrkan Elim

**Pingstkyrkan Elim** is a vibrant Christian church located in Trelleborg, Sweden, serving the local community with worship services, youth programs, community activities, and spiritual guidance.

**Contact Information:**
- **Address**: Engelbrektsgatan 68, 231 34 Trelleborg, Sweden
- **Phone**: 0761-68 64 34
- **Email**: info@pingstkyrkan-elim.com
- **Service Times**: Sundays at 11:00 AM (Sunday school during service)

This website project is developed and maintained by the church's technical team to better serve our community and share our mission with the world.

## 🏗️ Project Architecture

ELIM is built using a modern microservices architecture with the following components:

```
ELIM/
├── 📁 backend/          # Django REST API Backend
│   ├── 📁 apps/
│   │   ├── 📁 users/    # User authentication & management
│   │   └── 📁 core/     # Church services, programs & activities
│   ├── 📁 elim_backend/ # Django project configuration
│   ├── 🐳 Dockerfile    # Backend container configuration
│   └── 📄 requirements.txt
├── 📁 frontend/         # React TypeScript Frontend
│   ├── 📁 src/
│   │   ├── 📁 components/ # Reusable UI components
│   │   ├── 📁 pages/     # Application pages
│   │   ├── 📁 services/  # API service layer
│   │   └── 📁 types/     # TypeScript type definitions
│   ├── 🐳 Dockerfile    # Frontend container configuration
│   └── 📦 package.json
├── 📁 scripts/          # Automation scripts
├── 🐳 docker-compose.yml # Container orchestration
└── 📚 README.md         # This file
```

### Technology Stack

**Backend Technologies:**
- **Django 4.2.7** - Python web framework
- **Django REST Framework 3.14.0** - API development
- **PostgreSQL 15** - Primary database
- **Redis 7** - Caching and message broker
- **Celery 5.3.4** - Background task processing
- **Gunicorn 21.2.0** - WSGI HTTP Server

**Frontend Technologies:**
- **React 18.2.0** - UI library
- **TypeScript 4.9.5** - Type-safe JavaScript
- **Styled Components 6.1.1** - CSS-in-JS styling with mobile-responsive design
- **React Router 6.20.1** - Client-side routing
- **React Query 3.39.3** - Data fetching and caching
- **Framer Motion 10.16.15** - Animations and interactive effects
- **Axios 1.6.2** - HTTP client

**Infrastructure:**
- **Docker & Docker Compose** - Containerization
- **Node.js 18** - Frontend development environment
- **Python 3.11** - Backend runtime

## 🚀 Quick Start Guide

### Prerequisites

Before you begin, ensure you have the following installed:

- **Python 3.11+**
- **Node.js 18+**
- **Docker Desktop** (latest version)
- **Git** (for version control)

### Automated Setup (Recommended)

The standardized development environment setup:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/pingstkyrkan-elim/elim-website.git
   cd elim-website
   ```

2. **Run the development setup script:**
   ```bash
   ./scripts/dev-setup.sh
   ```

   This script will:
   - Check all prerequisites and versions
   - Set up Python virtual environment
   - Install all dependencies (Python + Node.js)
   - Configure database services with Docker
   - Apply database migrations
   - Create VS Code configuration
   - Run tests to verify setup

3. **Start development servers:**
   ```bash
   # Terminal 1 - Backend
   cd backend
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   python manage.py runserver

   # Terminal 2 - Frontend  
   cd frontend
   npm start
   ```

### Quick Development Commands

Use the development commands script for common tasks:

```bash
# Start all services
./scripts/dev-commands.sh start-all

# Run tests
./scripts/dev-commands.sh test-all

# Format code
./scripts/dev-commands.sh format-all

# See all available commands
./scripts/dev-commands.sh
```

### Manual Setup (Alternative)

If you prefer manual control:

1. **Backend setup:**
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   cp .env.example .env.local
   # Configure .env.local with your settings
   ```

2. **Frontend setup:**
   ```bash
   cd frontend
   npm install
   ```

3. **Database services:**
   ```bash
   docker-compose up db redis -d
   ```

4. **Apply migrations:**
   ```bash
   cd backend
   python manage.py migrate
   ```

## 🔧 Detailed Setup Instructions

### Docker Services Configuration

The application runs 5 interconnected Docker services:

#### 1. PostgreSQL Database (`db`)
- **Image:** `postgres:15`
- **Port:** `5432`
- **Database:** `elim_db`
- **Credentials:** `postgres/postgres` (development only)
- **Data persistence:** Named volume `postgres_data`

#### 2. Redis Cache (`redis`)
- **Image:** `redis:7-alpine`
- **Port:** `6379`
- **Purpose:** Celery message broker and caching

#### 3. Django Backend (`backend`)
- **Build:** `./backend/Dockerfile`
- **Port:** `8000`
- **Features:**
  - Automatic database migrations
  - Static file collection
  - Development server with auto-reload
  - Custom user authentication
  - RESTful API endpoints

#### 4. React Frontend (`frontend`)
- **Build:** `./frontend/Dockerfile`
- **Port:** `3000`
- **Features:**
  - Hot-reloading development server
  - TypeScript compilation
  - Proxy configuration to backend
  - Mobile-responsive design with breakpoints (768px, 480px)
  - Interactive Historia page with book-style interface
  - Calendar/Events page with touch-friendly navigation

#### 5. Celery Worker (`celery`)
- **Build:** `./backend/Dockerfile`
- **Purpose:** Background task processing
- **Command:** `celery -A elim_backend worker --loglevel=info`

### Environment Configuration

#### Backend Environment Variables

The backend uses the following environment variables (configured in docker-compose.yml):

```bash
# Django Settings
DEBUG=True
SECRET_KEY=your-secret-key-for-development
ALLOWED_HOSTS=localhost,127.0.0.1,0.0.0.0

# Database Configuration
DB_NAME=elim_db
DB_USER=postgres
DB_PASSWORD=postgres
DB_HOST=db
DB_PORT=5432

# Redis Configuration
CELERY_BROKER_URL=redis://redis:6379/0
CELERY_RESULT_BACKEND=redis://redis:6379/0

# CORS Settings
CORS_ALLOWED_ORIGINS=http://localhost:3000,http://127.0.0.1:3000
```

#### Frontend Environment Variables

```bash
# API Configuration
REACT_APP_API_URL=http://localhost:8000/api/v1

# Development Settings
CHOKIDAR_USEPOLLING=true
```

## 📊 Database Setup and Management

### Initial Database Setup

The backend automatically handles database setup through Django migrations:

1. **Create migrations:**
   ```bash
   python manage.py makemigrations users
   python manage.py makemigrations core
   ```

2. **Apply migrations:**
   ```bash
   python manage.py migrate
   ```

3. **Create superuser (optional):**
   ```bash
   docker-compose exec backend python manage.py createsuperuser
   ```

### Database Models

#### User Management (`apps.users`)
- **CustomUser**: Extended Django user model with additional church-specific fields

#### Core Functionality (`apps.core`)
- **Service**: Church service management with scheduling and location details
- **Program**: Church programs and activities (Alpha Course, Youth Meetings, etc.)
- **BaseModel**: Abstract model providing common timestamps

### Database Commands

```bash
# Access PostgreSQL directly
docker-compose exec db psql -U postgres -d elim_db

# View database logs
docker-compose logs db

# Backup database
docker-compose exec db pg_dump -U postgres elim_db > backup.sql

# Restore database
docker-compose exec -T db psql -U postgres elim_db < backup.sql
```

## 🖥️ Development Commands

### Backend Development

```bash
# Run Django development server locally
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py runserver

# Django management commands
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser
python manage.py collectstatic
python manage.py shell

# Run tests
python manage.py test

# Access Django admin
# Navigate to http://localhost:8000/admin
```

### Frontend Development

```bash
# Run React development server locally
cd frontend
npm install
npm start

# Build for production
npm run build

# Run tests
npm test

# Linting
npm run lint
npm run lint:fix

# Type checking
npx tsc --noEmit
```

### Docker Development Commands

```bash
# Build specific service
docker-compose build backend
docker-compose build frontend

# Start specific service
docker-compose up backend
docker-compose up frontend

# View logs
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f db

# Execute commands in running containers
docker-compose exec backend python manage.py shell
docker-compose exec frontend npm run build

# Stop all services
docker-compose down

# Stop and remove volumes (⚠️  This will delete database data)
docker-compose down -v

# Restart specific service
docker-compose restart backend
```

## 🌐 Service URLs and Access Points

Once all services are running, you can access:

| Service | URL | Description |
|---------|-----|-------------|
| **Frontend** | http://localhost:3000 | React application |
| **Backend API** | http://localhost:8000/api/v1 | REST API endpoints |
| **Django Admin** | http://localhost:8000/admin | Administrative interface |
| **Database** | localhost:5432 | PostgreSQL (use pgAdmin/client) |
| **Redis** | localhost:6379 | Redis server |

### API Endpoints

The backend provides RESTful API endpoints:

```bash
# Authentication endpoints
POST /api/v1/auth/login/
POST /api/v1/auth/logout/
POST /api/v1/auth/register/

# User management
GET /api/v1/users/profile/
PUT /api/v1/users/profile/

# Church services
GET /api/v1/services/
POST /api/v1/services/
GET /api/v1/services/{id}/
PUT /api/v1/services/{id}/
DELETE /api/v1/services/{id}/

# Church programs
GET /api/v1/programs/
POST /api/v1/programs/
GET /api/v1/programs/{id}/
```

## 🛠️ Development Workflow

### Making Changes

1. **Backend Changes:**
   ```bash
   # Make your changes to backend code
   # The Django server auto-reloads on file changes
   
   # If you change models:
   docker-compose exec backend python manage.py makemigrations
   docker-compose exec backend python manage.py migrate
   ```

2. **Frontend Changes:**
   ```bash
   # Make your changes to frontend code
   # React dev server auto-reloads on file changes
   
   # If you add new dependencies:
   docker-compose exec frontend npm install package-name
   # Or rebuild the container:
   docker-compose build frontend
   ```

3. **Database Changes:**
   ```bash
   # Create new migration
   docker-compose exec backend python manage.py makemigrations app_name
   
   # Apply migration
   docker-compose exec backend python manage.py migrate
   ```

### Testing

```bash
# Backend tests
docker-compose exec backend python manage.py test

# Frontend tests
docker-compose exec frontend npm test

# Run specific test files
docker-compose exec backend python manage.py test apps.users.tests.test_models
docker-compose exec frontend npm test -- --testPathPattern=components
```

### Debugging

```bash
# View application logs
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f celery

# Access container shell
docker-compose exec backend bash
docker-compose exec frontend sh

# Django shell for debugging
docker-compose exec backend python manage.py shell

# Database debugging
docker-compose exec backend python manage.py dbshell
```

## 🔧 Troubleshooting

### Common Issues and Solutions

#### Docker Issues

**Problem:** Docker services won't start
```bash
# Solution: Check if ports are already in use
netstat -tulpn | grep -E '(3000|8000|5432|6379)'

# Stop conflicting services
sudo systemctl stop postgresql  # If PostgreSQL is running locally
sudo systemctl stop redis-server  # If Redis is running locally
```

**Problem:** Permission denied errors
```bash
# Solution: Fix Docker permissions (Linux)
sudo chmod +x scripts/start.sh
sudo chown -R $USER:$USER .
```

#### Database Issues

**Problem:** Database connection errors
```bash
# Check if database is running
docker-compose ps

# View database logs
docker-compose logs db

# Restart database service
docker-compose restart db
```

**Problem:** Migration errors
```bash
# Reset migrations (⚠️  Development only)
docker-compose exec backend find . -path "*/migrations/*.py" -not -name "__init__.py" -delete
docker-compose exec backend python manage.py makemigrations
docker-compose exec backend python manage.py migrate
```

#### Frontend Issues

**Problem:** Node modules issues
```bash
# Clear cache and reinstall
docker-compose down
docker-compose build frontend --no-cache
docker-compose up frontend
```

**Problem:** Port already in use
```bash
# Find process using port 3000
lsof -ti:3000
kill -9 $(lsof -ti:3000)
```

#### Backend Issues

**Problem:** Static files not loading
```bash
docker-compose exec backend python manage.py collectstatic --noinput
```

**Problem:** Import errors
```bash
# Check Python path
docker-compose exec backend python -c "import sys; print('\n'.join(sys.path))"
```

## 📈 Performance and Production

### Production Deployment

For production deployment, you should:

1. **Environment Variables:**
   ```bash
   DEBUG=False
   SECRET_KEY=your-secure-production-secret-key
   ALLOWED_HOSTS=yourdomain.com,www.yourdomain.com
   ```

2. **Database:**
   - Use managed PostgreSQL service (AWS RDS, Google Cloud SQL, etc.)
   - Configure SSL connections
   - Set up automated backups

3. **Static Files:**
   - Use cloud storage (AWS S3, Google Cloud Storage)
   - Configure CDN for better performance

4. **Security:**
   - Use HTTPS (SSL/TLS certificates)
   - Configure proper CORS settings
   - Set up rate limiting
   - Use secure headers middleware

### Performance Optimization

```bash
# Backend optimization
# Enable caching
docker-compose exec backend python manage.py check --deploy

# Frontend optimization
# Build optimized production bundle with responsive assets
docker-compose exec frontend npm run build

# Mobile optimization features:
# - CSS media queries for responsive breakpoints
# - Touch-friendly navigation and gestures
# - Optimized image loading for mobile devices
# - Viewport-based sizing for better mobile display
```

## 🤝 Contributing

### Development Guidelines

1. **Code Style:**
   - Backend: Follow PEP 8 for Python code
   - Frontend: Use TypeScript strict mode
   - Use meaningful commit messages

2. **Testing:**
   - Write unit tests for new features
   - Ensure all tests pass before submitting changes

3. **Documentation:**
   - Update README.md for significant changes
   - Add docstrings to new functions/classes
   - Update API documentation

### Git Workflow

```bash
# Create feature branch
git checkout -b feature/your-feature-name

# Make changes and commit
git add .
git commit -m "feat: add your feature description"

# Push and create pull request
git push origin feature/your-feature-name
```

## 📞 Support and Resources

### Getting Help

- **Documentation:** This README file
- **Issues:** Report bugs and request features in the project repository
- **Development:** Check the Django and React documentation for framework-specific help

### Useful Resources

- [Django Documentation](https://docs.djangoproject.com/)
- [Django REST Framework](https://www.django-rest-framework.org/)
- [React Documentation](https://react.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Docker Documentation](https://docs.docker.com/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)

---

**Happy coding! 🚀**

*Built with ❤️ for Pingstkyrkan Elim community*