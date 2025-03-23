// server/controllers/authController.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { sendVerificationEmail } = require('../utils/email');

exports.register = async (req, res) => {
  try {
    const { walletAddress } = req.body;
    const user = await User.create({ walletAddress });
    sendTokenResponse(user, 201, res);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { walletAddress, signature } = req.body;
    
    const user = await User.findOne({ walletAddress });
    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }

    // Verify signature logic here
    sendTokenResponse(user, 200, res);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

exports.logout = (req, res) => {
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true
  });

  res.status(200).json({
    success: true,
    data: {}
  });
};

exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

exports.sendVerificationCode = async (req, res) => {
  try {
    const { address, email } = req.body;
    const user = await User.findOne({ walletAddress: address });
    
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    if (email && (!user.email || user.email !== email)) {
      user.email = email;
    }

    if (!user.email) {
      return res.status(400).json({
        success: false,
        error: 'Email address is required'
      });
    }

    // Generate verification code
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    user.verificationCode = verificationCode;
    user.verificationCodeExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
    await user.save();

    try {
      await sendVerificationEmail(user.email, verificationCode);
      res.json({
        success: true,
        message: 'Verification code sent to email'
      });
    } catch (emailError) {
      console.error('Failed to send email:', emailError);
      res.status(500).json({
        success: false,
        error: 'Failed to send verification email'
      });
    }
  } catch (error) {
    console.error('Email verification error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

exports.verifyCode = async (req, res) => {
  try {
    const { address, code } = req.body;
    const user = await User.findOne({ 
      walletAddress: address,
      verificationCode: code,
      verificationCodeExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        error: 'Invalid or expired verification code'
      });
    }

    // Clear verification code
    user.verificationCode = undefined;
    user.verificationCodeExpires = undefined;
    user.isVerified = true;
    await user.save();

    res.json({
      success: true,
      message: 'Email verified successfully'
    });
  } catch (error) {
    console.error('Code verification error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

const sendTokenResponse = (user, statusCode, res) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });

  res.status(statusCode).json({
    success: true,
    token
  });
};