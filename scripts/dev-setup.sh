#!/bin/bash

# ELIM Church Website - Development Environment Setup Script
# This script creates a standardized development environment for all team members

set -e  # Exit on any error

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
NC='\033[0m' # No Color

# Script configuration
PYTHON_VERSION="3.11"
NODE_VERSION="18"
PROJECT_NAME="ELIM Church Website"

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_header() {
    echo -e "${PURPLE}================================${NC}"
    echo -e "${PURPLE}$1${NC}"
    echo -e "${PURPLE}================================${NC}"
}

# Function to check command existence
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Function to get version number
get_version() {
    case $1 in
        "python"|"python3")
            python3 --version 2>/dev/null | grep -oE '[0-9]+\.[0-9]+' | head -1
            ;;
        "node")
            node --version 2>/dev/null | grep -oE '[0-9]+\.[0-9]+' | head -1
            ;;
        "docker")
            docker --version 2>/dev/null | grep -oE '[0-9]+\.[0-9]+' | head -1
            ;;
        "git")
            git --version 2>/dev/null | grep -oE '[0-9]+\.[0-9]+' | head -1
            ;;
    esac
}

# Function to compare version numbers
version_ge() {
    printf '%s\n%s\n' "$2" "$1" | sort -V -C
}

# Function to check prerequisites
check_prerequisites() {
    print_header "🔍 CHECKING PREREQUISITES"
    
    local all_good=true
    
    # Check operating system
    if [[ "$OSTYPE" == "darwin"* ]]; then
        print_status "Operating System: macOS ✅"
    elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
        print_status "Operating System: Linux ✅"
    elif [[ "$OSTYPE" == "msys" ]] || [[ "$OSTYPE" == "win32" ]]; then
        print_status "Operating System: Windows (Git Bash/WSL) ✅"
    else
        print_warning "Operating System: $OSTYPE (untested)"
    fi
    
    # Check Git
    if command_exists git; then
        local git_version=$(get_version git)
        print_status "Git: v$git_version ✅"
    else
        print_error "Git is not installed. Please install Git first."
        print_status "Install from: https://git-scm.com/"
        all_good=false
    fi
    
    # Check Python
    if command_exists python3; then
        local python_version=$(get_version python3)
        if version_ge "$python_version" "$PYTHON_VERSION"; then
            print_status "Python: v$python_version ✅"
        else
            print_error "Python $PYTHON_VERSION+ required, found v$python_version"
            print_status "Install from: https://www.python.org/downloads/"
            all_good=false
        fi
    else
        print_error "Python 3 is not installed. Please install Python $PYTHON_VERSION+"
        print_status "Install from: https://www.python.org/downloads/"
        all_good=false
    fi
    
    # Check Node.js
    if command_exists node; then
        local node_version=$(get_version node)
        if version_ge "$node_version" "$NODE_VERSION"; then
            print_status "Node.js: v$node_version ✅"
        else
            print_error "Node.js $NODE_VERSION+ required, found v$node_version"
            print_status "Install from: https://nodejs.org/"
            all_good=false
        fi
    else
        print_error "Node.js is not installed. Please install Node.js $NODE_VERSION+"
        print_status "Install from: https://nodejs.org/"
        all_good=false
    fi
    
    # Check npm
    if command_exists npm; then
        local npm_version=$(npm --version)
        print_status "npm: v$npm_version ✅"
    else
        print_error "npm is not installed (usually comes with Node.js)"
        all_good=false
    fi
    
    # Check Docker
    if command_exists docker; then
        local docker_version=$(get_version docker)
        print_status "Docker: v$docker_version ✅"
        
        # Check if Docker is running
        if docker info >/dev/null 2>&1; then
            print_status "Docker daemon: Running ✅"
        else
            print_error "Docker daemon is not running. Please start Docker Desktop."
            all_good=false
        fi
    else
        print_error "Docker is not installed. Please install Docker Desktop."
        print_status "Install from: https://www.docker.com/products/docker-desktop/"
        all_good=false
    fi
    
    # Check Docker Compose
    if command_exists docker-compose || docker compose version >/dev/null 2>&1; then
        print_status "Docker Compose: Available ✅"
    else
        print_error "Docker Compose is not available"
        all_good=false
    fi
    
    if [ "$all_good" = false ]; then
        print_error "Please install missing prerequisites and run this script again."
        exit 1
    fi
    
    print_success "All prerequisites are installed! 🎉"
}

