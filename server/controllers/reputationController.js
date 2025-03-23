const Reputation = require('../models/Reputation');
const mongoose = require('mongoose');

exports.getReputationStats = async (req, res) => {
  try {
    const stats = await Reputation.aggregate([
      { $match: { userId: mongoose.Types.ObjectId(req.user._id) } },
      {
        $project: {
          overallScore: 1,
          communityScore: '$categories.communityParticipation.score',
          verificationScore: '$categories.verificationAccuracy.score',
          growthScore: '$categories.growthRate.score',
          recentActivities: {
            $slice: [
              {
                $concatArrays: [
                  '$categories.communityParticipation.activities',
                  '$categories.verificationAccuracy.verifications',
                  '$categories.growthRate.milestones'
                ]
              },
              5
            ]
          }
        }
      }
    ]);

    res.json({
      success: true,
      data: stats[0] || {
        overallScore: 0,
        communityScore: 0,
        verificationScore: 0,
        growthScore: 0,
        recentActivities: []
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};