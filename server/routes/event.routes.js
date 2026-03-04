const express = require('express');
const { 
  createEvent, 
  getEvents, 
  getEvent, 
  updateEvent, 
  deleteEvent,
  getMyEvents
} = require('../controllers/event.controller');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// Protected routes
router.post('/', protect, authorize('organizer'), createEvent);
router.get('/user/my-events', protect, getMyEvents);

// Public routes
router.get('/', getEvents);

// Routes with parameters - these must come last
router.get('/:id', getEvent);
router.put('/:id', protect, authorize('organizer'), updateEvent);
router.delete('/:id', protect, authorize('organizer'), deleteEvent);

module.exports = router;
