#!/bin/bash
# =============================================================================
# ELIM - Synology DS224+ Production Deployment Script
# =============================================================================
# This script prepares and deploys the ELIM application on a Synology NAS.
# Run this script ON the Synology via SSH or Task Scheduler.
#
# Usage:
#   ./scripts/synology_deploy.sh [--init|--update|--status|--generate-secrets]
# =============================================================================

set -euo pipefail

# Configuration
PROJECT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
SYNOLOGY_DATA_DIR="/volume1/docker/elim"
ENV_FILE="${PROJECT_DIR}/.env"
COMPOSE_FILE="${PROJECT_DIR}/docker-compose.synology.yml"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

log_info()  { echo -e "${BLUE}[INFO]${NC}  $1"; }
log_ok()    { echo -e "${GREEN}[OK]${NC}    $1"; }
log_warn()  { echo -e "${YELLOW}[WARN]${NC}  $1"; }
log_error() { echo -e "${RED}[ERROR]${NC} $1"; }

# ---------------------------------------------------------------------------
# Generate secure random string
# ---------------------------------------------------------------------------
generate_secret() {
    python3 -c "import secrets; print(secrets.token_urlsafe(50))" 2>/dev/null \
        || openssl rand -base64 50 | tr -d '\n/+=' | head -c 50 \
        || head -c 50 /dev/urandom | base64 | tr -d '\n/+=' | head -c 50
}

# ---------------------------------------------------------------------------
# Generate Django SECRET_KEY
# ---------------------------------------------------------------------------
generate_django_secret() {
    python3 -c "
import secrets, string
chars = string.ascii_letters + string.digits + '!@#\$%^&*(-_=+)'
print(''.join(secrets.choice(chars) for _ in range(50)))
" 2>/dev/null || generate_secret
}

# ---------------------------------------------------------------------------
# Create directory structure on Synology
# ---------------------------------------------------------------------------
create_directories() {
    log_info "Creating directory structure on Synology..."

    local dirs=(
        "${SYNOLOGY_DATA_DIR}/postgres_data"
        "${SYNOLOGY_DATA_DIR}/redis_data"
        "${SYNOLOGY_DATA_DIR}/static"
        "${SYNOLOGY_DATA_DIR}/media"
        "${SYNOLOGY_DATA_DIR}/backups"
        "${SYNOLOGY_DATA_DIR}/logs"
        "${PROJECT_DIR}/logs"
        "${PROJECT_DIR}/backups"
        "${PROJECT_DIR}/nginx/ssl"
    )

    for dir in "${dirs[@]}"; do
        if [ ! -d "$dir" ]; then
            mkdir -p "$dir"
            log_ok "Created: $dir"
        else
            log_ok "Exists:  $dir"
        fi
    done
}

# ---------------------------------------------------------------------------
# Generate .env file from template
# ---------------------------------------------------------------------------
generate_env() {
    if [ -f "$ENV_FILE" ]; then
        log_warn ".env file already exists. Skipping generation."
        log_warn "To regenerate, delete ${ENV_FILE} first."
        return
    fi

    log_info "Generating production .env file..."

    local secret_key
    secret_key=$(generate_django_secret)
    local db_password
    db_password=$(generate_secret)

    cp "${PROJECT_DIR}/.env.synology" "$ENV_FILE"

    # Replace placeholder values with generated secrets
    if [[ "$OSTYPE" == "darwin"* ]]; then
        sed -i '' "s|SECRET_KEY=your-super-secret-production-key-change-this-immediately|SECRET_KEY=${secret_key}|" "$ENV_FILE"
        sed -i '' "s|POSTGRES_PASSWORD=your-strong-database-password-here|POSTGRES_PASSWORD=${db_password}|" "$ENV_FILE"
    else
        sed -i "s|SECRET_KEY=your-super-secret-production-key-change-this-immediately|SECRET_KEY=${secret_key}|" "$ENV_FILE"
        sed -i "s|POSTGRES_PASSWORD=your-strong-database-password-here|POSTGRES_PASSWORD=${db_password}|" "$ENV_FILE"
    fi

    log_ok "Generated .env with secure secrets"
    log_warn "IMPORTANT: Edit ${ENV_FILE} to set your actual:"
    log_warn "  - SYNOLOGY_IP (your NAS IP address)"
    log_warn "  - DOMAIN_NAME (your domain if applicable)"
    log_warn "  - ALLOWED_HOSTS"
    log_warn "  - CORS_ALLOWED_ORIGINS"
    log_warn "  - CSRF_TRUSTED_ORIGINS"
    log_warn "  - REACT_APP_API_URL"
}

