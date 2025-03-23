// server/controllers/walletController.js
const User = require('../models/User');
const crypto = require('crypto');
const ethers = require('ethers');
const jwt = require('jsonwebtoken');

exports.connectWallet = async (req, res) => {
  try {
    const { address } = req.body;
    console.log('Connecting wallet:', address);
    
    let user = await User.findOne({ walletAddress: address });
    
    if (!user) {
      const nonce = crypto.randomBytes(32).toString('hex');
      user = await User.create({
        walletAddress: address,
        nonce
      });
    }

    res.json({ 
      success: true, 
      nonce: user.nonce 
    });
  } catch (error) {
    console.error('Wallet connection error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

exports.verifySignature = async (req, res) => {
  try {
    const { address, signature } = req.body;
    
    const user = await User.findOne({ walletAddress: address });
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    const message = `Login with nonce: ${user.nonce}`;
    const recoveredAddress = ethers.verifyMessage(message, signature);

    if (recoveredAddress.toLowerCase() !== address.toLowerCase()) {
      return res.status(401).json({
        success: false,
        error: 'Invalid signature'
      });
    }

    // Update nonce
    user.nonce = crypto.randomBytes(32).toString('hex');
    user.isVerified = true;
    await user.save();

    // Create and send token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '30d'
    });

    res.json({
      success: true,
      token
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};