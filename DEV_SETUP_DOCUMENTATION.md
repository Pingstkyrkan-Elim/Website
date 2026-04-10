# Development Environment Setup Documentation

This document explains how to use the standardized development setup script for the ELIM Church Website project.

## 🎯 Purpose

The `dev-setup.sh` script ensures that all team members have identical development environments, preventing "works on my machine" issues and streamlining collaboration.

## 📋 What the Script Does

### ✅ **Comprehensive Environment Check**
- Validates all required software versions
- Checks if Docker is running
- Ensures Python 3.11+, Node.js 18+, Git, and Docker are installed
- Provides specific installation instructions for missing components

### 🐍 **Backend Setup (Django)**
- Creates Python virtual environment
- Installs all Python dependencies from `requirements.txt`
- Installs development tools: `black`, `isort`, `flake8`, `pytest`, `coverage`
- Creates `.env.local` configuration file with local development settings
- Creates `pyproject.toml` with Black, isort, and flake8 configuration
- Activates virtual environment automatically

### ⚛️ **Frontend Setup (React)**
- Installs all npm dependencies
- Installs development tools: `prettier`, `eslint`, `@typescript-eslint/*`
- Creates `.prettierrc` configuration for consistent code formatting
- Creates `.prettierignore` to exclude certain files from formatting
- Creates frontend `.env.local` file with API URLs
- Sets up TypeScript and React development tools

### 🐳 **Database Services**
- Starts PostgreSQL and Redis containers using Docker Compose
- Waits for services to be fully ready
- Performs health checks on database connections

### 🗄️ **Database Initialization**
- Runs Django system checks
- Applies all database migrations
- Optionally creates superuser account
- Loads initial data fixtures (if available)

### 💻 **VS Code Configuration**
- Creates `.vscode/settings.json` with comprehensive formatting settings
- Configures Python interpreter paths to use project virtual environment
- Sets up automatic code formatting on save (Black + Prettier)
- Creates `.vscode/extensions.json` with essential extension recommendations
- Configures file exclusions and search paths for better performance
- Sets up automatic import organization and linting
- Configures proper indentation and formatting for all file types

### 🎨 **Code Formatting Setup**
- Creates `.editorconfig` for cross-platform formatting consistency
- Sets up automatic code formatting with industry standards
- Configures Black (Python) + Prettier (JavaScript/TypeScript) integration
- Creates `scripts/format-code.sh` for manual project-wide formatting
- Updates `scripts/dev-commands.sh` with formatting shortcuts
- Sets up `pyproject.toml` with Black, isort, and flake8 configuration
- Creates `.prettierrc` and `.prettierignore` for consistent JavaScript/TypeScript formatting

### 🧪 **Testing Verification**
- Runs backend test suite with pytest
- Runs frontend test suite with Jest
- Verifies that the development environment works correctly
- Tests code formatting and linting tools
- Validates Black, isort, and flake8 configuration
- Confirms Prettier formatting works correctly

## 🚀 How to Use the Script

### **For New Team Members:**

1. **Clone the repository:**
   ```bash
   git clone https://github.com/pingstkyrkan-elim/elim-website.git
   cd elim-website
   ```

2. **Run the setup script:**
   ```bash
   ./scripts/dev-setup.sh
   ```

3. **Follow the prompts:**
   - The script will guide you through any missing prerequisites
   - Choose whether to create a superuser account
   - Decide if you want to run tests for verification

4. **Start development:**
   ```bash
   # Terminal 1 - Backend
   cd backend
   source venv/bin/activate
   python manage.py runserver
   
   # Terminal 2 - Frontend
   cd frontend
   npm start
   ```

### **For Existing Developers:**

Run the script periodically to update dependencies and sync environment:
```bash
./scripts/dev-setup.sh
```

### **Alternative: Docker-Only Setup**

If you prefer to use Docker for the entire development environment:

1. **Prerequisites:**
   ```bash
   # Ensure Docker and Docker Compose are installed
   docker --version
   docker-compose --version
   ```

2. **Clone and start with Docker:**
   ```bash
   git clone https://github.com/pingstkyrkan-elim/elim-website.git
   cd elim-website
   
   # Start all services with Docker
   docker-compose up -d
   
   # Check service status
   docker-compose ps
   ```

3. **Access the application:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000/api/v1
   - Admin: http://localhost:8000/admin

4. **Useful Docker commands:**
   ```bash
   # View logs
   docker-compose logs -f backend
   docker-compose logs -f frontend
   
   # Stop services
   docker-compose down
   
   # Rebuild after code changes
   docker-compose build
   docker-compose up -d
   
   # Run Django commands
   docker-compose exec backend python manage.py createsuperuser
   docker-compose exec backend python manage.py migrate
   ```

## 📁 Files Created by the Script

### **Backend Files:**
```
backend/
├── venv/                    # Python virtual environment
├── .env.local              # Local development settings
└── [all Python packages installed]
```

### **Frontend Files:**
```
frontend/
├── node_modules/           # npm dependencies
├── .env.local             # Frontend environment variables
├── .prettierrc            # Code formatting configuration
└── [development tools installed]
```

