const Passport = require('../models/Passport');
const PassportScanner = require('../services/passportScanner');
const { uploadToStorage } = require('../utils/storage');

exports.uploadPassport = async (req, res) => {
  try {
    const { file } = req;
    if (!file) {
      return res.status(400).json({
        success: false,
        error: 'No passport image provided'
      });
    }

    // Scan passport
    const scanData = await PassportScanner.scanPassport(file.buffer);

    // Upload image to storage
    const imageUrl = await uploadToStorage(file.buffer);

    // Create passport record
    const passport = await Passport.create({
      userId: req.user._id,
      passportNumber: scanData.documentNumber,
      fullName: `${scanData.firstName} ${scanData.lastName}`,
      dateOfBirth: scanData.dateOfBirth,
      nationality: scanData.nationality,
      gender: scanData.gender,
      expiryDate: scanData.expiryDate,
      scanData: {
        mrz: scanData.mrz,
        documentImage: imageUrl
      }
    });

    res.status(201).json({
      success: true,
      data: passport
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

exports.getPassportDetails = async (req, res) => {
  try {
    const passport = await Passport.findOne({
      userId: req.user._id
    }).populate('verifiedBy', 'walletAddress');

    if (!passport) {
      return res.status(404).json({
        success: false,
        error: 'Passport not found'
      });
    }

    res.json({
      success: true,
      data: passport
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};