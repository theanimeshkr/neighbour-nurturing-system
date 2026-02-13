const express = require('express');
const { createEvent, getAllEvents, getEvent, attendEvent, leaveEvent, updateEvent, deleteEvent } = require('../controllers/eventController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Public routes
router.get('/', getAllEvents);
router.get('/:id', getEvent);

// Private routes
router.post('/', protect, createEvent);
router.post('/:id/attend', protect, attendEvent);
router.post('/:id/leave', protect, leaveEvent);
router.put('/:id', protect, updateEvent);
router.delete('/:id', protect, deleteEvent);

module.exports = router;
