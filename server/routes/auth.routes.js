const express = require('express');
const { register, login, getMe, updateRole } = require('../controllers/auth.controller');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected routes
router.get('/me', protect, getMe);
router.put('/role', protect, updateRole);

module.exports = router;
