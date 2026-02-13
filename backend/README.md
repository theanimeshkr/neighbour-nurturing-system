# Neighbour Nurturing Index - Backend API

A complete RESTful API for the Neighbour Nurturing Index community platform built with Node.js, Express, and MongoDB.

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

## Installation

1. **Install dependencies:**
   ```bash
   cd backend
   npm install
   ```

2. **Create .env file** (already created)
   ```
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/neighbour-nurturing-index
   JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
   JWT_EXPIRE=7d
   CORS_ORIGIN=http://localhost:3000
   ```

3. **Start MongoDB** (if using local):
   ```bash
   mongod
   ```

4. **Start the server:**
   ```bash
   # Development with auto-reload
   npm run dev
   
   # Production
   npm start
   ```

The server will run on `http://localhost:5000`

## API Endpoints

### Authentication & Users

#### Register
- **POST** `/api/users/register`
- **Body:**
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "street": "Maple Street",
    "skills": ["Cooking", "Gardening"],
    "interests": ["Community events", "Potlucks"],
    "latitude": 40.7128,
    "longitude": -74.0060
  }
  ```
- **Response:** Token + User data

#### Login
- **POST** `/api/users/login`
- **Body:**
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Response:** Token + User data

#### Get Current User
- **GET** `/api/users/profile/me`
- **Header:** `Authorization: Bearer <token>`
- **Response:** User data

#### Get All Users
- **GET** `/api/users`
- **Response:** Array of all users

#### Get User by ID
- **GET** `/api/users/:id`
- **Response:** User data

#### Update Profile
- **PUT** `/api/users/:id`
- **Header:** `Authorization: Bearer <token>`
- **Body:** User fields to update
- **Response:** Updated user data

### Neighbors

#### Get All Neighbors
- **GET** `/api/neighbors`
- **Response:** Array of neighbors with location data

#### Search Neighbors
- **GET** `/api/neighbors/search?skill=Cooking&interest=Gardening`
- **Response:** Filtered neighbors

#### Get Neighbor Details
- **GET** `/api/neighbors/:id`
- **Response:** Neighbor data

### Resources

#### Create Resource
- **POST** `/api/resources`
- **Header:** `Authorization: Bearer <token>`
- **Body:**
  ```json
  {
    "name": "Ladder",
    "description": "12ft aluminum ladder, great condition",
    "category": "Tool",
    "ownerName": "John Doe"
  }
  ```
- **Response:** Created resource

#### Get All Resources
- **GET** `/api/resources`
- **Response:** Array of all resources

#### Get Resource Details
- **GET** `/api/resources/:id`
- **Response:** Resource data with owner info

#### Update Resource
- **PUT** `/api/resources/:id`
- **Header:** `Authorization: Bearer <token>`
- **Body:** Fields to update
- **Response:** Updated resource

#### Delete Resource
- **DELETE** `/api/resources/:id`
- **Header:** `Authorization: Bearer <token>`
- **Response:** Success message

### Events

#### Create Event
- **POST** `/api/events`
- **Header:** `Authorization: Bearer <token>`
- **Body:**
  ```json
  {
    "name": "Community Cleanup",
    "description": "Let's clean up our neighborhood!",
    "date": "2026-02-28T10:00:00Z",
    "location": "Central Park",
    "category": "Cleanup",
    "organizerName": "John Doe"
  }
  ```
- **Response:** Created event

#### Get All Events
- **GET** `/api/events`
- **Response:** Array of all events

#### Get Event Details
- **GET** `/api/events/:id`
- **Response:** Event data with organizer and attendees

#### Join Event
- **POST** `/api/events/:id/attend`
- **Header:** `Authorization: Bearer <token>`
- **Response:** Updated event with attendee count

#### Leave Event
- **POST** `/api/events/:id/leave`
- **Header:** `Authorization: Bearer <token>`
- **Response:** Updated event with attendee count

#### Update Event
- **PUT** `/api/events/:id`
- **Header:** `Authorization: Bearer <token>`
- **Body:** Fields to update
- **Response:** Updated event

#### Delete Event
- **DELETE** `/api/events/:id`
- **Header:** `Authorization: Bearer <token>`
- **Response:** Success message

## Database Models

### User Model
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  street: String,
  skills: [String],
  interests: [String],
  latitude: Number,
  longitude: Number,
  profileImage: String,
  bio: String,
  createdAt: Date
}
```

### Resource Model
```javascript
{
  name: String,
  description: String,
  owner: ObjectId (ref: User),
  ownerName: String,
  category: String (Tool, Book, Service, Other),
  availability: String (Available, In Use, Unavailable),
  imageUrl: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Event Model
```javascript
{
  name: String,
  description: String,
  date: Date,
  location: String,
  latitude: Number,
  longitude: Number,
  organizer: ObjectId (ref: User),
  organizerName: String,
  attendees: [ObjectId] (ref: User),
  attendeeCount: Number,
  category: String (Social, Workshop, Cleanup, Sports, Other),
  imageUrl: String,
  createdAt: Date
}
```

## Error Handling

All endpoints return responses in this format:

**Success:**
```json
{
  "success": true,
  "data": {...}
}
```

**Error:**
```json
{
  "success": false,
  "message": "Error description"
}
```

## Security

- Passwords are hashed using bcryptjs
- JWT tokens for authentication
- Protected routes require valid token
- CORS enabled for frontend communication
- Environment variables for sensitive data

## Deployment

For production deployment:

1. Change JWT_SECRET to a strong, random value
2. Use MongoDB Atlas instead of local database
3. Set NODE_ENV to 'production'
4. Use a process manager like PM2
5. Set appropriate CORS_ORIGIN for your domain

## Development Tips

- Use Postman or Insomnia to test API endpoints
- Check MongoDB data with MongoDB Compass
- Use `npm run dev` for development with auto-reload
- Check server logs for debugging

## License

MIT
