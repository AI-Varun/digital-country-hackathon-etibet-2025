const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { uploadPassport, getPassportDetails } = require('../controllers/passportController');
const multer = require('multer');

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

router.post('/upload', protect, upload.single('passport'), uploadPassport);
router.get('/details', protect, getPassportDetails);

module.exports = router;