# ---------------------------------------------------------------------------
# Generate self-signed SSL certificate (for initial setup)
# ---------------------------------------------------------------------------
generate_self_signed_ssl() {
    local ssl_dir="${PROJECT_DIR}/nginx/ssl"

    if [ -f "${ssl_dir}/fullchain.pem" ] && [ -f "${ssl_dir}/privkey.pem" ]; then
        log_warn "SSL certificates already exist. Skipping."
        return
    fi

    log_info "Generating self-signed SSL certificate for initial setup..."

    openssl req -x509 -nodes -days 365 \
        -newkey rsa:2048 \
        -keyout "${ssl_dir}/privkey.pem" \
        -out "${ssl_dir}/fullchain.pem" \
        -subj "/C=US/ST=State/L=City/O=ELIM/CN=localhost" \
        2>/dev/null

    log_ok "Self-signed SSL certificate generated"
    log_warn "Replace with real certificates for production (Let's Encrypt recommended)"
}

# ---------------------------------------------------------------------------
# Check if using HTTP-only mode (no SSL)
# ---------------------------------------------------------------------------
setup_nginx_mode() {
    local ssl_dir="${PROJECT_DIR}/nginx/ssl"

    if [ ! -f "${ssl_dir}/fullchain.pem" ] || [ ! -f "${ssl_dir}/privkey.pem" ]; then
        log_warn "No SSL certificates found. Using HTTP-only mode."
        log_info "Switching to HTTP-only nginx config..."
        if [ -f "${PROJECT_DIR}/nginx/nginx-http-only.conf" ]; then
            cp "${PROJECT_DIR}/nginx/nginx.conf" "${PROJECT_DIR}/nginx/nginx-ssl.conf.bak" 2>/dev/null || true
            cp "${PROJECT_DIR}/nginx/nginx-http-only.conf" "${PROJECT_DIR}/nginx/nginx.conf"
            log_ok "Nginx configured for HTTP-only mode"
        fi
    else
        log_ok "SSL certificates found. Using HTTPS mode."
    fi
}

# ---------------------------------------------------------------------------
# Validate environment
# ---------------------------------------------------------------------------
validate_env() {
    log_info "Validating environment..."
    local errors=0

    # Check .env exists
    if [ ! -f "$ENV_FILE" ]; then
        log_error "Missing .env file. Run with --init first."
        errors=$((errors + 1))
    else
        # Check for placeholder values
        if grep -q "your-super-secret-production-key" "$ENV_FILE" 2>/dev/null; then
            log_error "SECRET_KEY still has placeholder value!"
            errors=$((errors + 1))
        fi
        if grep -q "your-strong-database-password" "$ENV_FILE" 2>/dev/null; then
            log_error "POSTGRES_PASSWORD still has placeholder value!"
            errors=$((errors + 1))
        fi
        if grep -q "your-synology-ip\|192\.168\.1\.100" "$ENV_FILE" 2>/dev/null; then
            log_warn "SYNOLOGY_IP may still have default value - verify it's correct"
        fi
    fi

    # Check Docker
    if ! command -v docker &>/dev/null; then
        log_error "Docker is not installed"
        errors=$((errors + 1))
    fi

    if ! command -v docker compose &>/dev/null && ! command -v docker-compose &>/dev/null; then
        log_error "Docker Compose is not installed"
        errors=$((errors + 1))
    fi

    # Check Synology data directories
    if [ ! -d "${SYNOLOGY_DATA_DIR}" ]; then
        log_warn "Synology data directory ${SYNOLOGY_DATA_DIR} does not exist"
        log_warn "This is expected if running from a development machine"
    fi

    if [ $errors -gt 0 ]; then
        log_error "$errors error(s) found. Fix them before deploying."
        return 1
    fi

    log_ok "Environment validation passed"
}

