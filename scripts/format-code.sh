#!/bin/bash

# ELIM Church Website - Code Formatting Script
# Formats all code in the project according to team standards

set -e

# Color codes
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

print_header() {
    echo -e "${BLUE}===============================================${NC}"
    echo -e "${BLUE}$1${NC}"
    echo -e "${BLUE}===============================================${NC}"
}

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

# Function to check if we're in the right directory
check_directory() {
    if [ ! -f "README.md" ] || [ ! -d "backend" ] || [ ! -d "frontend" ]; then
        print_error "Please run this script from the ELIM project root directory"
        exit 1
    fi
}

# Function to activate Python virtual environment
activate_venv() {
    cd backend
    if [ -f "venv/bin/activate" ]; then
        source venv/bin/activate
    elif [ -f "venv/Scripts/activate" ]; then
        source venv/Scripts/activate
    else
        print_error "Python virtual environment not found. Please run ./scripts/dev-setup.sh first"
        exit 1
    fi
}

# Function to format Python code
format_python() {
    print_header "🐍 FORMATTING PYTHON CODE"
    
    activate_venv
    
    # Check if formatting tools are installed
    if ! command -v black &> /dev/null; then
        print_status "Installing Black formatter..."
        pip install black
    fi
    
    if ! command -v isort &> /dev/null; then
        print_status "Installing isort..."
        pip install isort
    fi
    
    # Format with Black
    print_status "Running Black formatter..."
    black . --line-length=88 --target-version=py311
    
    # Sort imports with isort
    print_status "Sorting imports with isort..."
    isort . --profile=black
    
    print_success "Python code formatting completed! 🐍✅"
    cd ..
}

# Function to format JavaScript/TypeScript code
format_frontend() {
    print_header "⚛️ FORMATTING FRONTEND CODE"
    
    cd frontend
    
    # Check if Prettier is installed
    if [ ! -d "node_modules" ]; then
        print_status "Installing npm dependencies..."
        npm install
    fi
    
    # Install Prettier if not already installed
    if ! npx prettier --version &> /dev/null; then
        print_status "Installing Prettier..."
        npm install --save-dev prettier
    fi
    
    # Format with Prettier
    print_status "Running Prettier formatter..."
    npx prettier --write "src/**/*.{ts,tsx,js,jsx,json,css,md}" || true
    npx prettier --write "public/**/*.{html,json}" || true
    npx prettier --write "*.{json,md}" || true
    
    print_success "Frontend code formatting completed! ⚛️✅"
    cd ..
}

# Function to format configuration files
format_config() {
    print_header "⚙️ FORMATTING CONFIGURATION FILES"
    
    # Format JSON files
    if command -v prettier &> /dev/null; then
        print_status "Formatting JSON and YAML files..."
        npx prettier --write "*.{json,yml,yaml}" || true
        npx prettier --write ".vscode/*.json" || true
        npx prettier --write ".github/**/*.{yml,yaml,md}" || true
    fi
    
    # Format shell scripts (basic cleanup)
    print_status "Formatting shell scripts..."
    find scripts/ -name "*.sh" -exec sed -i '' 's/[[:space:]]*$//' {} \; 2>/dev/null || true
    
    print_success "Configuration files formatting completed! ⚙️✅"
}

# Function to run linting (optional check)
run_linting() {
    print_header "🔍 RUNNING LINTING CHECKS"
    
    # Python linting
    print_status "Running Python linting..."
    activate_venv
    
    if command -v flake8 &> /dev/null; then
        flake8 . --max-line-length=88 --ignore=E203,E266,E501,W503 || print_warning "Some Python linting issues found"
    else
        print_warning "Flake8 not installed, skipping Python linting"
    fi
    
    cd ..
    
    # Frontend linting
    print_status "Running frontend linting..."
    cd frontend
    
    if [ -f "node_modules/.bin/eslint" ]; then
        npm run lint || print_warning "Some frontend linting issues found"
    else
        print_warning "ESLint not configured, skipping frontend linting"
    fi
    
    cd ..
    print_success "Linting checks completed! 🔍✅"
}

# Function to show summary
show_summary() {
    print_header "📋 FORMATTING SUMMARY"
    
    echo ""
    print_success "✅ Code formatting completed successfully!"
    echo ""
    print_status "📊 What was formatted:"
    echo "  🐍 Python code (Black + isort)"
    echo "  ⚛️ Frontend code (Prettier)"
    echo "  ⚙️ Configuration files"
    echo ""
    print_status "💡 Next steps:"
    echo "  • Review the changes with: git diff"
    echo "  • Stage the changes with: git add ."
    echo "  • Commit the changes with: git commit -m 'style: format code'"
    echo ""
    print_status "🔧 VS Code users:"
    echo "  • Code will auto-format on save"
    echo "  • Use Ctrl/Cmd+Shift+I to format manually"
    echo ""
}

# Function to show usage
show_usage() {
    echo "ELIM Code Formatting Script"
    echo ""
    echo "Usage: ./scripts/format-code.sh [OPTIONS]"
    echo ""
    echo "Options:"
    echo "  --python-only    Format only Python code"
    echo "  --frontend-only  Format only frontend code"
    echo "  --config-only    Format only configuration files"
    echo "  --with-lint      Run linting checks after formatting"
    echo "  --help           Show this help message"
    echo ""
    echo "Examples:"
    echo "  ./scripts/format-code.sh                # Format all code"
    echo "  ./scripts/format-code.sh --python-only  # Format only Python"
    echo "  ./scripts/format-code.sh --with-lint    # Format and lint"
    echo ""
}

# Main function
main() {
    check_directory
    
    # Parse command line arguments
    PYTHON_ONLY=false
    FRONTEND_ONLY=false
    CONFIG_ONLY=false
    WITH_LINT=false
    
    while [[ $# -gt 0 ]]; do
        case $1 in
            --python-only)
                PYTHON_ONLY=true
                shift
                ;;
            --frontend-only)
                FRONTEND_ONLY=true
                shift
                ;;
            --config-only)
                CONFIG_ONLY=true
                shift
                ;;
            --with-lint)
                WITH_LINT=true
                shift
                ;;
            --help)
                show_usage
                exit 0
                ;;
            *)
                print_error "Unknown option: $1"
                show_usage
                exit 1
                ;;
        esac
    done
    
    print_header "🎨 ELIM CODE FORMATTING"
    print_status "Starting code formatting process..."
    echo ""
    
    # Run formatting based on options
    if [ "$PYTHON_ONLY" = true ]; then
        format_python
    elif [ "$FRONTEND_ONLY" = true ]; then
        format_frontend
    elif [ "$CONFIG_ONLY" = true ]; then
        format_config
    else
        # Format everything
        format_python
        format_frontend
        format_config
    fi
    
    # Run linting if requested
    if [ "$WITH_LINT" = true ]; then
        run_linting
    fi
    
    show_summary
}

# Handle script interruption
trap 'print_error "Formatting interrupted."; exit 1' INT

# Run main function
main "$@"