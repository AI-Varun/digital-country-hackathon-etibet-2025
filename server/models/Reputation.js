const mongoose = require('mongoose');

const reputationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  overallScore: {
    type: Number,
    default: 0
  },
  categories: {
    communityParticipation: {
      score: { type: Number, default: 0 },
      activities: [{
        type: { type: String },
        description: String,
        points: Number,
        date: Date
      }]
    },
    verificationAccuracy: {
      score: { type: Number, default: 0 },
      verifications: [{
        passportId: { type: mongoose.Schema.Types.ObjectId, ref: 'Passport' },
        accuracy: Number,
        date: Date
      }]
    },
    growthRate: {
      score: { type: Number, default: 0 },
      milestones: [{
        description: String,
        points: Number,
        date: Date
      }]
    }
  }
}, { timestamps: true });

module.exports = mongoose.model('Reputation', reputationSchema);