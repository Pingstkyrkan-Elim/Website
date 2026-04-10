# Code Formatting Guide for ELIM Project

This document explains the automatic code formatting setup for the ELIM Church Website project and how both team members should use it.

## 🎯 Overview

Automatic code formatting ensures that:
- ✅ **All code looks identical** regardless of who wrote it
- ✅ **No time wasted** on formatting discussions
- ✅ **Clean git diffs** without formatting noise
- ✅ **Professional code quality** maintained

## 🛠️ What's Been Set Up

### **1. VS Code Configuration** (`.vscode/settings.json`)
**Automatic formatting on save for:**
- **Python**: Black formatter + isort for imports
- **TypeScript/JavaScript**: Prettier formatter
- **JSON, CSS, HTML, Markdown**: Prettier formatter
- **Import organization**: Automatic on save

### **2. Python Formatting** (`backend/pyproject.toml`)
- **Black**: Code formatter (88 character line length)
- **isort**: Import sorter (compatible with Black)
- **Flake8**: Linter for code quality
- **Configuration**: Optimized for Django projects

### **3. Frontend Formatting** (`frontend/.prettierrc`)
- **Prettier**: JavaScript/TypeScript formatter
- **Settings**: Single quotes, semicolons, 80 char width
- **File types**: TS, TSX, JS, JSX, JSON, CSS, MD

### **4. Cross-Platform Standards** (`.editorconfig`)
- **Consistent indentation** across all editors
- **Line endings**: LF (Unix style)
- **Character encoding**: UTF-8
- **Trailing whitespace**: Automatically trimmed

### **5. Automation Scripts**
- **`scripts/format-code.sh`**: Format entire project
- **`scripts/dev-commands.sh format-all`**: Quick formatting
- **GitHub Actions**: Automatic formatting checks

## 🚀 How to Use

### **Daily Development (Automatic)**

**In VS Code:**
1. **Save any file** → Auto-formatted instantly
2. **Paste code** → Auto-formatted
3. **Organize imports** → Automatic on save

**No manual action needed!** ✨

### **Manual Formatting**

**Format entire project:**
```bash
./scripts/format-code.sh
```

**Format specific parts:**
```bash
./scripts/format-code.sh --python-only    # Backend only
./scripts/format-code.sh --frontend-only  # Frontend only
./scripts/format-code.sh --with-lint      # Format + lint
```

**Quick commands:**
```bash
./scripts/dev-commands.sh format-all      # Format everything
./scripts/dev-commands.sh format-backend  # Python only
./scripts/dev-commands.sh format-frontend # TypeScript only
```

### **Before Committing**

**Recommended workflow:**
```bash
# 1. Format all code
./scripts/format-code.sh

# 2. Check what changed
git diff

# 3. Add and commit
git add .
git commit -m "your commit message"
```

## 📋 Formatting Standards

### **Python Code (Black + isort)**

**Before formatting:**
```python
from django.db import models
import os
from apps.core.models import BaseModel
import json

class Service(BaseModel):
    title=models.CharField(max_length=200)
    description = models.TextField( )
    date_time    = models.DateTimeField()
```

**After formatting:**
```python
import json
import os

from django.db import models

from apps.core.models import BaseModel


class Service(BaseModel):
    title = models.CharField(max_length=200)
    description = models.TextField()
    date_time = models.DateTimeField()
```

### **Frontend Code (Prettier)**

**Before formatting:**
```typescript
import React,{useState,useEffect} from 'react';
import {ServiceType} from "../types";

const ServiceCard=({service}:{service:ServiceType})=>{
const[isLoading,setIsLoading]=useState(false)

return(<div style={{padding:"10px",margin:"5px"}}>
<h3>{service.title}</h3>
</div>)
}
```

**After formatting:**
```typescript
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ServiceType } from '../types';

const ServiceCard = ({ service }: { service: ServiceType }) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <StyledCard>
      <h3>{service.title}</h3>
    </StyledCard>
  );
};

const StyledCard = styled.div`
  padding: 1rem;
  margin: 0.5rem;
  border-radius: 8px;
  
  @media (max-width: 768px) {
    padding: 0.5rem;
    margin: 0.25rem;
  }
`;
```

## 🔧 VS Code Setup for Team Members

### **Required Extensions**
When you open the project in VS Code, install these extensions:

