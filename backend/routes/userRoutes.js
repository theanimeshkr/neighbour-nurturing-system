const express = require('express');
const { register, login, getMe, getUser, getAllUsers, updateUser } = require('../controllers/userController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);
router.get('/', getAllUsers);
router.get('/:id', getUser);

// Private routes
router.get('/profile/me', protect, getMe);
router.put('/:id', protect, updateUser);

module.exports = router;