# Function to setup backend
setup_backend() {
    print_header "🐍 SETTING UP BACKEND (Django)"
    
    cd backend || {
        print_error "Backend directory not found. Are you in the ELIM project root?"
        exit 1
    }
    
    # Create virtual environment
    if [ ! -d "venv" ]; then
        print_status "Creating Python virtual environment..."
        python3 -m venv venv
        print_success "Virtual environment created"
    else
        print_status "Virtual environment already exists"
    fi
    
    # Activate virtual environment
    print_status "Activating virtual environment..."
    source venv/bin/activate || source venv/Scripts/activate 2>/dev/null || {
        print_error "Failed to activate virtual environment"
        exit 1
    }
    
    # Upgrade pip
    print_status "Upgrading pip..."
    python -m pip install --upgrade pip
    
    # Install requirements
    print_status "Installing Python dependencies..."
    pip install -r requirements.txt
    
    # Install development tools
    print_status "Installing development tools..."
    pip install black isort flake8 pytest pytest-django coverage
    
    # Setup environment file
    if [ ! -f ".env.local" ]; then
        if [ -f ".env.example" ]; then
            print_status "Creating .env.local from template..."
            cp .env.example .env.local
            print_warning "Please configure backend/.env.local with your database settings"
        else
            print_status "Creating default .env.local..."
            cat > .env.local << EOF
# ELIM Development Environment
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
EOF
        fi
        print_success "Environment file created: backend/.env.local"
    else
        print_status "Environment file already exists: backend/.env.local"
    fi
    
    cd ..
    print_success "Backend setup completed! 🐍✅"
}

# Function to setup frontend
setup_frontend() {
    print_header "⚛️ SETTING UP FRONTEND (React)"
    
    cd frontend || {
        print_error "Frontend directory not found. Are you in the ELIM project root?"
        exit 1
    }
    
    # Install npm dependencies
    print_status "Installing npm dependencies..."
    npm install
    
    # Install development tools
    print_status "Installing development tools..."
    npm install --save-dev prettier eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser
    
    # Setup Prettier configuration
    if [ ! -f ".prettierrc" ]; then
        print_status "Creating Prettier configuration..."
        cat > .prettierrc << EOF
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false
}
EOF
        print_success "Prettier configuration created"
    fi
    
    # Setup ESLint configuration (if not exists)
    if [ ! -f ".eslintrc.js" ] && [ ! -f ".eslintrc.json" ]; then
        print_status "ESLint configuration already exists in package.json"
    fi
    
    # Create environment file
    if [ ! -f ".env.local" ]; then
        print_status "Creating frontend .env.local..."
        cat > .env.local << EOF
# ELIM Frontend Development Environment
REACT_APP_API_URL=http://localhost:8000/api/v1
CHOKIDAR_USEPOLLING=true
EOF
        print_success "Frontend environment file created"
    else
        print_status "Frontend environment file already exists"
    fi
    
    cd ..
    print_success "Frontend setup completed! ⚛️✅"
}

# Function to setup database services
setup_database_services() {
    print_header "🐳 SETTING UP DATABASE SERVICES"
    
    # Check if docker-compose.yml exists
    if [ ! -f "docker-compose.yml" ]; then
        print_error "docker-compose.yml not found in project root"
        exit 1
    fi
    
    # Start database services
    print_status "Starting PostgreSQL and Redis services..."
    docker-compose up db redis -d
    
    # Wait for services to be ready
    print_status "Waiting for database services to start..."
    sleep 15
    
    # Check if PostgreSQL is ready
    print_status "Checking PostgreSQL connection..."
    local max_attempts=30
    local attempt=1
    
    while [ $attempt -le $max_attempts ]; do
        if docker-compose exec -T db pg_isready -U postgres >/dev/null 2>&1; then
            print_success "PostgreSQL is ready!"
            break
        fi
        
        if [ $attempt -eq $max_attempts ]; then
            print_error "PostgreSQL failed to start after $max_attempts attempts"
            exit 1
        fi
        
        print_status "Waiting for PostgreSQL... (attempt $attempt/$max_attempts)"
        sleep 2
        attempt=$((attempt + 1))
    done
    
    # Check Redis
    if docker-compose exec -T redis redis-cli ping >/dev/null 2>&1; then
        print_success "Redis is ready!"
    else
        print_warning "Redis may not be fully ready, but continuing..."
    fi
    
    print_success "Database services are running! 🐳✅"
}

