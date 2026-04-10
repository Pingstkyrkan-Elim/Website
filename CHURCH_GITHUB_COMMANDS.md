# Quick Commands for Church GitHub Setup

This document contains the exact commands the church needs to run to set up the GitHub repository.

## 📋 Prerequisites

1. **Church GitHub Account**: Create organization account at https://github.com/organizations/plan
   - Suggested name: `pingstkyrkan-elim` or `elimchurch`
   - Use church email: `info@pingstkyrkan-elim.com`

2. **Create Repository**: 
   - Repository name: `elim-website`
   - Description: `Official website for Pingstkyrkan Elim church in Trelleborg, Sweden`
   - Visibility: Public (recommended)
   - **DO NOT** initialize with README, .gitignore, or license

## 🚀 Commands to Run

**Run these commands in your ELIM project directory (`/Users/alianneelm/ELIM`):**

### Step 1: Initialize Git Repository
```bash
# Navigate to project directory
cd /Users/alianneelm/ELIM

# Initialize Git
git init

# Set your Git configuration (use your info)
git config user.name "Your Name"
git config user.email "your.email@example.com"
```

### Step 2: Add All Files and Create Initial Commit
```bash
# Add all files to Git
git add .

# Create initial commit
git commit -m "Initial commit: ELIM Church Website

- Django REST API backend with user authentication
- React TypeScript frontend with modern UI
- PostgreSQL database with church-specific models
- Docker containerization for development and production
- Synology DS224+ deployment configuration
- Comprehensive documentation and deployment guides
- CI/CD workflows and collaboration templates

Features:
- Church services management
- Community programs and events
- User registration and authentication  
- Admin interface for content management
- Mobile-responsive design
- Production-ready deployment setup

Technology Stack:
- Backend: Django 4.2.7, Django REST Framework 3.14.0
- Frontend: React 18.2.0, TypeScript 4.9.5, Styled Components
- Database: PostgreSQL 15, Redis 7
- Infrastructure: Docker, Gunicorn, Nginx
- Deployment: Synology NAS, Let's Encrypt SSL"
```

### Step 3: Connect to Church GitHub Repository
```bash
# Add the church repository as origin (replace with actual church repo URL)
git remote add origin https://github.com/pingstkyrkan-elim/elim-website.git

# Rename default branch to main (if not already)
git branch -M main
```

### Step 4: Create Development Branch
```bash
# Create develop branch for ongoing development
git checkout -b develop
```

### Step 5: Push to GitHub
```bash
# Push main branch
git push -u origin main

# Push develop branch  
git push -u origin develop
```

## 🔧 Repository Configuration

**After pushing code, configure the repository on GitHub:**

### 1. Add Collaborators
1. Go to repository **Settings → Manage access**
2. Click **Add people**
3. Add developers:
   - Your GitHub username: **Admin** role
   - Other developer: **Admin** or **Write** role
   - Church admin (optional): **Maintain** role

### 2. Set Up Branch Protection
1. Go to **Settings → Branches → Add rule**
2. **Branch name pattern**: `main`
3. Enable these protections:
   - ✅ Require a pull request before merging
   - ✅ Require approvals (1 minimum)
   - ✅ Dismiss stale PR approvals when new commits are pushed
   - ✅ Require status checks to pass before merging
   - ✅ Require branches to be up to date before merging
   - ✅ Include administrators

### 3. Enable Repository Features
1. Go to **Settings → General → Features**
2. Enable:
   - ✅ Issues
   - ✅ Discussions (for community questions)
   - ✅ Projects (for task management)

### 4. Configure Security
1. Go to **Settings → Security & analysis**
2. Enable:
   - ✅ Dependency graph
   - ✅ Dependabot alerts
   - ✅ Dependabot security updates

## 👥 Team Development Workflow

### For Each Developer:

#### Initial Setup:
```bash
# Clone repository
git clone https://github.com/pingstkyrkan-elim/elim-website.git
cd elim-website

# Set up development environment (follow README.md)
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env.local
# Configure .env.local with your settings

# Start development servers (in separate terminals)
python manage.py runserver  # Backend
cd ../frontend && npm install && npm start  # Frontend
```

#### Daily Development:
```bash
# 1. Always start from develop
git checkout develop
git pull origin develop

# 2. Create feature branch
git checkout -b feature/your-feature-name

# 3. Make changes, test, commit
git add .
git commit -m "feat: describe your changes"

# 4. Push and create PR
git push origin feature/your-feature-name
# Then create Pull Request on GitHub: feature/your-feature-name → develop
```

## 📂 Repository Structure

After setup, your repository will contain:

```
elim-website/
├── 📁 .github/                 # GitHub templates and workflows
│   ├── workflows/ci.yml        # Automated testing
│   ├── CONTRIBUTING.md         # Development guidelines  
│   ├── PULL_REQUEST_TEMPLATE.md
│   └── ISSUE_TEMPLATE/
├── 📁 backend/                 # Django API
├── 📁 frontend/                # React application
├── 📁 scripts/                 # Deployment scripts
├── 🐳 docker-compose.yml       # Development containers
├── 🐳 docker-compose.synology.yml # Production containers
├── 📄 README.md                # Project documentation
├── 📄 SYNOLOGY_DEPLOYMENT_GUIDE.md
├── 📄 DOMAIN_SETUP_GUIDE.md
├── 📄 GITHUB_SETUP_INSTRUCTIONS.md
└── 📄 .gitignore               # Git ignore rules
```

## 🎯 Next Steps

1. **Church creates GitHub organization and repository**
2. **Run the commands above to push code**
3. **Configure repository settings as described**
4. **Add team members as collaborators**
5. **Start collaborative development using feature branches**
6. **When ready for production, follow Synology deployment guide**

## 📞 Support

- **Technical questions**: Create GitHub Issues
- **Feature requests**: Use Issue templates
- **General discussion**: Use GitHub Discussions
- **Deployment help**: Refer to deployment guides

---

**The repository will be ready for collaborative development with proper version control, automated testing, and professional project management! 🚀**