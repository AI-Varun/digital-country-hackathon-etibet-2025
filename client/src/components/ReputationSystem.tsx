import React from 'react';
import { motion } from 'framer-motion';
import { Award, TrendingUp, Users, Star } from 'lucide-react';

const ReputationSystem = () => {
  const reputationScore = 85;
  const activities = [
    { icon: Users, label: 'Community Participation', score: 92 },
    { icon: Star, label: 'Verification Accuracy', score: 88 },
    { icon: TrendingUp, label: 'Growth Rate', score: 75 },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <h1 className="text-4xl font-bold text-gradient">Reputation System</h1>
        <p className="text-foreground/80">
          Track your reputation score and community trust level in the e-Citizenship network.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-card rounded-xl p-8 text-center"
      >
        <div className="relative w-48 h-48 mx-auto">
          <div className="absolute inset-0 flex items-center justify-center">
            <Award className="w-16 h-16 text-primary" />
          </div>
          <svg className="transform -rotate-90 w-48 h-48">
            <circle
              cx="96"
              cy="96"
              r="88"
              className="stroke-accent"
              strokeWidth="12"
              fill="none"
            />
            <circle
              cx="96"
              cy="96"
              r="88"
              className="stroke-primary"
              strokeWidth="12"
              fill="none"
              strokeDasharray={553}
              strokeDashoffset={553 - (553 * reputationScore) / 100}
            />
          </svg>
        </div>
        <div className="mt-6">
          <h2 className="text-3xl font-bold">{reputationScore}</h2>
          <p className="text-foreground/60">Overall Reputation Score</p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {activities.map((activity, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            className="glass-card card-3d rounded-xl p-6"
          >
            <div className="flex flex-col items-center space-y-4">
              <activity.icon className="w-8 h-8 text-primary" />
              <div className="text-center">
                <p className="font-medium">{activity.label}</p>
                <p className="text-2xl font-bold text-primary">{activity.score}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="glass-card rounded-xl p-8"
      >
        <h2 className="text-2xl font-bold mb-6">Recent Verifications</h2>
        <div className="space-y-4">
          {[1, 2, 3].map((_, index) => (
            <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-accent/50">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Identity Verification #{index + 1}</p>
                  <p className="text-sm text-foreground/60">Verified by 5 community members</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-primary" fill="currentColor" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default ReputationSystem;