### **Project Root Files:**
```
.vscode/
├── settings.json          # VS Code configuration
└── extensions.json        # Recommended extensions
```

## 🐳 Docker Development Environment

### **Docker Services Overview:**
The `docker-compose.yml` file sets up the complete development environment with:

- **PostgreSQL Database** (port 5432): Primary database
- **Redis** (port 6379): Cache and message broker for Celery
- **Django Backend** (port 8000): REST API server with auto-reload
- **React Frontend** (port 3000): Development server with hot reload and mobile-responsive design
- **Celery Worker**: Background task processing

### **Docker vs Native Development:**

| Aspect | Native Setup | Docker Setup |
|--------|-------------|--------------|
| **Setup Time** | ~15 minutes | ~5 minutes |
| **Dependencies** | Python 3.11+, Node.js 18+ | Just Docker |
| **Code Formatting** | VS Code integration | Manual commands |
| **Performance** | Native speed | Slight overhead |
| **Isolation** | Local environment | Containerized |
| **Debugging** | Full IDE support | Container debugging |

### **When to Use Each Approach:**

**Use Native Setup if:**
- You want VS Code automatic formatting and linting
- You prefer debugging with full IDE integration  
- You plan to do extensive backend development
- You want maximum performance

**Use Docker Setup if:**
- You want quick setup without installing dependencies
- You prefer environment isolation
- You're testing deployment scenarios
- You're doing frontend-focused development

### **Docker Development Workflow:**

```bash
# Daily workflow
docker-compose up -d          # Start all services
docker-compose logs -f        # Monitor all logs

# Making changes
# Edit code in your editor
docker-compose restart backend  # Restart after backend changes
# Frontend auto-reloads automatically

# Database operations
docker-compose exec backend python manage.py makemigrations
docker-compose exec backend python manage.py migrate
docker-compose exec backend python manage.py createsuperuser

# Testing
docker-compose exec backend python manage.py test
docker-compose exec frontend npm test

# Code formatting (manual)
docker-compose exec backend black .
docker-compose exec backend isort .
docker-compose exec frontend npx prettier --write .

# Cleanup
docker-compose down           # Stop all services
docker system prune          # Clean up unused containers/images
```

## 🔧 Configuration Details

### **Backend Environment (`.env.local`):**
```bash
DEBUG=True
SECRET_KEY=dev-secret-key-change-in-production-only
DB_HOST=localhost
DB_PORT=5432
DB_NAME=elim_db
DB_USER=postgres
DB_PASSWORD=postgres
CELERY_BROKER_URL=redis://localhost:6379/0
CELERY_RESULT_BACKEND=redis://localhost:6379/0
ALLOWED_HOSTS=localhost,127.0.0.1
CORS_ALLOWED_ORIGINS=http://localhost:3000
```

### **Frontend Environment (`.env.local`):**
```bash
REACT_APP_API_URL=http://localhost:8000/api/v1
CHOKIDAR_USEPOLLING=true
```

### **VS Code Settings Highlights:**
- **Python**: Black formatter, Flake8 linting, correct interpreter path
- **JavaScript/TypeScript**: Prettier formatting, ESLint integration
- **Auto-formatting**: Format on save enabled
- **File exclusions**: Hides `node_modules`, `__pycache__`, `venv`

## 📊 Service URLs After Setup

| Service | URL | Description |
|---------|-----|-------------|
| **Frontend** | http://localhost:3000 | React development server |
| **Backend API** | http://localhost:8000/api/v1 | Django REST API endpoints |
| **Admin Interface** | http://localhost:8000/admin | Django admin panel |
| **PostgreSQL** | localhost:5432 | Database (elim_db/postgres/postgres) |
| **Redis** | localhost:6379 | Cache and message broker |

## 🛠️ Development Tools Available

### **Backend Tools:**
```bash
# Code formatting
black .                    # Format Python code
isort .                   # Sort imports
./scripts/format-code.sh   # Format entire project

# Linting
flake8 .                  # Check code style

# Testing
python manage.py test     # Run Django tests
pytest                    # Alternative test runner
coverage run -m pytest    # Run tests with coverage
coverage report           # View coverage report

# Database
python manage.py shell    # Django shell
python manage.py dbshell  # Database shell
```

### **Frontend Tools:**
```bash
# Development server
npm start                 # Start React dev server

# Testing
npm test                  # Run Jest tests
npm run test:coverage     # Run with coverage

# Code quality
npm run lint              # ESLint check
npm run format            # Prettier formatting
npx prettier --write .    # Format all files
npx prettier --check .    # Check formatting

# Build
npm run build            # Production build
```

## 🔍 Troubleshooting

### **Common Issues:**

#### **1. "Python not found"**
```bash
# Install Python 3.11+
# macOS: brew install python@3.11
# Windows: Download from python.org
# Linux: sudo apt install python3.11
```

#### **2. "Docker daemon not running"**
```bash
# Start Docker Desktop application
# Or on Linux: sudo systemctl start docker
```

#### **3. "Port already in use"**
```bash
# Check what's using the ports
lsof -ti:3000  # Frontend
lsof -ti:8000  # Backend
lsof -ti:5432  # PostgreSQL

# Kill processes if needed
kill -9 $(lsof -ti:3000)
```

