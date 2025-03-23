import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Award, FileCheck, Users } from 'lucide-react';

const Dashboard = () => {
  const stats = [
    { icon: Shield, label: 'Identity Score', value: '95%' },
    { icon: Award, label: 'Reputation', value: '4.8/5' },
    { icon: FileCheck, label: 'Verifications', value: '12' },
    { icon: Users, label: 'Community Trust', value: 'High' },
  ];

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <h1 className="text-4xl font-bold text-gradient">Digital Identity Dashboard</h1>
        <p className="text-foreground/80 max-w-2xl mx-auto">
          Manage your blockchain-based digital identity, track your reputation, and engage with the Tibetan diaspora community.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-card card-3d rounded-xl p-6"
          >
            <div className="flex flex-col items-center space-y-4">
              <stat.icon className="w-8 h-8 text-primary" />
              <div className="text-center">
                <p className="text-sm text-foreground/80">{stat.label}</p>
                <p className="text-2xl font-bold text-primary">{stat.value}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass-card rounded-xl p-8 space-y-6"
      >
        <h2 className="text-2xl font-bold">Recent Activity</h2>
        <div className="space-y-4">
          {[1, 2, 3].map((_, index) => (
            <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-accent/50">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Identity Verification</p>
                  <p className="text-sm text-foreground/60">Completed successfully</p>
                </div>
              </div>
              <span className="text-sm text-foreground/60">2 hours ago</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;