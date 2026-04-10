# ELIM Project Domain Setup Guide

This guide explains how to connect your ELIM project running on Synology DS224+ to a public domain (www) so it's accessible from anywhere on the internet.

## 🌍 Overview: How Domain Connection Works

```
Internet User → Domain Name → DNS → Your Public IP → Router → Synology DS224+ → ELIM App
```

## 📋 Complete Setup Checklist

### Phase 1: Domain & DNS Setup
- [ ] Register domain name
- [ ] Configure DNS records
- [ ] Set up Dynamic DNS (if needed)
- [ ] Test DNS propagation

### Phase 2: Network Configuration
- [ ] Configure router port forwarding
- [ ] Set up Synology external access
- [ ] Configure firewall rules
- [ ] Test external connectivity

### Phase 3: SSL/HTTPS Setup
- [ ] Obtain SSL certificate
- [ ] Configure HTTPS
- [ ] Set up automatic renewal
- [ ] Test secure connections

### Phase 4: Application Configuration
- [ ] Update environment variables
- [ ] Configure CORS settings
- [ ] Update Django settings
- [ ] Test full functionality

---

## 🏷️ Phase 1: Domain & DNS Setup

### Step 1: Domain Registration

**Choose and register your domain:**

| Registrar | Cost | Features |
|-----------|------|----------|
| **Namecheap** | $10-15/year | Good value, includes WhoisGuard |
| **GoDaddy** | $12-20/year | Popular, good support |
| **Cloudflare** | $10/year | Includes free DNS, CDN, security |
| **Google Domains** | $12/year | Simple management, Google integration |

**Recommended domain names for church:**
- `elimchurch.com`
- `pingstkyrkan-elim.com`  
- `elimtrelleborg.com`
- `elimchurch.se` (Swedish domain)

### Step 2: Find Your Public IP Address

You need to know your public IP to configure DNS:

```bash
# Check your current public IP
curl ifconfig.me
# OR
curl ipinfo.io/ip

# Example result: 203.0.113.100
```

**Important:** Most home internet connections have **dynamic IP** (changes periodically). Business connections may have **static IP** (never changes).

### Step 3A: Static IP Configuration (Business/Static IP)

If you have a static IP from your ISP:

**DNS Records to create:**
```
Type: A Record    Name: @      Value: 203.0.113.100    TTL: 300
Type: A Record    Name: www    Value: 203.0.113.100    TTL: 300
Type: CNAME       Name: api    Value: www.elimchurch.com    TTL: 300
```

### Step 3B: Dynamic IP Configuration (Most Home Connections)

If your IP changes, use Dynamic DNS:

#### Option 1: Synology DDNS (Free & Easy)

1. **In Synology DSM:**
   ```
   Control Panel → External Access → DDNS → Add
   ```

2. **Configure DDNS:**
   ```
   Service Provider: Synology
   Hostname: elimchurch (will become elimchurch.synology.me)
   Username/Password: Create Synology account
   Enable Heartbeat: Yes
   ```

3. **DNS Records:**
   ```
   Type: CNAME    Name: @      Value: elimchurch.synology.me    TTL: 300
   Type: CNAME    Name: www    Value: elimchurch.synology.me    TTL: 300
   ```

#### Option 2: Cloudflare DNS (Recommended for Advanced Users)

1. **Transfer domain DNS to Cloudflare**
2. **Enable Cloudflare proxy** (free CDN and security)
3. **Configure automatic IP updates** using Cloudflare API

### Step 4: Test DNS Configuration

```bash
# Test DNS resolution
nslookup elimchurch.com
nslookup www.elimchurch.com

# Should return your public IP or DDNS hostname
```

---

## 🌐 Phase 2: Network Configuration

### Step 1: Router Port Forwarding

**Access your router's admin panel:**
- Usually: `192.168.1.1` or `192.168.0.1`
- Login with admin credentials

**Configure port forwarding:**

| Service | External Port | Internal IP | Internal Port | Protocol |
|---------|---------------|-------------|---------------|----------|
| HTTP | 80 | 192.168.1.100 | 3000 | TCP |
| HTTPS | 443 | 192.168.1.100 | 3000 | TCP |
| Alt HTTP | 8080 | 192.168.1.100 | 3000 | TCP |
| Backend API | 8000 | 192.168.1.100 | 8000 | TCP |

