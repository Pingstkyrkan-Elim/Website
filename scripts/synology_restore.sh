#!/bin/bash

# ELIM Project Restore Script for Synology DS224+
# This script restores ELIM application from backup files

# Configuration
BACKUP_BASE_DIR="/volume1/docker/elim/backups"
RESTORE_LOG="/volume1/docker/elim/logs/restore.log"

# Container names
DB_CONTAINER="elim_db_prod"
BACKEND_CONTAINER="elim_backend_prod"

# Database configuration
DB_NAME="elim_db"
DB_USER="elimuser"

# Function to log messages
log_message() {
    echo "$(date '+%Y-%m-%d %H:%M:%S'): $1" | tee -a "$RESTORE_LOG"
}

# Function to display usage
show_usage() {
    echo "ELIM Restore Script Usage:"
    echo ""
    echo "Usage: $0 [OPTIONS] BACKUP_DATE"
    echo ""
    echo "Options:"
    echo "  --database-only    Restore only the database"
    echo "  --media-only       Restore only media files"
    echo "  --config-only      Restore only configuration files"
    echo "  --full             Restore everything (default)"
    echo "  --list             List available backups"
    echo "  --help             Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0 20240907_140000                    # Full restore from backup"
    echo "  $0 --database-only 20240907_140000   # Restore only database"
    echo "  $0 --list                            # List available backups"
    echo ""
    exit 1
}

# Function to list available backups
list_backups() {
    echo "Available ELIM Backups:"
    echo "======================="
    
    if [ -d "$BACKUP_BASE_DIR/database" ]; then
        echo ""
        echo "Database Backups:"
        ls -la "$BACKUP_BASE_DIR/database/" | grep "elim_db_backup_" | awk '{print $9, $5, $6, $7, $8}'
    fi
    
    if [ -d "$BACKUP_BASE_DIR/media" ]; then
        echo ""
        echo "Media Backups:"
        ls -la "$BACKUP_BASE_DIR/media/" | grep "media_backup_" | awk '{print $9, $5, $6, $7, $8}'
    fi
    
    if [ -d "$BACKUP_BASE_DIR/configs" ]; then
        echo ""
        echo "Configuration Backups:"
        ls -la "$BACKUP_BASE_DIR/configs/" | grep "config_backup_" | awk '{print $9, $5, $6, $7, $8}'
    fi
    
    exit 0
}

# Function to check if backup files exist
check_backup_exists() {
    local backup_date=$1
    local backup_type=$2
    local backup_file=""
    
    case $backup_type in
        "database")
            backup_file="$BACKUP_BASE_DIR/database/elim_db_backup_${backup_date}.sql.gz"
            ;;
        "media")
            backup_file="$BACKUP_BASE_DIR/media/media_backup_${backup_date}.tar.gz"
            ;;
        "static")
            backup_file="$BACKUP_BASE_DIR/media/static_backup_${backup_date}.tar.gz"
            ;;
        "config")
            backup_file="$BACKUP_BASE_DIR/configs/config_backup_${backup_date}.tar.gz"
            ;;
    esac
    
    if [ ! -f "$backup_file" ]; then
        log_message "ERROR: Backup file not found: $backup_file"
        return 1
    fi
    
    return 0
}

# Function to stop containers
stop_containers() {
    log_message "Stopping ELIM containers..."
    
    docker-compose -f /volume1/docker/elim/docker-compose.yml down
    
    # Wait for containers to stop
    sleep 10
    
    log_message "Containers stopped"
}

# Function to start containers
start_containers() {
    log_message "Starting ELIM containers..."
    
    cd /volume1/docker/elim
    docker-compose up -d
    
    # Wait for containers to start
    sleep 30
    
    log_message "Containers started"
}