1. **Python extensions:**
   - Python (ms-python.python)
   - Black Formatter (ms-python.black-formatter)
   - isort (ms-python.isort)

2. **Frontend extensions:**
   - Prettier (esbenp.prettier-vscode)
   - TypeScript and JavaScript (ms-vscode.vscode-typescript-next)
   - styled-components (styled-components.vscode-styled-components)

3. **General:**
   - EditorConfig (editorconfig.editorconfig)

### **Verify Setup**
1. **Open any Python file** → Save → Should auto-format
2. **Open any TypeScript file** → Save → Should auto-format
3. **Check status bar** → Should show "Black" and "Prettier" as formatters

## 🤝 Team Collaboration Benefits

### **Before Automatic Formatting:**
```diff
- Different indentation styles
- Mixed single/double quotes
- Inconsistent import ordering
- Long lines vs short lines
- Git diffs full of formatting changes
- Time wasted discussing code style
```

### **After Automatic Formatting:**
```diff
+ Identical code style everywhere
+ Clean, focused git diffs
+ No formatting discussions needed
+ Professional, consistent codebase
+ More time for actual development
+ Easy code reviews
```

### **Example Git Diff (Clean!):**
```diff
def get_upcoming_services(self):
-   return self.filter(date_time__gte=timezone.now())
+   return self.filter(date_time__gte=timezone.now(), is_active=True)
```

Instead of:
```diff
def get_upcoming_services(self):
-       return self.filter(date_time__gte=timezone.now())
+   return self.filter(
+       date_time__gte=timezone.now(), 
+       is_active=True
+   )
```

## 🔍 Quality Checks

### **GitHub Actions**
Every PR and push automatically:
1. **Checks formatting** (fails if not formatted)
2. **Runs linting** (warns about code quality issues)
3. **Auto-formats code** (in PRs, creates formatting commit)

### **Local Checks**
```bash
# Check if code is properly formatted
./scripts/format-code.sh --with-lint

# Or check specific parts
./scripts/dev-commands.sh lint-all
./scripts/dev-commands.sh lint-backend
./scripts/dev-commands.sh lint-frontend
```

## 🚨 Troubleshooting

### **"Formatting not working in VS Code"**
1. Check that required extensions are installed
2. Restart VS Code
3. Check VS Code settings: `Cmd/Ctrl + ,` → search "format on save"
4. Verify Python interpreter points to `./backend/venv/bin/python`

### **"Different formatting on different machines"**
1. Ensure both developers use same VS Code settings
2. Run `./scripts/format-code.sh` to standardize
3. Check that `.editorconfig` is being respected

### **"Git showing formatting changes I didn't make"**
1. Run `./scripts/format-code.sh` before committing
2. Add formatting changes to your commit
3. This is normal when initially setting up formatting

### **"Formatting conflicts in PR"**
1. Pull latest changes: `git pull origin develop`
2. Format code: `./scripts/format-code.sh`
3. Commit formatting: `git commit -am "style: format code"`
4. Push: `git push`

## 📊 Commands Reference

### **Formatting Commands**
```bash
# Format everything
./scripts/format-code.sh
./scripts/dev-commands.sh format-all

# Format specific areas
./scripts/format-code.sh --python-only
./scripts/format-code.sh --frontend-only
./scripts/dev-commands.sh format-backend
./scripts/dev-commands.sh format-frontend

# Format with quality checks
./scripts/format-code.sh --with-lint
```

### **Manual Formatting**
```bash
# Python (from backend directory)
black .
isort .
flake8 .

# Frontend (from frontend directory)
npx prettier --write "src/**/*.{ts,tsx,js,jsx,json,css,md}"
npm run lint
```

### **VS Code Commands**
- **Ctrl/Cmd + Shift + I**: Format current file
- **Ctrl/Cmd + Shift + P** → "Format Document": Format current file
- **Ctrl/Cmd + Shift + P** → "Organize Imports": Sort Python imports

---

## 🎉 Result

With this setup, both team members will have:
- ✅ **Identical, professional-looking code**
- ✅ **No time wasted on formatting**
- ✅ **Clean, readable git diffs**
- ✅ **Automatic quality checks**
- ✅ **Consistent development experience**

The code formatting system ensures that the ELIM Church Website project maintains professional standards while allowing developers to focus on building great features for the church community! 🏛️✨