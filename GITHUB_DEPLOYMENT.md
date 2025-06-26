# 🚀 GitHub Pages Deployment Guide

## Prerequisites
- GitHub account
- Git installed on your computer
- Your Quizzo app ready

## Step-by-Step Instructions

### 1. Create GitHub Repository

1. **Go to [github.com](https://github.com)** and sign in
2. **Click "New repository"** (green button in top right)
3. **Repository name**: `QuizzoApp`
4. **Description**: `AI-powered quiz app with LLM integration`
5. **Make it Public** (required for free GitHub Pages)
6. **Don't check** "Add a README file" (we already have one)
7. **Click "Create repository"**

### 2. Update Homepage URL

**IMPORTANT**: Replace `[YOUR-GITHUB-USERNAME]` in `package.json` with your actual GitHub username.

For example, if your GitHub username is `johnsmith`, change:
```json
"homepage": "https://[YOUR-GITHUB-USERNAME].github.io/QuizzoApp"
```
to:
```json
"homepage": "https://johnsmith.github.io/QuizzoApp"
```

### 3. Initialize Git and Push to GitHub

Run these commands in your terminal:

```bash
# Initialize git repository
git init

# Add all files
git add .

# Commit the files
git commit -m "Initial commit: Quizzo AI Quiz App"

# Add your GitHub repository as remote
git remote add origin https://github.com/[YOUR-GITHUB-USERNAME]/QuizzoApp.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### 4. Deploy to GitHub Pages

```bash
# Deploy the app
npm run deploy
```

### 5. Enable GitHub Pages

1. **Go to your repository** on GitHub
2. **Click "Settings"** tab
3. **Scroll down to "Pages"** section (in left sidebar)
4. **Source**: Select "Deploy from a branch"
5. **Branch**: Select "gh-pages" and "/(root)"
6. **Click "Save"**

### 6. Your App is Live! 🎉

Your app will be available at:
`https://[YOUR-GITHUB-USERNAME].github.io/QuizzoApp`

## Troubleshooting

### If you get an error about gh-pages not found:
```bash
npm install --save-dev gh-pages
```

### If the homepage URL is wrong:
1. Update the homepage in `package.json`
2. Run `npm run deploy` again

### If the app doesn't load:
1. Check that the repository is public
2. Wait a few minutes for GitHub Pages to build
3. Check the "Actions" tab for any build errors

## Commands Summary

```bash
# 1. Install gh-pages
npm install --save-dev gh-pages

# 2. Update homepage in package.json with your username

# 3. Initialize git and push
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/[YOUR-GITHUB-USERNAME]/QuizzoApp.git
git branch -M main
git push -u origin main

# 4. Deploy
npm run deploy

# 5. Enable GitHub Pages in repository settings
```

## Your App URL
After deployment, your app will be live at:
`https://[YOUR-GITHUB-USERNAME].github.io/QuizzoApp`

## Features Available Online
- ✅ AI-powered quiz topic generation
- ✅ Custom topic input
- ✅ Real-time quiz taking
- ✅ Difficulty levels
- ✅ Progress tracking
- ✅ Mobile-responsive design
- ✅ Settings persistence

---

**🎯 Your Quizzo app will be accessible worldwide!** 