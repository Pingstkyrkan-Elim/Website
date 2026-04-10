# ELIM Project Deployment Guide for Synology DS224+

This comprehensive guide provides step-by-step instructions for deploying the ELIM Church Website Project to a Synology DiskStation DS224+ NAS using Docker Container Manager.

## 📋 Table of Contents

1. [Prerequisites & System Requirements](#prerequisites--system-requirements)
2. [Synology DS224+ Preparation](#synology-ds224-preparation)
3. [Project Preparation](#project-preparation)
4. [Docker Container Manager Setup](#docker-container-manager-setup)
5. [Database Configuration](#database-configuration)
6. [Application Deployment](#application-deployment)
7. [Networking & Security](#networking--security)
8. [SSL/HTTPS Setup](#sslhttps-setup)
9. [Backup & Maintenance](#backup--maintenance)
10. [Troubleshooting](#troubleshooting)
11. [Performance Optimization](#performance-optimization)

---

## 📚 Prerequisites & System Requirements

### Synology DS224+ Hardware Specifications

| Component | Specification | Impact on ELIM |
|-----------|---------------|----------------|
| **CPU** | Intel Celeron J4125 (4-core, 2.0-2.7GHz) | ⚠️ **No AVX support** - Some Docker images may not work |
| **RAM** | 2GB DDR4 (expandable to 6GB) | ⚠️ **Critical**: Upgrade to at least 4GB recommended |
| **Storage** | 2-bay NAS (3.5"/2.5" drives) | ✅ Sufficient for database and media |
| **Network** | 2x 1GbE ports | ✅ Adequate for web application |
| **USB** | 2x USB 3.2 Gen 1 | ✅ For external backups |

### Critical Requirements

1. **Memory Upgrade Required**
   - **Minimum**: 4GB RAM total (add 2GB module)
   - **Recommended**: 6GB RAM total (add 4GB module)
   - **Reason**: Default 2GB insufficient for Docker + DSM + Database

2. **DSM Version**
   - **Required**: DSM 7.0 or later
   - **Container Manager**: Must be installed (replaces Docker package)

3. **Network Configuration**
   - Static IP address recommended
   - Port forwarding configured (if external access needed)
   - Firewall rules configured

---

## 🔧 Synology DS224+ Preparation

### Step 1: Hardware Setup

1. **RAM Upgrade (Highly Recommended)**
   
   **Current Setup Analysis:**
   - Your DS224+ has 2GB DDR4 RAM
   - ELIM Docker stack needs ~1.6-2.4GB RAM
   - Synology DSM uses ~800MB-1GB RAM
   
   **Options:**
   
   **Option A - Deploy with 2GB (Test First):**
   ```bash
   # You can test deployment with current 2GB RAM
   # Monitor performance and upgrade if needed
   # Risk: May experience slow performance or memory pressure
   ```
   
   **Option B - Upgrade RAM First (Recommended):**
   ```bash
   # Power down the DS224+
   # Remove the case  
   # Install 4GB or 8GB DDR4 SO-DIMM module
   # Result: 6GB or 10GB total RAM for smooth operation
   # Cost: ~$30-60 USD
   ```

2. **Hard Drive Setup (Already Complete)**
   - ✅ You have 2x 4TB HAT3300 drives installed
   - ✅ Configure RAID 1 (mirroring) for data protection  
   - ✅ Create shared folders for Docker data

### Step 2: DSM Initial Configuration

1. **Access DSM Web Interface**
   ```
   http://your-synology-ip:5000
   ```

2. **Create Admin User**
   - Set strong password
   - Enable 2FA if possible

3. **Network Configuration**
   ```bash
   Control Panel → Network → Network Interface
   - Set static IP address
   - Configure DNS servers (8.8.8.8, 1.1.1.1)
   - Enable SSH (if needed for troubleshooting)
   ```

### Step 3: Create Shared Folders

Navigate to **Control Panel → Shared Folder** and create:

```bash
# Docker application data
/volume1/docker/

# ELIM project specific folders
/volume1/docker/elim/
/volume1/docker/elim/postgres_data/
/volume1/docker/elim/redis_data/
/volume1/docker/elim/static/
/volume1/docker/elim/media/
/volume1/docker/elim/logs/
/volume1/docker/elim/backups/
/volume1/docker/elim/ssl/
```

### Step 4: Install Container Manager

1. **Open Package Center**
2. **Search for "Container Manager"**
3. **Install Container Manager**
4. **Launch Container Manager**

---

## 📦 Project Preparation

### Step 1: Prepare Project Files on Local Machine

1. **Clone/Copy ELIM Project**
   ```bash
   # On your local machine
   git clone your-elim-repository
   cd ELIM
   
   # Copy production files
   cp docker-compose.synology.yml docker-compose.yml
   cp .env.synology .env
   ```

2. **Configure Environment Variables**
   
   Edit `.env` file with your specific configuration:
   ```bash
   # CRITICAL: Change these security settings
   SECRET_KEY=your-unique-50-character-secret-key-here
   POSTGRES_PASSWORD=your-strong-database-password
   
   # Network Configuration (Replace with your Synology IP)
   SYNOLOGY_IP=192.168.1.100
   ALLOWED_HOSTS=localhost,127.0.0.1,192.168.1.100,yourdomain.com
   CORS_ALLOWED_ORIGINS=http://192.168.1.100:3000
   REACT_APP_API_URL=http://192.168.1.100:8000/api/v1
   ```

### Step 2: Transfer Files to Synology

**Option 1: Using File Station (Web Interface)**
1. Open DSM File Station
2. Navigate to `/volume1/docker/elim/`
3. Upload entire ELIM project folder

**Option 2: Using SCP/SFTP**
```bash
# Enable SSH on Synology first
scp -r ./ELIM admin@192.168.1.100:/volume1/docker/elim/
```

**Option 3: Using Synology Drive**
1. Install Synology Drive on local machine
2. Sync ELIM folder to `/volume1/docker/elim/`

---

## 🐳 Docker Container Manager Setup

### Step 1: Access Container Manager

1. **Open Container Manager from DSM**
2. **Navigate to Project tab**
3. **Click "Create"**

### Step 2: Create ELIM Project

1. **Project Settings**
   ```
   Project Name: elim-church-website
   Path: /volume1/docker/elim
   Source: Create docker-compose.yml
   ```

2. **Docker Compose Configuration**
   - Select `docker-compose.yml` (the renamed synology version)
   - Select `.env` file for environment variables

### Step 3: Configure Resource Limits

Due to DS224+ limited resources, set appropriate limits:

```yaml
# These are already configured in docker-compose.synology.yml
deploy:
  resources:
    limits:
      memory: 512M    # PostgreSQL
      memory: 256M    # Django Backend
      memory: 256M    # React Frontend
      memory: 128M    # Redis
      memory: 256M    # Celery Worker
```

---

## 🗄️ Database Configuration

### Step 1: Pre-deployment Database Preparation

Before starting containers, ensure database directory permissions:

1. **SSH into Synology** (or use DSM Terminal)
   ```bash
   sudo mkdir -p /volume1/docker/elim/postgres_data
   sudo chown -R 999:999 /volume1/docker/elim/postgres_data
   sudo chmod 700 /volume1/docker/elim/postgres_data
   ```

### Step 2: Database Security Configuration

1. **Create Strong Database Password**
   ```bash
   # Generate secure password
   openssl rand -base64 32
   ```

2. **Update .env file**
   ```bash
   POSTGRES_PASSWORD=your-generated-secure-password
   ```

### Step 3: Database Initialization

The database will be automatically initialized on first run, but you can monitor:

```bash
# Check database logs
docker logs elim_db_prod

# Connect to database (after container is running)
docker exec -it elim_db_prod psql -U elimuser -d elim_db
```

---

## 🚀 Application Deployment

### Step 1: Deploy Containers

1. **In Container Manager Project tab**
2. **Click "Build" (if needed)**
3. **Click "Action" → "Start"**

### Step 2: Monitor Deployment

Watch container startup in Container Manager:

```bash
# Expected startup order:
1. PostgreSQL (elim_db_prod)
2. Redis (elim_redis_prod)
3. Django Backend (elim_backend_prod)
4. React Frontend (elim_frontend_prod)
5. Celery Worker (elim_celery_prod)
```

### Step 3: Verify Deployment

1. **Check Container Status**
   - All containers should show "Running" status
   - Health checks should be "Healthy"

2. **Test Database Connection**
   ```bash
   # From Container Manager terminal or SSH
   docker exec elim_backend_prod python manage.py check --database=default
   ```

3. **Create Django Superuser**
   ```bash
   docker exec -it elim_backend_prod python manage.py createsuperuser
   ```

4. **Test Application Access**
   ```
   Frontend: http://192.168.1.100:3000
   Backend: http://192.168.1.100:8000
   Admin: http://192.168.1.100:8000/admin
   ```

---

## 🌐 Networking & Security

### Step 0: Domain and Public Access Setup

Before configuring local networking, you need to connect your domain to your Synology:

#### A. Domain Registration and DNS Setup

1. **Register Your Domain**
   - Purchase domain from registrar (GoDaddy, Namecheap, Cloudflare, etc.)
   - Example: `elimchurch.com` or `pingstkyrkan-elim.com`

2. **Configure DNS Records**
   
   **Option 1: Static IP (Recommended)**
   ```bash
   # If you have static IP from ISP
   A Record: @ → your-public-static-ip
   A Record: www → your-public-static-ip
   
   # Example:
   A Record: @ → 203.0.113.100
   A Record: www → 203.0.113.100
   ```

   **Option 2: Dynamic DNS (Common for home connections)**
   ```bash
   # Use DDNS service (Synology supports many)
   CNAME: @ → your-ddns-hostname.synology.me
   CNAME: www → your-ddns-hostname.synology.me
   
   # Or third-party DDNS
   A Record: @ → managed by DDNS service
   ```

#### B. Dynamic DNS Setup (For Dynamic IP)

**Synology Built-in DDNS:**
1. **Control Panel → External Access → DDNS**
2. **Select provider:** Synology (free) or others
3. **Register subdomain:** `yourchurch.synology.me`
4. **Enable auto-update**

**Alternative DDNS Providers:**
- No-IP: `elimchurch.no-ip.org`
- DuckDNS: `elimchurch.duckdns.org`
- Cloudflare: Full DNS management

#### C. Router Configuration (Port Forwarding)

Configure your router to forward traffic to Synology:

```bash
# Standard HTTP/HTTPS ports
External Port 80 → 192.168.1.100:3000 (Frontend)
External Port 443 → 192.168.1.100:3000 (Frontend HTTPS)

# Alternative ports (if ISP blocks 80/443)
External Port 8080 → 192.168.1.100:3000
External Port 8443 → 192.168.1.100:3000

# Backend API (optional direct access)
External Port 8000 → 192.168.1.100:8000
```

**Security Note:** Only forward necessary ports. Database (5432) and Redis (6379) should NEVER be exposed.

#### D. Synology External Access Configuration

1. **Control Panel → External Access → Router Configuration**
2. **Enable UPnP** (if supported by router)
3. **Manual port forwarding setup** (if UPnP doesn't work)

### Step 1: Firewall Configuration

**DSM Firewall Rules:**
1. **Control Panel → Security → Firewall**
2. **Create rules for:**
   ```
   Port 3000 (Frontend) - Allow from LAN
   Port 8000 (Backend) - Allow from LAN
   Port 80 (HTTP) - Allow from desired sources
   Port 443 (HTTPS) - Allow from desired sources
   Port 5432 (Database) - Deny from WAN (internal only)
   Port 6379 (Redis) - Deny from WAN (internal only)
   ```

### Step 2: Network Security

1. **Internal Network Access**
   ```bash
   # Local network access only (recommended for initial setup)
   ALLOWED_HOSTS=192.168.1.100,localhost
   CORS_ALLOWED_ORIGINS=http://192.168.1.100:3000
   ```

2. **External Access (if needed)**
   ```bash
   # Configure router port forwarding:
   External:80 → 192.168.1.100:3000 (Frontend)
   External:8080 → 192.168.1.100:8000 (Backend)
   ```

### Step 3: Access Control

1. **DSM User Permissions**
   - Create dedicated user for ELIM management
   - Limit access to necessary shared folders only

2. **Django Security**
   - Strong admin passwords
   - Regular security updates
   - Enable Django security middleware

---

## 🔒 SSL/HTTPS Setup

### Step 1: SSL Certificate Options

**Option 1: Let's Encrypt (Recommended)**
1. **Control Panel → Security → Certificate**
2. **Add → Add a new certificate**
3. **Get a certificate from Let's Encrypt**
4. **Configure domain settings**

**Option 2: Self-Signed Certificate**
```bash
# Create self-signed certificate
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout /volume1/docker/elim/ssl/server.key \
  -out /volume1/docker/elim/ssl/server.crt
```

### Step 2: Configure Reverse Proxy

**Option 1: DSM Reverse Proxy**
1. **Control Panel → Application Portal → Reverse Proxy**
2. **Create rules:**
   ```
   Source: https://yourdomain.com → Destination: http://localhost:3000
   Source: https://yourdomain.com/api → Destination: http://localhost:8000
   ```

**Option 2: Nginx Container (Included)**
- Uncomment nginx service in docker-compose.synology.yml
- Configure SSL certificates in nginx configuration

---

## 💾 Backup & Maintenance

### Step 1: Automated Database Backup

Create backup script `/volume1/docker/elim/scripts/backup.sh`:

```bash
#!/bin/bash

# Configuration
BACKUP_DIR="/volume1/docker/elim/backups"
DATE=$(date +%Y%m%d_%H%M%S)
POSTGRES_PASSWORD="your-database-password"
RETENTION_DAYS=30

# Create backup directory
mkdir -p "$BACKUP_DIR"

# Database backup
docker exec elim_db_prod pg_dump -U elimuser -d elim_db > "$BACKUP_DIR/elim_db_backup_$DATE.sql"

# Compress backup
gzip "$BACKUP_DIR/elim_db_backup_$DATE.sql"

# Clean old backups
find "$BACKUP_DIR" -name "elim_db_backup_*.sql.gz" -mtime +$RETENTION_DAYS -delete

# Log backup
echo "$(date): Backup completed - elim_db_backup_$DATE.sql.gz" >> "$BACKUP_DIR/backup.log"
```

### Step 2: Schedule Backups

**DSM Task Scheduler:**
1. **Control Panel → Task Scheduler**
2. **Create → Triggered Task → User-defined script**
3. **Settings:**
   ```
   Task Name: ELIM Database Backup
   User: root
   Schedule: Daily at 2:00 AM
   Script: /volume1/docker/elim/scripts/backup.sh
   ```

### Step 3: Media Files Backup

Configure Synology Cloud Sync or Hyper Backup:
```bash
# Backup directories:
/volume1/docker/elim/media/      # User uploaded files
/volume1/docker/elim/static/     # Static assets
/volume1/docker/elim/logs/       # Application logs
```

### Step 4: Container Management

**Regular Maintenance Commands:**
```bash
# Update containers (monthly)
docker-compose pull
docker-compose up -d

# Clean up unused resources
docker system prune -f

# Monitor resource usage
docker stats

# View application logs
docker-compose logs -f --tail=100
```

---

## 🔧 Troubleshooting

### Common Issues and Solutions

#### Issue 1: Out of Memory Errors

**Symptoms:**
- Containers randomly stopping
- "OOMKilled" in container logs
- Slow performance

**Solutions:**
```bash
# Check memory usage
free -h
docker stats

# Reduce container memory limits
# Edit docker-compose.yml memory limits
# Restart containers
docker-compose restart
```

#### Issue 2: Database Connection Errors

**Symptoms:**
- Backend can't connect to database
- "Connection refused" errors

**Solutions:**
```bash
# Check database container
docker logs elim_db_prod

# Verify network connectivity
docker exec elim_backend_prod ping db

# Reset database permissions
docker exec elim_db_prod chown -R postgres:postgres /var/lib/postgresql/data
```

#### Issue 3: Port Conflicts

**Symptoms:**
- "Port already in use" errors
- Containers fail to start

**Solutions:**
```bash
# Check port usage
netstat -tulpn | grep -E '(3000|8000|5432|6379)'

# Modify ports in .env file
FRONTEND_PORT=3001
BACKEND_PORT=8001

# Restart containers
docker-compose down && docker-compose up -d
```

#### Issue 4: Performance Issues

**Symptoms:**
- Slow page load times
- High CPU usage
- Timeouts

**Solutions:**
```bash
# Monitor resources
htop
docker stats

# Optimize database
docker exec elim_db_prod psql -U elimuser -d elim_db -c "VACUUM ANALYZE;"

# Reduce worker processes
# Edit .env:
GUNICORN_WORKERS=1
CELERY_CONCURRENCY=1
```

### Log Analysis

**Important Log Locations:**
```bash
# Container logs
docker logs elim_backend_prod
docker logs elim_db_prod

# Application logs
/volume1/docker/elim/logs/django.log
/volume1/docker/elim/logs/celery.log

# System logs
/var/log/messages
/var/log/syslog
```

---

## ⚡ Performance Optimization

### DS224+ Specific Optimizations

#### 1. Memory Optimization

```bash
# .env configurations for limited memory
POSTGRES_MAX_CONNECTIONS=10
GUNICORN_WORKERS=1
CELERY_CONCURRENCY=1
REDIS_MAXMEMORY=64mb
```

#### 2. Database Optimization

**PostgreSQL Configuration:**
```sql
-- Connect to database
docker exec -it elim_db_prod psql -U elimuser -d elim_db

-- Optimize for limited resources
ALTER SYSTEM SET shared_buffers = '64MB';
ALTER SYSTEM SET effective_cache_size = '256MB';
ALTER SYSTEM SET work_mem = '2MB';
ALTER SYSTEM SET maintenance_work_mem = '32MB';
SELECT pg_reload_conf();
```

#### 3. Static File Optimization

```bash
# Enable Django static file compression
# Add to settings.py:
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

# Collect static files with compression
docker exec elim_backend_prod python manage.py collectstatic --noinput
```

#### 4. Caching Strategy

```python
# Django settings for Redis caching
CACHES = {
    'default': {
        'BACKEND': 'django.core.cache.backends.redis.RedisCache',
        'LOCATION': 'redis://redis:6379/1',
        'OPTIONS': {
            'CLIENT_CLASS': 'django_redis.client.DefaultClient',
        },
        'KEY_PREFIX': 'elim_cache',
        'TIMEOUT': 300,  # 5 minutes
    }
}
```

### Monitoring and Alerts

#### 1. Resource Monitoring Script

Create `/volume1/docker/elim/scripts/monitor.sh`:

```bash
#!/bin/bash

# Resource monitoring for DS224+
ALERT_EMAIL="admin@yourdomain.com"
MEMORY_THRESHOLD=80
DISK_THRESHOLD=85

# Check memory usage
MEMORY_USAGE=$(free | grep Mem | awk '{print ($3/$2) * 100.0}')
if (( $(echo "$MEMORY_USAGE > $MEMORY_THRESHOLD" | bc -l) )); then
    echo "High memory usage: ${MEMORY_USAGE}%" | mail -s "ELIM Alert: High Memory" $ALERT_EMAIL
fi

# Check disk usage
DISK_USAGE=$(df /volume1 | tail -1 | awk '{print $5}' | sed 's/%//')
if [ $DISK_USAGE -gt $DISK_THRESHOLD ]; then
    echo "High disk usage: ${DISK_USAGE}%" | mail -s "ELIM Alert: High Disk Usage" $ALERT_EMAIL
fi

# Check container health
docker ps --format "table {{.Names}}\t{{.Status}}" | grep -v "Up" > /tmp/down_containers
if [ -s /tmp/down_containers ]; then
    mail -s "ELIM Alert: Containers Down" $ALERT_EMAIL < /tmp/down_containers
fi
```

#### 2. Schedule Monitoring

Add to DSM Task Scheduler:
```
Task: ELIM System Monitor
Schedule: Every 15 minutes
Script: /volume1/docker/elim/scripts/monitor.sh
```

---

## 🎯 Final Deployment Checklist

### Pre-Production Checklist

- [ ] RAM upgraded to minimum 4GB
- [ ] Static IP configured
- [ ] Firewall rules configured
- [ ] SSL certificate installed
- [ ] Strong passwords set
- [ ] Database backup scheduled
- [ ] Monitoring configured
- [ ] External access tested
- [ ] Performance optimized

### Security Checklist

- [ ] Default passwords changed
- [ ] SSH access secured
- [ ] Database ports not exposed to WAN
- [ ] Django DEBUG=False
- [ ] Admin interface secured
- [ ] Regular security updates planned

### Maintenance Checklist

- [ ] Automated backups working
- [ ] Log rotation configured
- [ ] Update schedule planned
- [ ] Monitoring alerts configured
- [ ] Documentation updated
- [ ] Emergency procedures documented

---

## 📞 Support and Resources

### Synology Resources
- [Synology DS224+ User Guide](https://www.synology.com/support/download/DS224+)
- [Container Manager Documentation](https://www.synology.com/dsm/packages/ContainerManager)
- [DSM 7.0 Documentation](https://www.synology.com/dsm)

### Docker Resources
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Docker Security Best Practices](https://docs.docker.com/engine/security/)

### ELIM Project Resources
- Project Repository: [Your Git Repository]
- Django Documentation: https://docs.djangoproject.com/
- React Documentation: https://react.dev/

---

**🎉 Congratulations!** You have successfully deployed the ELIM Church Website Project to your Synology DS224+ NAS. The application is now running in a production environment with proper security, backup, and monitoring configured.

For additional support or questions about this deployment, refer to the troubleshooting section or contact your system administrator.

*Last updated: September 2025*