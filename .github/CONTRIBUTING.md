# Contributing to ELIM Church Website

Thank you for contributing to the ELIM Church Website project! This document provides guidelines for collaborative development.

## 🏗️ Project Structure

```
ELIM/
├── backend/          # Django REST API
├── frontend/         # React TypeScript Application  
├── scripts/          # Deployment and utility scripts
├── docs/            # Project documentation
└── .github/         # GitHub workflows and templates
```

## 🔄 Development Workflow

### 1. Branch Strategy

We use **Git Flow** with these main branches:

- **`main`** - Production-ready code (protected)
- **`develop`** - Integration branch for features 
- **`feature/*`** - New features (e.g., `feature/user-authentication`)
- **`bugfix/*`** - Bug fixes (e.g., `bugfix/login-error`)
- **`hotfix/*`** - Critical production fixes

### 2. Getting Started

```bash
# 1. Clone the repository
git clone https://github.com/your-username/ELIM.git
cd ELIM

# 2. Create and switch to develop branch
git checkout -b develop

# 3. Set up local development environment
# Backend setup
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env.local
# Configure .env.local with your settings

# 4. Start database services
docker-compose up db redis -d

# 5. Run migrations
python manage.py migrate

# 6. Create superuser
python manage.py createsuperuser

# 7. Start backend (in one terminal)
python manage.py runserver

# 8. Setup frontend (in another terminal)
cd frontend
npm install
npm start
```

### 3. Making Changes

```bash
# 1. Always start from develop branch
git checkout develop
git pull origin develop

# 2. Create feature branch
git checkout -b feature/your-feature-name

# 3. Make your changes
# ... code, test, commit ...

# 4. Push feature branch
git push origin feature/your-feature-name

# 5. Create Pull Request on GitHub
# Target: feature/your-feature-name → develop
```

## 📋 Development Guidelines

### Code Style

**Backend (Django/Python):**
- Follow PEP 8
- Use descriptive variable names
- Add docstrings to functions and classes
- Write unit tests for new features

**Frontend (React/TypeScript):**
- Use TypeScript strict mode
- Follow React best practices
- Use functional components with hooks
- Write component tests

### Commit Message Format

```bash
# Format: type(scope): description

# Examples:
feat(backend): add user authentication API
fix(frontend): resolve login form validation
docs(readme): update installation instructions
style(backend): format code according to PEP 8
test(frontend): add unit tests for HomePage component
```

### Testing Requirements

**Before submitting a PR:**

```bash
# Backend tests
cd backend
python manage.py test

# Frontend tests  
cd frontend
npm test

# Linting
npm run lint
```

## 🔧 Local Development Environment

### Required Software

- **Python 3.11+**
- **Node.js 18+** 
- **Docker & Docker Compose**
- **Git**

### Environment Variables

**Backend (.env.local):**
```bash
DEBUG=True
SECRET_KEY=your-dev-secret-key
DB_HOST=localhost
DB_PORT=5432
DB_NAME=elim_db
DB_USER=postgres  
DB_PASSWORD=postgres
```

**Frontend:**
```bash
REACT_APP_API_URL=http://localhost:8000/api/v1
```

### Database Setup

```bash
# Start PostgreSQL and Redis
docker-compose up db redis -d

# Apply migrations
cd backend
python manage.py migrate

# Load sample data (if available)
python manage.py loaddata fixtures/sample_data.json
```

## 🐛 Issue Reporting

### Before Creating an Issue

1. Check if the issue already exists
2. Try to reproduce the issue locally
3. Gather relevant information (error messages, screenshots, etc.)

### Issue Template

**Bug Report:**
- Description of the bug
- Steps to reproduce
- Expected behavior
- Actual behavior
- Screenshots (if applicable)
- Environment details

**Feature Request:**
- Clear description of the feature
- Use case and motivation
- Proposed implementation (if you have ideas)

## 🔍 Pull Request Guidelines

### Before Submitting

- [ ] Code follows project style guidelines
- [ ] Tests pass locally
- [ ] Documentation updated (if needed)
- [ ] No sensitive information in commits
- [ ] Branch is up to date with develop

### PR Checklist

- [ ] Clear, descriptive title
- [ ] Description explains what and why
- [ ] References related issues
- [ ] Screenshots for UI changes
- [ ] Tests added for new functionality

### Review Process

1. **Automated Checks** - Tests and linting must pass
2. **Code Review** - At least one reviewer approval
3. **Testing** - Manual testing of changes
4. **Merge** - Squash and merge to develop

## 📚 Resources

### Documentation

- [Django Documentation](https://docs.djangoproject.com/)
- [Django REST Framework](https://www.django-rest-framework.org/)
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

### Project Specific

- [API Documentation](docs/API.md)
- [Deployment Guide](SYNOLOGY_DEPLOYMENT_GUIDE.md)
- [Domain Setup](DOMAIN_SETUP_GUIDE.md)

## 🤝 Collaboration Guidelines

### Communication

- Use GitHub Issues for bug reports and feature requests
- Use GitHub Discussions for questions and general discussion
- Be respectful and constructive in all interactions
- Ask questions if anything is unclear

### Code Reviews

**As a Reviewer:**
- Be constructive and helpful
- Focus on code quality and maintainability
- Test changes locally when possible
- Approve when satisfied with changes

**As an Author:**
- Respond to feedback promptly
- Make requested changes or explain why not
- Keep PRs focused and reasonably sized
- Update documentation as needed

## 🚀 Release Process

### Development to Production

```bash
# 1. Feature complete in develop
git checkout develop
git pull origin develop

# 2. Create release branch  
git checkout -b release/v1.0.0

# 3. Final testing and bug fixes
# ... test, fix, commit ...

# 4. Merge to main
git checkout main
git merge release/v1.0.0
git tag v1.0.0
git push origin main --tags

# 5. Merge back to develop
git checkout develop  
git merge release/v1.0.0
git push origin develop
```

### Deployment

- **Staging**: Automatically deployed from `develop` branch
- **Production**: Manual deployment from `main` branch tags
- Follow the [Synology Deployment Guide](SYNOLOGY_DEPLOYMENT_GUIDE.md)

## ❓ Getting Help

If you need help:

1. Check this contributing guide
2. Search existing issues
3. Create a new issue with detailed information
4. Join project discussions

Thank you for contributing to the ELIM Church Website! 🏛️