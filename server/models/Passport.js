const mongoose = require('mongoose');

const passportSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  passportNumber: {
    type: String,
    required: true,
    unique: true
  },
  fullName: String,
  dateOfBirth: Date,
  placeOfBirth: String,
  nationality: String,
  gender: String,
  issueDate: Date,
  expiryDate: Date,
  issuingAuthority: String,
  documentType: {
    type: String,
    default: 'Passport'
  },
  scanData: {
    mrz: String, // Machine Readable Zone
    documentImage: String, // Base64 or URL
    faceImage: String
  },
  verificationStatus: {
    type: String,
    enum: ['pending', 'verified', 'rejected'],
    default: 'pending'
  },
  verifiedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  verificationDate: Date,
  notes: String
}, { timestamps: true });

module.exports = mongoose.model('Passport', passportSchema);