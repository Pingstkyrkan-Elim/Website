#!/bin/bash

# ELIM Project Automated Backup Script for Synology DS224+
# This script creates comprehensive backups of the ELIM application

# Configuration
BACKUP_BASE_DIR="/volume1/docker/elim/backups"
DATE=$(date +%Y%m%d_%H%M%S)
RETENTION_DAYS=30
LOG_FILE="$BACKUP_BASE_DIR/backup.log"

# Container names
DB_CONTAINER="elim_db_prod"
BACKEND_CONTAINER="elim_backend_prod"

# Database configuration
DB_NAME="elim_db"
DB_USER="elimuser"

# Create backup directory structure
mkdir -p "$BACKUP_BASE_DIR/database"
mkdir -p "$BACKUP_BASE_DIR/media"
mkdir -p "$BACKUP_BASE_DIR/logs"
mkdir -p "$BACKUP_BASE_DIR/configs"

# Function to log messages
log_message() {
    echo "$(date '+%Y-%m-%d %H:%M:%S'): $1" | tee -a "$LOG_FILE"
}

# Function to check if container is running
check_container() {
    if ! docker ps | grep -q "$1"; then
        log_message "ERROR: Container $1 is not running. Backup aborted."
        exit 1
    fi
}

# Start backup process
log_message "Starting ELIM backup process..."

# Check if containers are running
check_container "$DB_CONTAINER"
check_container "$BACKEND_CONTAINER"

# 1. Database Backup
log_message "Creating database backup..."
DB_BACKUP_FILE="$BACKUP_BASE_DIR/database/elim_db_backup_$DATE.sql"

if docker exec "$DB_CONTAINER" pg_dump -U "$DB_USER" -d "$DB_NAME" > "$DB_BACKUP_FILE"; then
    log_message "Database backup created: $DB_BACKUP_FILE"
    
    # Compress database backup
    if gzip "$DB_BACKUP_FILE"; then
        log_message "Database backup compressed: $DB_BACKUP_FILE.gz"
    else
        log_message "WARNING: Failed to compress database backup"
    fi
else
    log_message "ERROR: Database backup failed"
    exit 1
fi

# 2. Media Files Backup
log_message "Creating media files backup..."
MEDIA_BACKUP_FILE="$BACKUP_BASE_DIR/media/media_backup_$DATE.tar.gz"

if tar -czf "$MEDIA_BACKUP_FILE" -C "/volume1/docker/elim" media/; then
    log_message "Media files backup created: $MEDIA_BACKUP_FILE"
else
    log_message "WARNING: Media files backup failed"
fi

# 3. Static Files Backup
log_message "Creating static files backup..."
STATIC_BACKUP_FILE="$BACKUP_BASE_DIR/media/static_backup_$DATE.tar.gz"

if tar -czf "$STATIC_BACKUP_FILE" -C "/volume1/docker/elim" static/; then
    log_message "Static files backup created: $STATIC_BACKUP_FILE"
else
    log_message "WARNING: Static files backup failed"
fi

# 4. Configuration Files Backup
log_message "Creating configuration backup..."
CONFIG_BACKUP_FILE="$BACKUP_BASE_DIR/configs/config_backup_$DATE.tar.gz"

cd "/volume1/docker/elim"
if tar -czf "$CONFIG_BACKUP_FILE" \
    docker-compose.yml \
    .env \
    nginx/ \
    scripts/ \
    --exclude='scripts/logs' 2>/dev/null; then
    log_message "Configuration backup created: $CONFIG_BACKUP_FILE"
else
    log_message "WARNING: Configuration backup failed"
fi

# 5. Application Logs Backup
log_message "Creating logs backup..."
LOGS_BACKUP_FILE="$BACKUP_BASE_DIR/logs/logs_backup_$DATE.tar.gz"

if tar -czf "$LOGS_BACKUP_FILE" -C "/volume1/docker/elim" logs/; then
    log_message "Logs backup created: $LOGS_BACKUP_FILE"
else
    log_message "WARNING: Logs backup failed"
fi

# 6. Docker Images Backup (Optional - for critical deployments)
if [ "$1" = "--include-images" ]; then
    log_message "Creating Docker images backup..."
    IMAGES_BACKUP_FILE="$BACKUP_BASE_DIR/docker_images_$DATE.tar"
    
    if docker save elim-backend elim-frontend > "$IMAGES_BACKUP_FILE" 2>/dev/null; then
        log_message "Docker images backup created: $IMAGES_BACKUP_FILE"
        gzip "$IMAGES_BACKUP_FILE"
    else
        log_message "WARNING: Docker images backup failed"
    fi