**⚠️ SECURITY WARNING:** Never forward database ports (5432, 6379) to the internet!

### Step 2: Synology External Access

1. **Control Panel → External Access → Router Configuration**
2. **Enable UPnP** (if your router supports it)
3. **Configure manual forwarding** (if UPnP fails)

### Step 3: Test External Connectivity

```bash
# From outside your network (use phone data or ask friend)
curl -I http://elimchurch.com
curl -I http://your-public-ip

# Should return HTTP 200 or 302
```

---

## 🔒 Phase 3: SSL/HTTPS Setup

### Option 1: Let's Encrypt (Free, Automatic)

**Using Synology DSM:**
1. **Control Panel → Security → Certificate → Add**
2. **Get certificate from Let's Encrypt**
3. **Domain:** `elimchurch.com,www.elimchurch.com`
4. **Enable auto-renewal**

**Using Certbot (Advanced):**
```bash
# Install certbot on Synology
sudo -i
wget https://dl.eff.org/certbot-auto
chmod a+x certbot-auto

# Get certificate
./certbot-auto --nginx -d elimchurch.com -d www.elimchurch.com
```

### Option 2: Cloudflare SSL (Easiest)

If using Cloudflare DNS:
1. **Enable "Flexible SSL"** in Cloudflare dashboard
2. **Set SSL/TLS mode to "Full"**
3. **Enable "Always Use HTTPS"**

### Step 3: Configure HTTPS in Application

**Update `.env` file:**
```bash
# Enable HTTPS
USE_HTTPS=true
PUBLIC_DOMAIN=https://elimchurch.com
REACT_APP_API_URL=https://elimchurch.com/api/v1

# Update CORS for HTTPS
CORS_ALLOWED_ORIGINS=https://elimchurch.com,https://www.elimchurch.com
```

---

## ⚙️ Phase 4: Application Configuration

### Step 1: Update Environment Variables

**Critical `.env` changes:**
```bash
# Domain Configuration
DOMAIN_NAME=elimchurch.com
PUBLIC_DOMAIN=https://elimchurch.com

# Django Security
ALLOWED_HOSTS=localhost,127.0.0.1,192.168.1.100,elimchurch.com,www.elimchurch.com
SECURE_SSL_REDIRECT=True
SECURE_BROWSER_XSS_FILTER=True
SECURE_CONTENT_TYPE_NOSNIFF=True

# Frontend Configuration
REACT_APP_API_URL=https://elimchurch.com/api/v1

# CORS Configuration
CORS_ALLOWED_ORIGINS=https://elimchurch.com,https://www.elimchurch.com
```

### Step 2: Update Django Settings for Production

**Add to backend settings (if not already included):**
```python
# HTTPS Settings
if env('USE_HTTPS', default=False):
    SECURE_SSL_REDIRECT = True
    SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')
    SECURE_BROWSER_XSS_FILTER = True
    SECURE_CONTENT_TYPE_NOSNIFF = True
    SECURE_HSTS_SECONDS = 31536000
    SECURE_HSTS_INCLUDE_SUBDOMAINS = True
    SECURE_HSTS_PRELOAD = True
    SESSION_COOKIE_SECURE = True
    CSRF_COOKIE_SECURE = True
```

### Step 3: Restart Services

```bash
# In Synology Container Manager or SSH
docker-compose down
docker-compose up -d

# Wait for services to start
sleep 30
```

### Step 4: Test Complete Setup

**Test external access:**
```bash
# Test frontend
curl -I https://elimchurch.com

# Test API
curl https://elimchurch.com/api/v1/church-info/

# Test admin
curl -I https://elimchurch.com/admin/
```

---

## 🔧 Troubleshooting Common Issues

### Issue 1: "This site can't be reached"

**Possible causes:**
- DNS not propagated (wait 24-48 hours)
- Port forwarding incorrect
- Firewall blocking connections
- ISP blocking ports 80/443

**Solutions:**
```bash
# Check DNS propagation
nslookup elimchurch.com 8.8.8.8

# Test with IP directly
curl http://your-public-ip:8080

# Check port forwarding with online tools
# Use canyouseeme.org to test ports
```

### Issue 2: SSL/HTTPS Issues

**Common problems:**
- Mixed content warnings
- Certificate not trusted
- Redirect loops

