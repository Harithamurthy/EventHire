const express = require('express');
const { 
  createApplication, 
  getApplications, 
  getEventApplications, 
  getMyApplications,
  updateApplicationStatus
} = require('../controllers/application.controller');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// All routes are protected
router.use(protect);

// Provider routes
router.post('/', authorize('provider'), createApplication);
router.get('/my-applications', getMyApplications);

// Organizer routes
router.get('/event/:eventId', authorize('organizer'), getEventApplications);
router.put('/:id', authorize('organizer'), updateApplicationStatus);

// Admin routes (for future use)
router.get('/', getApplications);

module.exports = router;
