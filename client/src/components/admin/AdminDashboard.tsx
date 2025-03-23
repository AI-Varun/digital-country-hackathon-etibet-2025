import React from 'react';
import { motion } from 'framer-motion';
import { Users, FileCheck, AlertTriangle, Activity } from 'lucide-react';

const AdminDashboard = () => {
  const stats = [
    { icon: Users, label: 'Registered Citizens', value: '1,234' },
    { icon: FileCheck, label: 'Pending Verifications', value: '45' },
    { icon: AlertTriangle, label: 'Suspicious Activities', value: '3' },
    { icon: Activity, label: 'Daily Active Users', value: '892' },
  ];

  const pendingVerifications = [
    {
      id: '1',
      wallet: '0x1234...5678',
      type: 'Passport Issuance',
      status: 'pending',
      timestamp: '2024-03-10T14:30:00Z',
    },
    // Add more mock data
  ];

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <h1 className="text-4xl font-bold text-gradient">Admin Dashboard</h1>
        <p className="text-foreground/80 max-w-2xl mx-auto">
          Manage digital identities and monitor system activities
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
        className="glass-card rounded-xl p-8"
      >
        <h2 className="text-2xl font-bold mb-6">Pending Verifications</h2>
        <div className="space-y-4">
          {pendingVerifications.map((verification, index) => (
            <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-accent/50">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <FileCheck className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">{verification.type}</p>
                  <p className="text-sm text-foreground/60">Wallet: {verification.wallet}</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="glass-button">Approve</button>
                <button className="glass-button bg-red-500/20 hover:bg-red-500/30">
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="glass-card rounded-xl p-8"
      >
        <h2 className="text-2xl font-bold mb-6">Security Alerts</h2>
        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-red-500/20 border border-red-500/30">
            <div className="flex items-center space-x-4">
              <AlertTriangle className="w-6 h-6 text-red-400" />
              <div>
                <p className="font-medium">Multiple Failed Authentication Attempts</p>
                <p className="text-sm text-foreground/60">
                  3 failed attempts from wallet 0x9876...4321
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;