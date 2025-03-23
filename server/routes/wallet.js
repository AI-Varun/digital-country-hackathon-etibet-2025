// server/routes/wallet.js
const express = require('express');
const router = express.Router();
const { connectWallet, verifySignature } = require('../controllers/walletController');

router.post('/connect', connectWallet);
router.post('/verify', verifySignature);

module.exports = router;