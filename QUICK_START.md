# 🏘️ Neighbour Nurturing Index - Complete Setup Guide

## Quick Start - 5 Minutes

### What's Included:
✅ **Frontend** - Beautiful responsive website with Google Maps  
✅ **Backend API** - Node.js/Express REST API  
✅ **Database** - MongoDB integration  
✅ **Authentication** - JWT-based user authentication  
✅ **Real-time Features** - Neighbors, Resources, Events management  

---

## PART 1: BACKEND SETUP (5 minutes)

### Prerequisites:
- Node.js installed: https://nodejs.org/
- MongoDB installed or Atlas account: https://www.mongodb.com/

### Installation:

1. **Open Terminal/PowerShell**
   ```powershell
   cd "c:\games\student loan mamagement system\backend"
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start MongoDB** (if local)
   ```bash
   mongod
   ```
   OR use MongoDB Atlas (cloud) - update `.env` file

4. **Start Backend Server**
   ```bash
   npm run dev
   ```
   
   ✅ You should see:
   ```
   Server running on http://localhost:5000
   MongoDB connected successfully
   ```

---

## PART 2: FRONTEND SETUP

### Just Open the Website!

1. **Navigate to project folder**
2. **Double-click `index.html`** OR
3. Use VS Code Live Server extension

The website will:
- Load in your browser
- Connect to the backend API automatically
- Show interactive maps with Google Maps
- Store/fetch data from MongoDB

---

## PART 3: TEST THE API

### Using Browser Console:

Open DevTools (F12) and paste:

```javascript
// Register a user
const user = await registerUser({
  name: 'Test User',
  email: 'test@example.com',
  password: 'password123',
  street: 'Test Street',
  skills: ['Cooking'],
  interests: ['Gardening']
});
console.log(user);

// Get all neighbors
const neighbors = await getAllNeighbors();
console.log(neighbors);

// Create a resource
const resource = await createResource({
  name: 'Ladder',
  description: 'Great condition',
  category: 'Tool',
  ownerName: 'Test User'
});
console.log(resource);
```

---

## File Structure:

```
student loan mamagement system/
├── index.html              (Frontend)
├── app.js                  (Frontend Logic)
├── style.css               (Frontend Styling)
├── api.js                  (API Client)
├── BACKEND_SETUP.md        (Detailed Setup)
│
└── backend/
    ├── server.js           (Main Server)
    ├── package.json        (Dependencies)
    ├── .env                (Configuration)
    ├── config/
    │   └── database.js
    ├── models/
    │   ├── User.js
    │   ├── Resource.js
    │   └── Event.js
    ├── controllers/
    │   ├── userController.js
    │   ├── resourceController.js
    │   └── eventController.js
    ├── routes/
    │   ├── userRoutes.js
    │   ├── resourceRoutes.js
    │   ├── eventRoutes.js
    │   └── neighborRoutes.js
    └── middleware/
        └── auth.js
```

---

## Main Features:

### 👥 Users & Authentication
- Register new account
- Login with email/password
- JWT token-based authentication
- Update profile

### 🗺️ Interactive Map
- View neighbors on map
- Filter by skills
- Switch map types (Road, Satellite, Terrain)
- Geolocate your position

### 👨‍👩‍👧‍👦 Neighbor Directory
- Search by name, skills, interests
- View neighbor profiles
- Contact neighbors
- Real-time filtering

### 📦 Resource Sharing
- Add tools, books, services
- Browse available resources
- Request resources
- Update availability

### 🎉 Community Events
- Create events
- View upcoming events
- RSVP to events
- See attendee count
- Update/delete events

---

## API Endpoints:

### Users:
- `POST /api/users/register` - Sign up
- `POST /api/users/login` - Sign in
- `GET /api/users` - All users
- `GET /api/users/:id` - User profile

### Neighbors:
- `GET /api/neighbors` - All neighbors
- `GET /api/neighbors/search?skill=X` - Search

### Resources:
- `POST /api/resources` - Create (auth)
- `GET /api/resources` - Get all
- `PUT /api/resources/:id` - Update (auth)
- `DELETE /api/resources/:id` - Delete (auth)

### Events:
- `POST /api/events` - Create (auth)
- `GET /api/events` - Get all
- `POST /api/events/:id/attend` - Join (auth)
- `POST /api/events/:id/leave` - Leave (auth)

---

## Troubleshooting:

### Backend won't connect?
```bash
# Kill existing process on port 5000
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Restart
npm run dev
```

### MongoDB error?
```bash
# Check MongoDB is running
mongod --version

# Or use MongoDB Atlas (cloud)
# Update MONGODB_URI in .env
```

### CORS errors?
- Make sure backend is running on port 5000
- Check CORS_ORIGIN in `.env`

### Token expired?
- Log out and log back in
- Token expires in 7 days by default

---

## Environment Variables (.env)

```env
PORT=5000                    # Backend port
NODE_ENV=development         # Environment
MONGODB_URI=mongodb://...   # Database URL
JWT_SECRET=your_secret_key  # Security key
JWT_EXPIRE=7d               # Token expiry
CORS_ORIGIN=http://localhost:3000  # Frontend URL
```

---

## Development Tips:

1. **Develop Backend:**
   ```bash
   cd backend
   npm run dev
   ```

2. **Test API Endpoints:**
   - Use Postman: https://www.postman.com/downloads/
   - Or use browser console with api.js

3. **View Database:**
   - MongoDB Compass: https://www.mongodb.com/products/compass
   - MongoDB Atlas Web UI

4. **Frontend Development:**
   - Use Live Server VS Code extension
   - Or open HTML directly in browser

---

## Production Deployment:

### Backend Deployment (Heroku, Railway, etc.)
```bash
# Update .env with production values
# Set secure JWT_SECRET
# Use MongoDB Atlas
# Deploy:
git push heroku main
```

### Frontend Deployment (Netlify, GitHub Pages, etc.)
1. Update API_BASE_URL in api.js to production URL
2. Deploy HTML files

---

## Next Steps:

- [ ] Test user registration
- [ ] Create sample neighbors
- [ ] Add resources
- [ ] Create events
- [ ] Test map filtering
- [ ] Deploy to production

---

## Support & Documentation:

- **API Docs:** See `backend/README.md`
- **Setup Details:** See `BACKEND_SETUP.md`
- **Issues?** Check troubleshooting section

---

## Commands Reference:

```bash
# Backend
cd backend
npm install          # Install dependencies
npm run dev         # Start with auto-reload
npm start           # Start production

# Database
mongod              # Start MongoDB
mongo               # Connect to MongoDB

# Frontend
# Just open index.html in browser
```

---

## Happy Building! 🚀

Your Neighbour Nurturing Index is now ready to connect your community!

Questions? Check the detailed guides or try the console commands above.

Let's build stronger neighborhoods together! 🏘️