# Function to setup database
setup_database() {
    print_header "🗄️ SETTING UP DATABASE"
    
    cd backend
    source venv/bin/activate 2>/dev/null || source venv/Scripts/activate 2>/dev/null
    
    # Run Django system checks
    print_status "Running Django system checks..."
    python manage.py check
    
    # Apply migrations
    print_status "Applying database migrations..."
    python manage.py migrate
    
    # Create superuser (optional)
    print_status "Would you like to create a superuser account? [y/N]"
    read -r create_superuser
    if [[ $create_superuser =~ ^[Yy]$ ]]; then
        print_status "Creating superuser account..."
        python manage.py createsuperuser
    else
        print_status "Skipping superuser creation (you can create one later with: python manage.py createsuperuser)"
    fi
    
    # Load initial data (if fixtures exist)
    if [ -d "fixtures" ] && [ "$(ls -A fixtures 2>/dev/null)" ]; then
        print_status "Loading initial data fixtures..."
        python manage.py loaddata fixtures/*.json
    fi
    
    cd ..
    print_success "Database setup completed! 🗄️✅"
}

# Function to setup VS Code configuration
setup_vscode_config() {
    print_header "💻 SETTING UP VS CODE CONFIGURATION"
    
    if [ ! -d ".vscode" ]; then
        mkdir .vscode
    fi
    
    # VS Code settings
    cat > .vscode/settings.json << EOF
{
  "python.defaultInterpreterPath": "./backend/venv/bin/python",
  "python.terminal.activateEnvironment": true,
  "python.formatting.provider": "black",
  "python.linting.enabled": true,
  "python.linting.flake8Enabled": true,
  "python.linting.pylintEnabled": false,
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.organizeImports": true
  },
  "[python]": {
    "editor.defaultFormatter": "ms-python.black-formatter",
    "editor.tabSize": 4
  },
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.tabSize": 2
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.tabSize": 2
  },
  "[typescriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.tabSize": 2
  },
  "[json]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.tabSize": 2
  },
  "files.exclude": {
    "**/node_modules": true,
    "**/__pycache__": true,
    "**/venv": true,
    "**/.pytest_cache": true
  },
  "search.exclude": {
    "**/node_modules": true,
    "**/venv": true
  },
  "typescript.preferences.importModuleSpecifier": "relative"
}
EOF

    # VS Code extensions recommendations
    cat > .vscode/extensions.json << EOF
{
  "recommendations": [
    "ms-python.python",
    "ms-python.black-formatter",
    "ms-python.flake8",
    "bradlc.vscode-tailwindcss",
    "esbenp.prettier-vscode",
    "ms-vscode.vscode-typescript-next",
    "bradlc.vscode-tailwindcss",
    "ms-vscode.vscode-json",
    "ms-python.pylint",
    "ms-toolsai.jupyter",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense",
    "ms-vscode.sublime-keybindings"
  ]
}
EOF

    print_success "VS Code configuration created! 💻✅"
    print_status "Recommended: Install suggested extensions when you open VS Code"
}

# Function to run tests
run_tests() {
    print_header "🧪 RUNNING TESTS"
    
    # Backend tests
    print_status "Running backend tests..."
    cd backend
    source venv/bin/activate 2>/dev/null || source venv/Scripts/activate 2>/dev/null
    python manage.py test --verbosity=2
    cd ..
    
    # Frontend tests
    print_status "Running frontend tests..."
    cd frontend
    npm test -- --watchAll=false --coverage=false
    cd ..
    
    print_success "All tests completed! 🧪✅"
}

# Function to display final instructions
show_final_instructions() {
    print_header "🎉 SETUP COMPLETE!"
    
    echo ""
    print_success "✅ $PROJECT_NAME development environment is ready!"
    echo ""
    print_status "📋 Next steps:"
    echo ""
    echo -e "${GREEN}1. Start the backend server:${NC}"
    echo "   cd backend"
    echo "   source venv/bin/activate  # On Windows: venv\\Scripts\\activate"
    echo "   python manage.py runserver"
    echo ""
    echo -e "${GREEN}2. Start the frontend server (in a new terminal):${NC}"
    echo "   cd frontend"
    echo "   npm start"
    echo ""
    echo -e "${GREEN}3. Access the application:${NC}"
    echo "   🌐 Frontend: http://localhost:3000"
    echo "   🔧 Backend API: http://localhost:8000/api/v1"
    echo "   👑 Admin: http://localhost:8000/admin"
    echo ""
    echo -e "${GREEN}4. Database connections:${NC}"
    echo "   📊 PostgreSQL: localhost:5432 (elim_db/postgres/postgres)"
    echo "   🔴 Redis: localhost:6379"
    echo ""
    echo -e "${YELLOW}📝 Important files to configure:${NC}"
    echo "   • backend/.env.local - Database and API settings"
    echo "   • frontend/.env.local - Frontend API URL"
    echo ""
    echo -e "${BLUE}💡 Helpful commands:${NC}"
    echo "   • Backend tests: cd backend && python manage.py test"
    echo "   • Frontend tests: cd frontend && npm test"
    echo "   • Code formatting: cd backend && black . && isort ."
    echo "   • Database shell: cd backend && python manage.py dbshell"
    echo "   • Django shell: cd backend && python manage.py shell"
    echo ""
    echo -e "${PURPLE}🔧 VS Code:${NC} Open the project folder in VS Code to use the configured settings"
    echo ""
    print_success "Happy coding! 🚀"
}

# Main execution
main() {
    print_header "🏛️ $PROJECT_NAME - Development Setup"
    
    # Check if we're in the right directory
    if [ ! -f "README.md" ] || [ ! -d "backend" ] || [ ! -d "frontend" ]; then
        print_error "Please run this script from the ELIM project root directory"
        print_status "The directory should contain: README.md, backend/, frontend/, docker-compose.yml"
        exit 1
    fi
    
    print_status "Setting up development environment..."
    echo ""
    
    # Run setup steps
    check_prerequisites
    setup_backend
    setup_frontend
    setup_database_services
    setup_database
    setup_vscode_config
    
    # Ask if user wants to run tests
    echo ""
    print_status "Would you like to run tests to verify the setup? [y/N]"
    read -r run_tests_choice
    if [[ $run_tests_choice =~ ^[Yy]$ ]]; then
        run_tests
    fi
    
    show_final_instructions
}

# Handle script interruption
trap 'print_error "Setup interrupted. You may need to run the script again."; exit 1' INT

# Run main function
main "$@"