**Solutions:**
```bash
# Check certificate
openssl s_client -connect elimchurch.com:443

# Update all HTTP references to HTTPS
# Check browser developer tools for mixed content
```

### Issue 3: CORS Errors

**Error:** "Access-Control-Allow-Origin"

**Solution:**
```bash
# Update CORS settings in .env
CORS_ALLOWED_ORIGINS=https://elimchurch.com,https://www.elimchurch.com

# Restart backend container
docker-compose restart backend
```

### Issue 4: Django ALLOWED_HOSTS Error

**Error:** "Invalid HTTP_HOST header"

**Solution:**
```bash
# Add all possible hostnames to ALLOWED_HOSTS
ALLOWED_HOSTS=elimchurch.com,www.elimchurch.com,192.168.1.100,yourddns.synology.me

# Restart backend
docker-compose restart backend
```

---

## 🚀 Advanced Configuration

### Reverse Proxy with Nginx (Optional)

For better performance and SSL termination:

1. **Enable Nginx service** in docker-compose.synology.yml
2. **Configure SSL certificates** in nginx
3. **Route traffic through Nginx**

**Nginx configuration example:**
```nginx
server {
    listen 443 ssl http2;
    server_name elimchurch.com www.elimchurch.com;
    
    ssl_certificate /etc/nginx/ssl/fullchain.pem;
    ssl_certificate_key /etc/nginx/ssl/privkey.pem;
    
    # Frontend
    location / {
        proxy_pass http://frontend:80;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
    
    # Backend API
    location /api/ {
        proxy_pass http://backend:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
    
    # Admin interface
    location /admin/ {
        proxy_pass http://backend:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}

# Redirect HTTP to HTTPS
server {
    listen 80;
    server_name elimchurch.com www.elimchurch.com;
    return 301 https://$server_name$request_uri;
}
```

### CDN Setup with Cloudflare

**Benefits:**
- Faster load times globally
- DDoS protection
- Free SSL certificate
- Caching for static content

**Setup:**
1. **Transfer domain to Cloudflare DNS**
2. **Enable proxy (orange cloud)**
3. **Configure page rules for caching**
4. **Set up automatic HTTPS**

---

## 📊 Monitoring External Access

### Setup External Monitoring

**Free monitoring services:**
- **UptimeRobot**: Free monitoring for 5 sites
- **Pingdom**: Basic monitoring
- **StatusCake**: Free tier available

**Monitor these endpoints:**
```
https://elimchurch.com (Frontend)
https://elimchurch.com/api/v1/church-info/ (Backend API)
https://elimchurch.com/admin/ (Admin interface)
```

### Log External Access

**Nginx access logs:**
```bash
# View external access
docker logs elim_nginx_prod

# Monitor real-time access
docker logs -f elim_nginx_prod | grep "GET"
```

---

## 🎯 Final Checklist

### Domain Setup Complete ✅
- [ ] Domain registered and DNS configured
- [ ] Dynamic DNS set up (if needed)
- [ ] DNS propagation verified
- [ ] External connectivity tested

### Security & SSL Complete ✅
- [ ] SSL certificate installed
- [ ] HTTPS working properly
- [ ] Security headers configured
- [ ] Mixed content issues resolved

### Application Complete ✅
- [ ] Environment variables updated
- [ ] CORS properly configured
- [ ] Django ALLOWED_HOSTS updated
- [ ] All services restarted and tested

### Testing Complete ✅
- [ ] Frontend accessible externally
- [ ] Backend API working externally  
- [ ] Admin interface secured
- [ ] Mobile/responsive design tested
- [ ] Performance tested from different locations

---

## 📞 Support Resources

### DNS Propagation Checkers
- https://dnschecker.org/
- https://www.whatsmydns.net/

### Port Checking Tools
- https://canyouseeme.org/
- https://www.yougetsignal.com/tools/open-ports/

### SSL Testing Tools
- https://www.ssllabs.com/ssltest/
- https://www.sslshopper.com/ssl-checker.html

### Performance Testing
- https://pagespeed.web.dev/
- https://gtmetrix.com/

---

**🎉 Congratulations!** Your ELIM church website is now accessible worldwide through your custom domain with professional SSL security.

Your church community can now access the website from anywhere using:
- **https://elimchurch.com** (main website)
- **https://elimchurch.com/admin** (admin interface)

*Last updated: September 2025*