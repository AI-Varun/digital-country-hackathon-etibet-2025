// server/models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  walletAddress: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  email: {
    type: String,
    required: false,
    unique: true,
    sparse: true
  },
  nonce: {
    type: String,
    required: true
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  verificationCode: String,
  verificationCodeExpires: Date
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);