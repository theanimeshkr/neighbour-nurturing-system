# Backend Setup Guide - Neighbour Nurturing Index

## Complete Installation & Setup Instructions

### System Requirements
- Node.js v14+ 
- MongoDB (local or MongoDB Atlas)
- npm or yarn
- Windows, Mac, or Linux

---

## Step 1: Clone/Navigate to Project

```bash
cd "c:\games\student loan mamagement system\backend"
```

---

## Step 2: Install Dependencies

```bash
npm install
```

This will download all required packages:
- **express** - Web framework
- **mongoose** - MongoDB ODM
- **bcryptjs** - Password hashing
- **jsonwebtoken** - JWT authentication
- **dotenv** - Environment variables
- **cors** - Cross-Origin Resource Sharing
- **express-validator** - Input validation
- **multer** - File uploads

---

## Step 3: Setup MongoDB

### Option A: Local MongoDB
1. Install MongoDB Community Edition from https://www.mongodb.com/try/download/community
2. Start MongoDB service:
   ```bash
   mongod
   ```

### Option B: MongoDB Atlas (Cloud)
1. Create free account at https://www.mongodb.com/cloud/atlas
2. Create a cluster
3. Get connection string
4. Update `.env` file:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname
   ```

---

## Step 4: Configure Environment Variables

The `.env` file is already created. Update if needed:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/neighbour-nurturing-index
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d
CORS_ORIGIN=http://localhost:3000
```

**Important:** 
- Change `JWT_SECRET` to a random string for production
- Update `MONGODB_URI` if using MongoDB Atlas

---

## Step 5: Start the Server

### Development (with auto-reload)
```bash
npm run dev
```

### Production
```bash
npm start
```

**Expected output:**
```
Server running on http://localhost:5000
MongoDB connected successfully
```

---

## Step 6: Test the Backend

### Using Postman/Insomnia

1. **Test Health Check:**
   - GET http://localhost:5000/api/health
   - Should return: `{"status": "Server is running"}`

2. **Register a User:**
   - POST http://localhost:5000/api/users/register
   - Body (JSON):
     ```json
     {
       "name": "John Doe",
       "email": "john@example.com",
       "password": "password123",
       "street": "Maple Street",
       "skills": ["Cooking"],
       "interests": ["Gardening"]
     }
     ```
   - Save the token from response

3. **Get All Neighbors:**
   - GET http://localhost:5000/api/neighbors
   - No auth needed

4. **Create Resource (Authenticated):**
   - POST http://localhost:5000/api/resources
   - Headers: `Authorization: Bearer <your-token>`
   - Body:
     ```json
     {
       "name": "Ladder",
       "description": "12ft ladder",
       "category": "Tool",
       "ownerName": "John Doe"
     }
     ```

---

## Step 7: Connect Frontend

The frontend is already configured to use the API!

1. Open `index.html` in a browser
2. The `api.js` file handles all API calls
3. The app will fetch data from `http://localhost:5000/api`

### Frontend API Usage Example:

```javascript
// Register user
const user = await registerUser({
  name: 'Sarah',
  email: 'sarah@example.com',
  password: 'pass123',
  street: 'Oak Avenue',
  skills: ['Gardening'],
  interests: ['Community']
});

// Get all neighbors
const neighbors = await getAllNeighbors();

// Create resource
const resource = await createResource({
  name: 'Drill',
  description: 'Power drill',
  category: 'Tool',
  ownerName: 'Sarah'
});

// Get all events
const events = await getAllEvents();
```

---

## Project Structure

```
backend/
├── config/
│   └── database.js          # MongoDB connection
├── controllers/
│   ├── userController.js    # User logic
│   ├── resourceController.js # Resource logic
│   └── eventController.js   # Event logic
├── middleware/
│   └── auth.js             # JWT authentication
├── models/
│   ├── User.js            # User schema
│   ├── Resource.js        # Resource schema
│   └── Event.js           # Event schema
├── routes/
│   ├── userRoutes.js      # User endpoints
│   ├── resourceRoutes.js  # Resource endpoints
│   ├── eventRoutes.js     # Event endpoints
│   └── neighborRoutes.js  # Neighbor endpoints
├── .env                   # Environment variables
├── server.js             # Main entry point
├── package.json          # Dependencies
└── README.md            # API documentation
```

---

## API Endpoints Summary

| Method | Endpoint | Auth Required |
|--------|----------|---------------|
| POST | /api/users/register | No |
| POST | /api/users/login | No |
| GET | /api/users | No |
| GET | /api/users/:id | No |
| GET | /api/users/profile/me | Yes |
| PUT | /api/users/:id | Yes |
| GET | /api/neighbors | No |
| GET | /api/neighbors/search | No |
| GET | /api/neighbors/:id | No |
| GET | /api/resources | No |
| POST | /api/resources | Yes |
| GET | /api/resources/:id | No |
| PUT | /api/resources/:id | Yes |
| DELETE | /api/resources/:id | Yes |
| GET | /api/events | No |
| POST | /api/events | Yes |
| GET | /api/events/:id | No |
| POST | /api/events/:id/attend | Yes |
| POST | /api/events/:id/leave | Yes |
| PUT | /api/events/:id | Yes |
| DELETE | /api/events/:id | Yes |

---

## Troubleshooting

### MongoDB Connection Error
- Make sure MongoDB is running
- Check `MONGODB_URI` in `.env`
- Try: `mongod --version` to verify installation

### Port Already in Use
- Change `PORT` in `.env`
- Or kill process using port 5000

### CORS Errors
- Update `CORS_ORIGIN` in `.env`
- Default is `http://localhost:3000`

### JWT Token Issues
- Make sure token is in header: `Authorization: Bearer <token>`
- Check token hasn't expired

### Dependencies Not Installing
- Clear cache: `npm cache clean --force`
- Delete node_modules: `rm -rf node_modules`
- Reinstall: `npm install`

---

## Development Workflow

1. **Terminal 1 - MongoDB:**
   ```bash
   mongod
   ```

2. **Terminal 2 - Backend Server:**
   ```bash
   cd backend
   npm run dev
   ```

3. **Terminal 3 - (Optional) Open frontend:**
   ```bash
   # Open index.html in browser
   # Or start a live server if using an editor
   ```

---

## Production Deployment

### Using Heroku:

1. Install Heroku CLI
2. Login: `heroku login`
3. Create app: `heroku create your-app-name`
4. Set environment variables: `heroku config:set JWT_SECRET=xxxxx`
5. Deploy: `git push heroku main`

### Using Docker:

Create `Dockerfile` in backend/:
```dockerfile
FROM node:16
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

Build and run:
```bash
docker build -t neighbour-api .
docker run -p 5000:5000 neighbours-api
```

---

## Next Steps

1. ✅ Backend setup complete
2. Update frontend to use live API data
3. Add authentication UI (login/register pages)
4. Add profile pages
5. Implement file uploads for images
6. Add email notifications
7. Deploy to production

---

## Support

For detailed API documentation, see `README.md` in the backend folder.

Happy coding! 🎉