# ---------------------------------------------------------------------------
# Deploy / update the application
# ---------------------------------------------------------------------------
deploy() {
    log_info "Deploying ELIM to production..."

    validate_env || exit 1
    setup_nginx_mode

    log_info "Building and starting containers..."

    # Determine compose command
    local compose_cmd="docker compose"
    if ! docker compose version &>/dev/null 2>&1; then
        compose_cmd="docker-compose"
    fi

    $compose_cmd -f "$COMPOSE_FILE" --env-file "$ENV_FILE" build --no-cache
    $compose_cmd -f "$COMPOSE_FILE" --env-file "$ENV_FILE" up -d

    log_info "Waiting for services to be healthy..."
    sleep 10

    show_status

    log_ok "Deployment complete!"
    echo ""
    log_info "Next steps:"
    log_info "  1. Create a Django superuser:"
    log_info "     docker exec -it elim_backend_prod python manage.py createsuperuser"
    log_info "  2. Access the application at http://<your-synology-ip>"
    log_info "  3. Set up automated backups with scripts/synology_backup.sh"
}

# ---------------------------------------------------------------------------
# Show service status
# ---------------------------------------------------------------------------
show_status() {
    log_info "Service status:"
    echo ""

    local compose_cmd="docker compose"
    if ! docker compose version &>/dev/null 2>&1; then
        compose_cmd="docker-compose"
    fi

    $compose_cmd -f "$COMPOSE_FILE" ps 2>/dev/null || docker ps --filter "name=elim_" --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"

    echo ""

    # Health checks
    for container in elim_backend_prod elim_frontend_prod elim_nginx_prod elim_db_prod elim_redis_prod; do
        if docker ps --format '{{.Names}}' | grep -q "^${container}$" 2>/dev/null; then
            local health
            health=$(docker inspect --format='{{.State.Health.Status}}' "$container" 2>/dev/null || echo "no healthcheck")
            if [ "$health" = "healthy" ]; then
                log_ok "$container: $health"
            else
                log_warn "$container: $health"
            fi
        else
            log_error "$container: not running"
        fi
    done
}

# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------
case "${1:-}" in
    --init)
        log_info "=== ELIM Initial Setup ==="
        create_directories
        generate_env
        echo ""
        log_info "Setup complete. Next steps:"
        log_info "  1. Edit ${ENV_FILE} with your actual configuration values"
        log_info "  2. Add SSL certificates to ${PROJECT_DIR}/nginx/ssl/"
        log_info "     Or run: $0 --generate-ssl (self-signed for testing)"
        log_info "  3. Run: $0 --update  (to build and start)"
        ;;
    --generate-ssl)
        generate_self_signed_ssl
        ;;
    --generate-secrets)
        echo "SECRET_KEY=$(generate_django_secret)"
        echo "POSTGRES_PASSWORD=$(generate_secret)"
        ;;
    --update)
        deploy
        ;;
    --status)
        show_status
        ;;
    *)
        echo "ELIM Synology Deployment Script"
        echo ""
        echo "Usage: $0 <command>"
        echo ""
        echo "Commands:"
        echo "  --init              First-time setup (directories + .env generation)"
        echo "  --generate-ssl      Generate self-signed SSL certificate"
        echo "  --generate-secrets  Print new random secrets (does not write files)"
        echo "  --update            Build and deploy (or update) the application"
        echo "  --status            Show status of all services"
        ;;
esac