# Function to restore database
restore_database() {
    local backup_date=$1
    local db_backup_file="$BACKUP_BASE_DIR/database/elim_db_backup_${backup_date}.sql.gz"
    
    log_message "Starting database restore from: $db_backup_file"
    
    if ! check_backup_exists "$backup_date" "database"; then
        return 1
    fi
    
    # Stop all containers first
    stop_containers
    
    # Start only database container
    log_message "Starting database container..."
    docker-compose -f /volume1/docker/elim/docker-compose.yml up -d db
    sleep 20
    
    # Check if database container is running
    if ! docker ps | grep -q "$DB_CONTAINER"; then
        log_message "ERROR: Database container failed to start"
        return 1
    fi
    
    # Drop existing database and recreate
    log_message "Recreating database..."
    docker exec "$DB_CONTAINER" dropdb -U "$DB_USER" "$DB_NAME" 2>/dev/null || true
    docker exec "$DB_CONTAINER" createdb -U "$DB_USER" "$DB_NAME"
    
    # Restore database from backup
    log_message "Restoring database data..."
    if gunzip -c "$db_backup_file" | docker exec -i "$DB_CONTAINER" psql -U "$DB_USER" -d "$DB_NAME"; then
        log_message "Database restore completed successfully"
        return 0
    else
        log_message "ERROR: Database restore failed"
        return 1
    fi
}

# Function to restore media files
restore_media() {
    local backup_date=$1
    local media_backup_file="$BACKUP_BASE_DIR/media/media_backup_${backup_date}.tar.gz"
    
    log_message "Starting media files restore from: $media_backup_file"
    
    if ! check_backup_exists "$backup_date" "media"; then
        return 1
    fi
    
    # Create backup of current media files
    if [ -d "/volume1/docker/elim/media" ]; then
        log_message "Backing up current media files..."
        mv "/volume1/docker/elim/media" "/volume1/docker/elim/media.backup.$(date +%Y%m%d_%H%M%S)"
    fi
    
    # Extract media backup
    log_message "Extracting media files..."
    if tar -xzf "$media_backup_file" -C "/volume1/docker/elim/"; then
        log_message "Media files restore completed successfully"
        
        # Set correct permissions
        chown -R 1000:1000 "/volume1/docker/elim/media"
        chmod -R 755 "/volume1/docker/elim/media"
        
        return 0
    else
        log_message "ERROR: Media files restore failed"
        return 1
    fi
}

# Function to restore static files
restore_static() {
    local backup_date=$1
    local static_backup_file="$BACKUP_BASE_DIR/media/static_backup_${backup_date}.tar.gz"
    
    log_message "Starting static files restore from: $static_backup_file"
    
    if ! check_backup_exists "$backup_date" "static"; then
        return 1
    fi
    
    # Create backup of current static files
    if [ -d "/volume1/docker/elim/static" ]; then
        log_message "Backing up current static files..."
        mv "/volume1/docker/elim/static" "/volume1/docker/elim/static.backup.$(date +%Y%m%d_%H%M%S)"
    fi
    
    # Extract static backup
    log_message "Extracting static files..."
    if tar -xzf "$static_backup_file" -C "/volume1/docker/elim/"; then
        log_message "Static files restore completed successfully"
        
        # Set correct permissions
        chown -R 1000:1000 "/volume1/docker/elim/static"
        chmod -R 755 "/volume1/docker/elim/static"
        
        return 0
    else
        log_message "ERROR: Static files restore failed"
        return 1
    fi
}

