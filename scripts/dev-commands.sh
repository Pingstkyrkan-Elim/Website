#!/bin/bash

# ELIM Church Website - Development Commands
# Quick commands for common development tasks

set -e

# Color codes
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

print_usage() {
    echo "ELIM Development Commands"
    echo ""
    echo "Usage: ./scripts/dev-commands.sh [command]"
    echo ""
    echo "Available commands:"
    echo "  start-backend     Start Django development server"
    echo "  start-frontend    Start React development server"
    echo "  start-all        Start backend, frontend, and database services"
    echo "  stop-all         Stop all services"
    echo "  test-backend     Run Django tests"
    echo "  test-frontend    Run React tests"
    echo "  test-all         Run all tests"
    echo "  format-backend   Format Python code with Black and isort"
    echo "  format-frontend  Format TypeScript/JavaScript code with Prettier"
    echo "  format-all       Format all code"
    echo "  lint-backend     Lint Python code with flake8"
    echo "  lint-frontend    Lint TypeScript/JavaScript code with ESLint"
    echo "  lint-all         Lint all code"
    echo "  migrate          Apply Django migrations"
    echo "  makemigrations   Create Django migrations"
    echo "  shell            Open Django shell"
    echo "  dbshell          Open database shell"
    echo "  logs             Show Docker container logs"
    echo "  reset-db         Reset database (WARNING: destroys all data)"
    echo "  install-deps     Install/update all dependencies"
    echo "  clean            Clean build artifacts and caches"
    echo ""
}

activate_backend() {
    cd backend
    if [ -f "venv/bin/activate" ]; then
        source venv/bin/activate
    elif [ -f "venv/Scripts/activate" ]; then
        source venv/Scripts/activate
    else
        echo -e "${RED}Error: Python virtual environment not found${NC}"
        echo "Please run ./scripts/dev-setup.sh first"
        exit 1
    fi
}

start_backend() {
    echo -e "${BLUE}Starting Django backend...${NC}"
    activate_backend
    python manage.py runserver
}

start_frontend() {
    echo -e "${BLUE}Starting React frontend...${NC}"
    cd frontend
    npm start
}

start_all() {
    echo -e "${BLUE}Starting all services...${NC}"
    
    # Start database services
    docker-compose up db redis -d
    sleep 5
    
    echo -e "${GREEN}Database services started${NC}"
    echo -e "${YELLOW}To start development servers, run in separate terminals:${NC}"
    echo "  ./scripts/dev-commands.sh start-backend"
    echo "  ./scripts/dev-commands.sh start-frontend"
    echo ""
    echo -e "${YELLOW}Or start them automatically (Ctrl+C to stop):${NC}"
    
    # Start backend in background
    activate_backend
    python manage.py runserver &
    BACKEND_PID=$!
    
    cd ../frontend
    npm start &
    FRONTEND_PID=$!
    
    echo -e "${GREEN}Services started!${NC}"
    echo "Frontend: http://localhost:3000"
    echo "Backend: http://localhost:8000"
    echo ""
    echo "Press Ctrl+C to stop all services..."
    
    # Wait and cleanup
    trap "kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; exit" INT
    wait
}

stop_all() {
    echo -e "${BLUE}Stopping all services...${NC}"
    
    # Stop Docker services
    docker-compose down
    
    # Kill any running Node/Python processes (be careful!)
    pkill -f "npm start" 2>/dev/null || true
    pkill -f "python manage.py runserver" 2>/dev/null || true
    
    echo -e "${GREEN}All services stopped${NC}"
}

test_backend() {
    echo -e "${BLUE}Running Django tests...${NC}"
    activate_backend
    python manage.py test --verbosity=2
}

test_frontend() {
    echo -e "${BLUE}Running React tests...${NC}"
    cd frontend
    npm test -- --watchAll=false
}

test_all() {
    echo -e "${BLUE}Running all tests...${NC}"
    test_backend
    test_frontend
    echo -e "${GREEN}All tests completed!${NC}"
}

format_backend() {
    echo -e "${BLUE}Formatting Python code...${NC}"
    activate_backend
    black .
    isort .
    echo -e "${GREEN}Backend code formatted${NC}"
}

format_frontend() {
    echo -e "${BLUE}Formatting frontend code...${NC}"
    cd frontend
    npx prettier --write "src/**/*.{ts,tsx,js,jsx,json,css,md}"
    echo -e "${GREEN}Frontend code formatted${NC}"
}

format_all() {
    format_backend
    format_frontend
    echo -e "${GREEN}All code formatted!${NC}"
}