#### **4. "Permission denied" on script**
```bash
chmod +x scripts/dev-setup.sh
./scripts/dev-setup.sh
```

#### **5. "Database connection failed"**
```bash
# Native setup - restart database services
docker-compose down
docker-compose up db redis -d

# Docker setup - restart all services
docker-compose down
docker-compose up -d
```

#### **6. "Docker build fails"**
```bash
# Clean Docker cache and rebuild
docker-compose down
docker system prune -f
docker-compose build --no-cache
docker-compose up -d
```

#### **7. "Port conflicts in Docker"**
```bash
# Check what's using the ports
lsof -ti:3000 -ti:8000 -ti:5432 -ti:6379

# Stop conflicting services
docker-compose down
# Kill any processes using the ports
kill -9 $(lsof -ti:3000)
```

### **Script Recovery:**
If the script fails partway through, it's safe to run again. It will:
- Skip already completed steps
- Continue from where it left off
- Not overwrite existing configurations

## 🔄 Regular Maintenance

### **Weekly:**

**Native Development:**
```bash
# Update dependencies
cd backend && pip install -r requirements.txt
cd ../frontend && npm install
```

**Docker Development:**
```bash
# Pull latest images and rebuild
docker-compose pull
docker-compose build
docker-compose up -d
```

### **Monthly:**

**Native Development:**
```bash
# Full environment refresh
./scripts/dev-setup.sh
```

**Docker Development:**
```bash
# Complete refresh
docker-compose down
docker system prune -f
docker-compose build --no-cache
docker-compose up -d
```

## 🎯 Benefits of Using This Script

### **For Individual Developers:**
- ✅ **Consistent environment** across different machines
- ✅ **Fast setup** for new development machines
- ✅ **All tools configured** optimally
- ✅ **No manual configuration** required

### **For Team Collaboration:**
- ✅ **Identical environments** prevent integration issues
- ✅ **Standardized code formatting** reduces PR conflicts
- ✅ **Automated testing setup** ensures code quality
- ✅ **Clear documentation** of required tools

### **For Project Maintenance:**
- ✅ **Easy onboarding** for new team members
- ✅ **Version consistency** across team
- ✅ **Reproducible builds** and tests
- ✅ **Simplified troubleshooting**

## 📋 Checklist After Running Script

### **Verify Setup:**

**Native Development:**
- [ ] Backend server starts: `cd backend && python manage.py runserver`
- [ ] Frontend server starts: `cd frontend && npm start`
- [ ] VS Code opens with correct settings and extensions
- [ ] Automatic formatting works on save

**Docker Development:**
- [ ] All services start: `docker-compose up -d`
- [ ] Check service status: `docker-compose ps`
- [ ] View logs: `docker-compose logs -f`

**Both Approaches:**
- [ ] Can access http://localhost:3000 (frontend)
- [ ] Can access http://localhost:8000/admin (backend admin)
- [ ] Database connection works in Django admin
- [ ] API endpoints respond: http://localhost:8000/api/v1/
- [ ] Mobile responsiveness works: Test Historia and Events pages on different screen sizes
- [ ] Touch gestures work on mobile devices (swipe navigation in Historia page)

### **Test Development Workflow:**

**Native Development:**
- [ ] Make a small change to Python code and see auto-reload
- [ ] Make a small change to React code and see auto-reload
- [ ] Run tests: `cd backend && python manage.py test`
- [ ] Run tests: `cd frontend && npm test`
- [ ] Code formatting works in VS Code (save a file)
- [ ] Test manual formatting: `./scripts/format-code.sh`
- [ ] Verify Black formatting: `cd backend && black --check .`
- [ ] Verify Prettier formatting: `cd frontend && npx prettier --check .`

**Docker Development:**
- [ ] Code changes trigger auto-reload in containers
- [ ] Run backend tests: `docker-compose exec backend python manage.py test`
- [ ] Run frontend tests: `docker-compose exec frontend npm test`
- [ ] Manual formatting: `docker-compose exec backend black .`
- [ ] Manual formatting: `docker-compose exec frontend npx prettier --write .`
- [ ] Database operations work: `docker-compose exec backend python manage.py migrate`

### **Team Sync:**
- [ ] Both developers can run the script successfully
- [ ] Both have identical Python/Node.js versions
- [ ] Both can start all services without conflicts
- [ ] Code formatting produces identical results
- [ ] Both have the same VS Code settings and extensions
- [ ] Both can run formatting commands successfully
- [ ] Both see automatic formatting on save in VS Code

---

## 🎉 Success!

After running this script, both team members will have:
- **Identical development environments**
- **All required tools and dependencies**
- **Optimized VS Code configuration**
- **Working local development servers**
- **Comprehensive testing setup**
- **Automatic code formatting on save**
- **Consistent code style across the entire project**
- **All development and formatting tools configured**

This standardization eliminates "works on my machine" problems and enables smooth collaboration on the ELIM Church Website project! 🏛️✨

*For questions or issues with the setup script, create a GitHub issue with the error output.*