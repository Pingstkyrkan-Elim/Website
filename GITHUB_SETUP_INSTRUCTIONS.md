# GitHub Setup Instructions for ELIM Church

This document provides step-by-step instructions for setting up the ELIM project on the church's GitHub account.

## 🏛️ Repository Setup for Church Account

### Step 1: Church GitHub Account Setup

**If the church doesn't have a GitHub account yet:**

1. **Create Organization Account**
   - Go to https://github.com/organizations/plan
   - Choose "Free" plan for open source projects
   - Organization name suggestions:
     - `pingstkyrkan-elim`
     - `elim-church-trelleborg`
     - `elimchurch`
   - Add church email as primary contact

2. **Organization Settings**
   - **Profile**: Add church logo, description, website
   - **Member privileges**: Set appropriate permissions
   - **Security**: Enable two-factor authentication

### Step 2: Repository Creation

**On the church's GitHub account:**

1. **Create New Repository**
   ```
   Repository name: elim-website
   Description: Official website for Pingstkyrkan Elim church
   Visibility: Public (recommended) or Private
   Initialize: Do NOT initialize (we'll push existing code)
   ```

2. **Repository URL will be:**
   ```
   https://github.com/pingstkyrkan-elim/elim-website
   ```

### Step 3: Local Repository Setup

**Run these commands in your ELIM project directory:**

```bash
# 1. Initialize Git repository
git init

# 2. Add all files
git add .

# 3. Create initial commit
git commit -m "Initial commit: ELIM Church Website

- Django REST API backend
- React TypeScript frontend  
- Docker containerization
- Synology deployment configuration
- Comprehensive documentation"

# 4. Add church repository as origin
git remote add origin https://github.com/pingstkyrkan-elim/elim-website.git

# 5. Create and switch to develop branch
git checkout -b develop

# 6. Push both branches
git push -u origin main
git push -u origin develop
```

### Step 4: Team Access Setup

**Add developers to the repository:**

1. **Go to repository Settings → Manage access**
2. **Add collaborators:**
   - Your GitHub username: Admin access
   - Other developer: Admin or Write access
   - Church admin: Maintain access (optional)

**Permission levels:**
- **Admin**: Full access (you and main developer)
- **Write**: Can push to branches, create PRs
- **Read**: Can view and clone repository

## 👥 Team Collaboration Workflow

### Developer Setup

**Each developer should:**

1. **Clone the repository:**
   ```bash
   git clone https://github.com/pingstkyrkan-elim/elim-website.git
   cd elim-website
   ```

2. **Set up development environment:**
   ```bash
   # Follow instructions in README.md
   # Set up backend, frontend, database
   ```

3. **Configure Git:**
   ```bash
   git config user.name "Your Name"
   git config user.email "your.email@example.com"
   ```

### Branch Protection Rules

**Recommended settings for main branch:**

1. **Go to Settings → Branches → Add rule**
2. **Branch name pattern:** `main`
3. **Enable:**
   - ✅ Require a pull request before merging
   - ✅ Require approvals (1 approval minimum)
   - ✅ Dismiss stale PR approvals when new commits are pushed
   - ✅ Require status checks to pass before merging
   - ✅ Require branches to be up to date before merging
   - ✅ Include administrators (recommended)

### Development Workflow

```bash
# 1. Always start from develop branch
git checkout develop
git pull origin develop

# 2. Create feature branch
git checkout -b feature/your-feature-name

# 3. Make changes and commit
git add .
git commit -m "feat: add your feature description"

# 4. Push feature branch
git push origin feature/your-feature-name

# 5. Create Pull Request on GitHub
# Target: feature/your-feature-name → develop
```

## 🔐 Security and Access

### Repository Security

1. **Enable security features:**
   - Dependency alerts
   - Security advisories
   - Automated security updates

2. **Protect sensitive information:**
   - Never commit `.env` files
   - Use GitHub Secrets for CI/CD
   - Regular security audits

### Access Management

**Church administrator should:**
- Monitor repository access
- Review large changes before deployment
- Maintain backup of repository

## 📋 Repository Configuration

### GitHub Repository Settings

**General Settings:**
- **Features**: Enable Issues, Discussions, Projects
- **Pull Requests**: Enable auto-merge, auto-delete branches
- **Archives**: Enable

**Security:**
- **Dependency graph**: Enable
- **Dependabot alerts**: Enable
- **Dependabot security updates**: Enable

### Labels for Issues/PRs

**Priority:**
- `priority: low` - Nice to have
- `priority: medium` - Should have  
- `priority: high` - Must have
- `priority: critical` - Urgent fix needed

**Type:**
- `bug` - Something isn't working
- `enhancement` - New feature or request
- `documentation` - Improvements to docs
- `good first issue` - Good for newcomers

**Component:**
- `backend` - Django API
- `frontend` - React application
- `deployment` - Synology/Docker
- `database` - PostgreSQL related

## 📊 Project Management

### GitHub Projects (Optional)

1. **Create Project Board:**
   - Template: "Automated kanban"
   - Columns: Backlog, In Progress, Review, Done

2. **Link to Repository:**
   - Auto-add issues and PRs
   - Set up automation rules

### Milestones

**Suggested milestones:**
- **v1.0 - MVP**: Basic website functionality
- **v1.1 - Community**: User registration, events
- **v1.2 - Enhanced**: Advanced features
- **v2.0 - Mobile**: Mobile app companion

## 🚀 Deployment Integration

### GitHub Actions Secrets

**Add these secrets for CI/CD:**

1. **Go to Settings → Secrets and variables → Actions**
2. **Add repository secrets:**
   ```
   DOCKER_USERNAME=your-docker-username
   DOCKER_PASSWORD=your-docker-password
   SENTRY_DSN=your-sentry-dsn (optional)
   ```

### Deployment Workflow

**Production deployment:**
1. All changes go through `develop` branch
2. Create release branch: `release/v1.0.0`
3. Merge to `main` after testing
4. Deploy from `main` branch to Synology
5. Tag releases for version tracking

## 📞 Support and Maintenance

### Issue Reporting

**Church members can:**
- Report bugs via GitHub Issues
- Request features
- Ask questions in Discussions

### Maintenance Schedule

**Regular tasks:**
- **Weekly**: Review and merge PRs
- **Monthly**: Update dependencies
- **Quarterly**: Security audit
- **Annually**: Review access permissions

## 📋 Quick Setup Checklist

### For Church Administrator:
- [ ] Create GitHub organization account
- [ ] Set up repository with proper settings
- [ ] Add developers as collaborators
- [ ] Configure branch protection rules
- [ ] Enable security features

### For Developers:
- [ ] Clone repository locally
- [ ] Set up development environment
- [ ] Configure Git with your credentials
- [ ] Create first feature branch
- [ ] Make initial contribution

### For Repository:
- [ ] README.md updated with church information
- [ ] All documentation files present
- [ ] CI/CD workflow configured
- [ ] Security scanning enabled
- [ ] Issue templates configured

---

## 🎯 Next Steps

1. **Church creates GitHub organization/repository**
2. **Developers clone and set up local environment**
3. **Push initial code to repository**
4. **Set up branch protection and collaboration rules**
5. **Start collaborative development**

This setup ensures professional project management while maintaining the church's ownership and control over the codebase.

*For questions or support, refer to the [Contributing Guidelines](.github/CONTRIBUTING.md)*