fi

# 7. Database Schema Export (for migration purposes)
log_message "Creating database schema backup..."
SCHEMA_BACKUP_FILE="$BACKUP_BASE_DIR/database/schema_$DATE.sql"

if docker exec "$DB_CONTAINER" pg_dump -U "$DB_USER" -d "$DB_NAME" --schema-only > "$SCHEMA_BACKUP_FILE"; then
    log_message "Database schema backup created: $SCHEMA_BACKUP_FILE"
    gzip "$SCHEMA_BACKUP_FILE"
else
    log_message "WARNING: Database schema backup failed"
fi

# 8. Clean old backups
log_message "Cleaning old backups (older than $RETENTION_DAYS days)..."

# Clean database backups
find "$BACKUP_BASE_DIR/database" -name "*.sql.gz" -mtime +$RETENTION_DAYS -delete
find "$BACKUP_BASE_DIR/database" -name "schema_*.sql.gz" -mtime +$RETENTION_DAYS -delete

# Clean media backups
find "$BACKUP_BASE_DIR/media" -name "*.tar.gz" -mtime +$RETENTION_DAYS -delete

# Clean config backups
find "$BACKUP_BASE_DIR/configs" -name "*.tar.gz" -mtime +$RETENTION_DAYS -delete

# Clean logs backups
find "$BACKUP_BASE_DIR/logs" -name "*.tar.gz" -mtime +$RETENTION_DAYS -delete

# Clean Docker image backups (if they exist)
find "$BACKUP_BASE_DIR" -name "docker_images_*.tar.gz" -mtime +$RETENTION_DAYS -delete

log_message "Old backups cleaned"

# 9. Generate backup report
REPORT_FILE="$BACKUP_BASE_DIR/backup_report_$DATE.txt"
log_message "Generating backup report..."

cat > "$REPORT_FILE" << EOF
ELIM Project Backup Report
==========================
Date: $(date)
Backup ID: $DATE

Backup Files Created:
$(ls -lh "$BACKUP_BASE_DIR"/*/"*$DATE*" 2>/dev/null || echo "No backup files found")

Disk Usage:
$(df -h /volume1)

Container Status:
$(docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Size}}")

Database Statistics:
$(docker exec "$DB_CONTAINER" psql -U "$DB_USER" -d "$DB_NAME" -c "
SELECT 
    schemaname,
    tablename,
    attname,
    n_distinct,
    correlation
FROM pg_stats 
WHERE schemaname = 'public' 
LIMIT 10;" 2>/dev/null || echo "Could not retrieve database statistics")

Backup Summary:
- Database backup: $([ -f "$DB_BACKUP_FILE.gz" ] && echo "SUCCESS" || echo "FAILED")
- Media backup: $([ -f "$MEDIA_BACKUP_FILE" ] && echo "SUCCESS" || echo "FAILED")  
- Static backup: $([ -f "$STATIC_BACKUP_FILE" ] && echo "SUCCESS" || echo "FAILED")
- Config backup: $([ -f "$CONFIG_BACKUP_FILE" ] && echo "SUCCESS" || echo "FAILED")
- Logs backup: $([ -f "$LOGS_BACKUP_FILE" ] && echo "SUCCESS" || echo "FAILED")
- Schema backup: $([ -f "$SCHEMA_BACKUP_FILE.gz" ] && echo "SUCCESS" || echo "FAILED")

EOF

log_message "Backup report created: $REPORT_FILE"

# 10. Optional: Send notification email (if configured)
if [ ! -z "$BACKUP_EMAIL" ]; then
    log_message "Sending backup notification email..."
    echo "ELIM backup completed successfully on $(date)" | \
        mail -s "ELIM Backup Report - $DATE" -A "$REPORT_FILE" "$BACKUP_EMAIL"
fi

# 11. Optional: Upload to external storage (if configured)
if [ ! -z "$EXTERNAL_BACKUP_PATH" ]; then
    log_message "Uploading backups to external storage..."
    
    # Example for rsync to external location
    rsync -av --delete "$BACKUP_BASE_DIR/" "$EXTERNAL_BACKUP_PATH/" >> "$LOG_FILE" 2>&1
    
    if [ $? -eq 0 ]; then
        log_message "External backup upload completed successfully"
    else
        log_message "WARNING: External backup upload failed"
    fi
fi

# Final status
BACKUP_SIZE=$(du -sh "$BACKUP_BASE_DIR" | cut -f1)
log_message "Backup process completed. Total backup size: $BACKUP_SIZE"

# Return success
exit 0