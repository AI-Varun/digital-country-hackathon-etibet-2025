// server/routes/auth.js
const express = require('express');
const router = express.Router();
const { register, login, logout, getMe, sendVerificationCode, verifyCode } = require('../controllers/authController');
const { protect } = require('../middleware/auth');

router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);
router.get('/me', protect, getMe);
router.post('/send-verification', sendVerificationCode);
router.post('/verify-code', verifyCode);

module.exports = router;