lint_backend() {
    echo -e "${BLUE}Linting Python code...${NC}"
    activate_backend
    flake8 .
    echo -e "${GREEN}Backend linting completed${NC}"
}

lint_frontend() {
    echo -e "${BLUE}Linting frontend code...${NC}"
    cd frontend
    npm run lint
    echo -e "${GREEN}Frontend linting completed${NC}"
}

lint_all() {
    lint_backend
    lint_frontend
    echo -e "${GREEN}All linting completed!${NC}"
}

migrate() {
    echo -e "${BLUE}Applying Django migrations...${NC}"
    activate_backend
    python manage.py migrate
    echo -e "${GREEN}Migrations applied${NC}"
}

makemigrations() {
    echo -e "${BLUE}Creating Django migrations...${NC}"
    activate_backend
    python manage.py makemigrations
    echo -e "${GREEN}Migrations created${NC}"
}

django_shell() {
    echo -e "${BLUE}Opening Django shell...${NC}"
    activate_backend
    python manage.py shell
}

db_shell() {
    echo -e "${BLUE}Opening database shell...${NC}"
    activate_backend
    python manage.py dbshell
}

show_logs() {
    echo -e "${BLUE}Showing Docker container logs...${NC}"
    docker-compose logs -f --tail=50
}

reset_db() {
    echo -e "${RED}WARNING: This will destroy all database data!${NC}"
    echo -e "${YELLOW}Are you sure? Type 'yes' to continue:${NC}"
    read -r confirmation
    
    if [ "$confirmation" = "yes" ]; then
        echo -e "${BLUE}Resetting database...${NC}"
        
        # Stop services
        docker-compose down
        
        # Remove database volume
        docker-compose down -v
        
        # Start database services
        docker-compose up db redis -d
        sleep 10
        
        # Run migrations
        activate_backend
        python manage.py migrate
        
        echo -e "${GREEN}Database reset completed${NC}"
        echo -e "${YELLOW}Don't forget to create a new superuser: python manage.py createsuperuser${NC}"
    else
        echo -e "${YELLOW}Database reset cancelled${NC}"
    fi
}

install_deps() {
    echo -e "${BLUE}Installing/updating dependencies...${NC}"
    
    # Backend dependencies
    activate_backend
    pip install --upgrade pip
    pip install -r requirements.txt
    
    # Frontend dependencies
    cd ../frontend
    npm install
    
    echo -e "${GREEN}Dependencies updated${NC}"
}

clean() {
    echo -e "${BLUE}Cleaning build artifacts and caches...${NC}"
    
    # Python cache
    find . -type d -name "__pycache__" -exec rm -rf {} + 2>/dev/null || true
    find . -type f -name "*.pyc" -delete 2>/dev/null || true
    
    # Node modules (optional - uncomment if needed)
    # rm -rf frontend/node_modules
    
    # Build directories
    rm -rf frontend/build 2>/dev/null || true
    rm -rf backend/staticfiles 2>/dev/null || true
    
    # Test coverage
    rm -rf backend/.coverage 2>/dev/null || true
    rm -rf frontend/coverage 2>/dev/null || true
    
    echo -e "${GREEN}Cleanup completed${NC}"
}

# Check if we're in the right directory
if [ ! -f "README.md" ] || [ ! -d "backend" ] || [ ! -d "frontend" ]; then
    echo -e "${RED}Error: Please run this script from the ELIM project root directory${NC}"
    exit 1
fi

# Main command routing
case "${1:-}" in
    "start-backend")
        start_backend
        ;;
    "start-frontend") 
        start_frontend
        ;;
    "start-all")
        start_all
        ;;
    "stop-all")
        stop_all
        ;;
    "test-backend")
        test_backend
        ;;
    "test-frontend")
        test_frontend
        ;;
    "test-all")
        test_all
        ;;
    "format-backend")
        format_backend
        ;;
    "format-frontend")
        format_frontend
        ;;
    "format-all")
        format_all
        ;;
    "lint-backend")
        lint_backend
        ;;
    "lint-frontend") 
        lint_frontend
        ;;
    "lint-all")
        lint_all
        ;;
    "migrate")
        migrate
        ;;
    "makemigrations")
        makemigrations
        ;;
    "shell")
        django_shell
        ;;
    "dbshell")
        db_shell
        ;;
    "logs")
        show_logs
        ;;
    "reset-db")
        reset_db
        ;;
    "install-deps")
        install_deps
        ;;
    "clean")
        clean
        ;;
    *)
        print_usage
        ;;
esac