# Function to restore configuration files
restore_config() {
    local backup_date=$1
    local config_backup_file="$BACKUP_BASE_DIR/configs/config_backup_${backup_date}.tar.gz"
    
    log_message "Starting configuration restore from: $config_backup_file"
    
    if ! check_backup_exists "$backup_date" "config"; then
        return 1
    fi
    
    # Create backup of current configuration
    log_message "Backing up current configuration..."
    mkdir -p "/volume1/docker/elim/config.backup.$(date +%Y%m%d_%H%M%S)"
    cp -r /volume1/docker/elim/docker-compose.yml \
          /volume1/docker/elim/.env \
          /volume1/docker/elim/nginx \
          /volume1/docker/elim/scripts \
          "/volume1/docker/elim/config.backup.$(date +%Y%m%d_%H%M%S)/" 2>/dev/null || true
    
    # Extract configuration backup
    log_message "Extracting configuration files..."
    if tar -xzf "$config_backup_file" -C "/volume1/docker/elim/"; then
        log_message "Configuration restore completed successfully"
        
        # Set correct permissions
        chmod +x /volume1/docker/elim/scripts/*.sh
        
        return 0
    else
        log_message "ERROR: Configuration restore failed"
        return 1
    fi
}

# Function to verify restore
verify_restore() {
    log_message "Verifying restore..."
    
    # Wait for services to be fully ready
    sleep 30
    
    # Check database connectivity
    if docker exec "$DB_CONTAINER" psql -U "$DB_USER" -d "$DB_NAME" -c "SELECT 1;" >/dev/null 2>&1; then
        log_message "Database connectivity: OK"
    else
        log_message "WARNING: Database connectivity issues detected"
    fi
    
    # Check backend health
    if docker exec "$BACKEND_CONTAINER" python manage.py check >/dev/null 2>&1; then
        log_message "Backend health check: OK"
    else
        log_message "WARNING: Backend health check failed"
    fi
    
    # Check if admin interface is accessible
    if curl -s -o /dev/null -w "%{http_code}" http://localhost:8000/admin/ | grep -q "200\|302"; then
        log_message "Admin interface: OK"
    else
        log_message "WARNING: Admin interface not accessible"
    fi
    
    log_message "Restore verification completed"
}

# Main restore function
perform_restore() {
    local restore_type=$1
    local backup_date=$2
    
    log_message "Starting $restore_type restore for backup date: $backup_date"
    
    case $restore_type in
        "database-only")
            if restore_database "$backup_date"; then
                start_containers
                verify_restore
            else
                log_message "Database restore failed"
                exit 1
            fi
            ;;
        "media-only")
            restore_media "$backup_date"
            restore_static "$backup_date"
            ;;
        "config-only")
            restore_config "$backup_date"
            ;;
        "full")
            if restore_database "$backup_date"; then
                restore_media "$backup_date"
                restore_static "$backup_date"
                restore_config "$backup_date"
                start_containers
                verify_restore
            else
                log_message "Full restore failed during database restore"
                exit 1
            fi
            ;;
    esac
    
    log_message "$restore_type restore completed successfully"
}

# Parse command line arguments
RESTORE_TYPE="full"
BACKUP_DATE=""

while [[ $# -gt 0 ]]; do
    case $1 in
        --database-only)
            RESTORE_TYPE="database-only"
            shift
            ;;
        --media-only)
            RESTORE_TYPE="media-only"
            shift
            ;;
        --config-only)
            RESTORE_TYPE="config-only"
            shift
            ;;
        --full)
            RESTORE_TYPE="full"
            shift
            ;;
        --list)
            list_backups
            ;;
        --help)
            show_usage
            ;;
        *)
            if [ -z "$BACKUP_DATE" ]; then
                BACKUP_DATE=$1
            else
                echo "ERROR: Unknown option: $1"
                show_usage
            fi
            shift
            ;;
    esac
done

# Check if backup date is provided
if [ -z "$BACKUP_DATE" ]; then
    echo "ERROR: Backup date is required"
    echo ""
    show_usage
fi

# Validate backup date format
if [[ ! "$BACKUP_DATE" =~ ^[0-9]{8}_[0-9]{6}$ ]]; then
    echo "ERROR: Invalid backup date format. Expected: YYYYMMDD_HHMMSS"
    echo "Example: 20240907_140000"
    exit 1
fi

# Create log directory
mkdir -p "$(dirname "$RESTORE_LOG")"

# Confirmation prompt
echo "WARNING: This will restore ELIM application from backup dated: $BACKUP_DATE"
echo "Restore type: $RESTORE_TYPE"
echo ""
echo "This operation may overwrite existing data. Are you sure you want to continue?"
read -p "Type 'yes' to confirm: " confirmation

if [ "$confirmation" != "yes" ]; then
    echo "Restore cancelled."
    exit 0
fi

# Perform restore
log_message "ELIM restore started by user: $(whoami)"
log_message "Restore type: $RESTORE_TYPE"
log_message "Backup date: $BACKUP_DATE"

perform_restore "$RESTORE_TYPE" "$BACKUP_DATE"

log_message "ELIM restore process completed successfully"

echo ""
echo "Restore completed! Check the log file for details: $RESTORE_LOG"
echo ""
echo "Application URLs:"
echo "  Frontend: http://$(hostname -I | awk '{print $1}'):3000"
echo "  Backend:  http://$(hostname -I | awk '{print $1}'):8000"
echo "  Admin:    http://$(hostname -I | awk '{print $1}'):8000/admin"
echo ""

exit 0