import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Mail } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setMfaVerified } from '../../store/slices/authSlice';
import api from '../../api/axios';

const MFAVerification = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);

  const handleSendEmail = async () => {
    try {
      const { data } = await api.post('/api/auth/send-verification', {
        address: user?.address,
        email
      });
      
      if (data.success) {
        setEmailSent(true);
        setError('');
      }
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to send verification code');
    }
  };

  const handleVerify = async () => {
    try {
      const { data } = await api.post('/api/auth/verify-code', {
        address: user?.address,
        code: otp
      });
      
      if (data.success) {
        dispatch(setMfaVerified(true));
        navigate('/dashboard');
      }
    } catch (error) {
      setError('Invalid verification code');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md mx-auto mt-20 glass-card rounded-xl p-8 space-y-6"
    >
      <div className="text-center space-y-4">
        <Shield className="w-12 h-12 text-primary mx-auto" />
        <h2 className="text-2xl font-bold">Two-Factor Authentication</h2>
        <p className="text-foreground/60">
          Please verify your email to continue
        </p>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {!emailSent ? (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 rounded-lg bg-accent/50 border border-border/50"
              placeholder="Enter your email"
            />
          </div>
          <button
            onClick={handleSendEmail}
            disabled={!email}
            className="glass-button w-full flex items-center justify-center space-x-2"
          >
            <Mail className="w-5 h-5" />
            <span>Send Verification Code</span>
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium">Enter OTP Code</label>
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderInput={(props) => (
                <input
                  {...props}
                  className="w-10 h-12 text-center bg-accent/50 border border-border/50 rounded-lg mx-1"
                />
              )}
            />
          </div>
          <button
            onClick={handleVerify}
            className="glass-button w-full"
            disabled={otp.length !== 6}
          >
            Verify
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default MFAVerification;