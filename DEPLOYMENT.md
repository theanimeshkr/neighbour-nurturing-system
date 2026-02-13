# Deployment Guide - Neighbour Nurturing Index

## Quick Overview

- **Backend:** Deploy to Railway.app (Node.js/Express)
- **Frontend:** Deploy to GitHub Pages (Static files)
- **Database:** MongoDB Atlas (Cloud)
- **Total time:** ~15 minutes

---

## PART 1: PREPARE GITHUB REPOSITORY

### Step 1: Create GitHub Account
1. Go to https://github.com
2. Sign up (if you don't have account)

### Step 2: Create Repository
1. Click **New Repository**
2. Name: `neighbour-nurturing-index`
3. Description: *Neighbour Nurturing Index - Community Platform*
4. Choose **Public** (required for GitHub Pages)
5. Click **Create Repository**

### Step 3: Get Repository URL
Copy the HTTPS URL shown (looks like: `https://github.com/yourusername/neighbour-nurturing-index.git`)

---

## PART 2: SETUP MongoDB Atlas (Cloud Database)

### Step 1: Create MongoDB Atlas Account
1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up (free tier available)
3. Create organization and project
4. Click **Build** to create cluster

### Step 2: Create Free Cluster
1. Select **Shared** (Free)
2. Choose provider & region
3. Click **Create Cluster**
4. Wait 1-3 minutes for creation

### Step 3: Get Connection String
1. Click **Connect**
2. Choose **Application** → **Node.js**
3. Copy the connection string:
   ```
   mongodb+srv://username:password@cluster.mongodb.net/dbname?retryWrites=true&w=majority
   ```
4. Replace `<username>`, `<password>`, `<dbname>`

### Step 4: Allow Network Access
1. Go to **Network Access**
2. Add IP Address
3. Click **Allow Access from Anywhere** (for simplicity)

---

## PART 3: DEPLOY BACKEND TO RAILWAY.APP

### Step 1: Create Railway Account
1. Go to https://railway.app
2. Sign up with GitHub
3. Authorize access

### Step 2: Create New Project
1. Click **Create Project**
2. Click **Deploy from GitHub**
3. Select your repo: `neighbour-nurturing-index`
4. Click **Deploy**

### Step 3: Configure Environment Variables
1. In Railway dashboard, click **Variables**
2. Add these variables:
   ```
   PORT=5000
   NODE_ENV=production
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/neighbour-nurturing-index
   JWT_SECRET=your_very_long_random_secret_key_min_32_chars
   JWT_EXPIRE=7d
   CORS_ORIGIN=https://yourusername.github.io/neighbour-nurturing-index
   ```

3. Replace values with your actual credentials

### Step 4: Get Production URL
1. Click **Settings** in Railway
2. Find your deployment URL (looks like: `https://neighbour-api-prod-abc.up.railway.app`)
3. **Save this URL** - you'll need it for frontend

### Step 5: Deploy
1. Railway auto-deploys from GitHub
2. Check **Deployments** tab for status
3. Should show ✅ when ready

---

## PART 4: PREPARE FRONTEND FOR DEPLOYMENT

### Update API URL in Frontend

Update `api.js` to use production backend URL:

```javascript
// Change this line (around line 1):
const API_BASE_URL = 'http://localhost:5000/api';

// To this (replace with YOUR Railway URL):
const API_BASE_URL = 'https://your-railway-url/api';
```

---

## PART 5: DEPLOY FRONTEND TO GITHUB PAGES

### Step 1: Create GitHub Pages Branch
Open PowerShell in project folder:

```bash
cd "c:\games\student loan mamagement system"

# Create gh-pages branch
git init
git add .
git commit -m "Initial commit - Neighbour Nurturing Index"
git branch -M main
git remote add origin https://github.com/yourusername/neighbour-nurturing-index.git
git push -u origin main
```

### Step 2: Enable GitHub Pages
1. Go to GitHub repository settings
2. Scroll to **Pages**
3. Source: Select **main** branch
4. Folder: Select **/root**
5. Click **Save**

### Step 3: Get Published URL
GitHub will show your URL:
```
https://yourusername.github.io/neighbour-nurturing-index
```

Your site goes live! 🎉

---

## PART 6: VERIFY DEPLOYMENT

### Test Frontend
1. Open `https://yourusername.github.io/neighbour-nurturing-index`
2. Website should load
3. Try interacting with features

### Test Backend
```bash
curl https://your-railway-url/api/health
```

Should respond:
```json
{"status":"Server is running","timestamp":"..."}
```

### Test Full Integration
1. Go to website
2. Try to register/login
3. Create resources/events
4. Should save to MongoDB Atlas

---

## Common Issues & Fixes

### GitHub Pages shows 404
- Check settings: **Pages** section
- Make sure branch is **main** or **gh-pages**
- Verify folder is set to **/root**
- Wait 5 minutes for GitHub to build

### API requests failing
- Check Railway URL in `api.js`
- Verify CORS_ORIGIN in Railway variables
- Check MongoDB Atlas network access

### GitHub push fails
- Install Git: https://git-scm.com/
- Configure Git:
  ```bash
  git config --global user.name "Your Name"
  git config --global user.email "your@email.com"
  ```

### MongoDB Atlas connection error
- Check connection string format
- Verify username/password
- Allow network access to your IP

---

## URLs After Deployment

Update your bookmarks:

| Component | URL |
|-----------|-----|
| Website | `https://yourusername.github.io/neighbour-nurturing-index` |
| API Base | `https://your-railway-url` |
| Health Check | `https://your-railway-url/api/health` |
| Users API | `https://your-railway-url/api/users` |
| Neighbors API | `https://your-railway-url/api/neighbors` |

---

## Next Steps

1. ✅ GitHub repo created
2. ✅ Backend deployed to Railway
3. ✅ Frontend deployed to GitHub Pages
4. ✅ Database on MongoDB Atlas
5. Share your URL with friends!

---

## Need Help?

- Railway docs: https://docs.railway.app
- GitHub Pages: https://pages.github.com
- MongoDB Atlas: https://docs.atlas.mongodb.com

---

## Production Checklist

- [ ] JWT_SECRET is strong (32+ random characters)
- [ ] CORS_ORIGIN matches your GitHub Pages URL
- [ ] MONGODB_URI is correct
- [ ] NODE_ENV is set to 'production'
- [ ] Website loads without errors
- [ ] API requests work
- [ ] Can register new users
- [ ] Can create resources/events
- [ ] Data persists after refresh

---

Congratulations! Your Neighbour Nurturing Index is now live! 🎉🏘️
