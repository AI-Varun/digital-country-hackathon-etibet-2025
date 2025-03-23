import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, Wallet, AlertCircle } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUser, setLoading, setError } from '../../store/slices/authSlice';
import api from '../../api/axios';
import { signMessage, getWeb3Provider, checkMetaMaskInstalled } from '../../utils/web3';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isConnecting, setIsConnecting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [hasMetaMask, setHasMetaMask] = useState(false);

  useEffect(() => {
    const checkMetaMask = () => {
      const isInstalled = checkMetaMaskInstalled();
      console.log('MetaMask installed:', isInstalled);
      console.log('Window ethereum:', window.ethereum);
      setHasMetaMask(isInstalled);
    };
    
    // Initial check
    checkMetaMask();

    // Listen for changes
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', checkMetaMask);
    }

    return () => {
      if (window.ethereum?.removeListener) {
        window.ethereum.removeListener('accountsChanged', checkMetaMask);
      }
    };
  }, []);

  const connectWallet = async () => {
    if (!hasMetaMask) {
      setErrorMessage('Please install MetaMask to continue');
      return;
    }

    setIsConnecting(true);
    setErrorMessage('');
    dispatch(setLoading(true));

    try {
      console.log('Connecting wallet...');
      const provider = await getWeb3Provider();
      const accounts = await provider.send("eth_requestAccounts", []);
      const address = accounts[0];
      console.log('Got wallet address:', address);

      // Get nonce from backend
      console.log('Getting nonce...');
      const { data: connectData } = await api.post('/api/wallet/connect', { address });
      console.log('Got nonce response:', connectData);
      
      if (connectData.success) {
        // Sign message with nonce
        const message = `Login with nonce: ${connectData.nonce}`;
        console.log('Signing message:', message);
        const signature = await signMessage(message);
        console.log('Got signature:', signature);
        
        // Verify signature
        console.log('Verifying signature...');
        const { data: verifyData } = await api.post('/api/wallet/verify', { 
          address,
          signature 
        });
        console.log('Verify response:', verifyData);
        
        if (verifyData.success) {
          localStorage.setItem('token', verifyData.token);
          dispatch(setUser({ address }));
          navigate('/mfa'); // Navigate to MFA page instead of dashboard
        }
      }
    } catch (error) {
      console.error('Wallet connection error:', error);
      const message = error instanceof Error ? error.message : 'Failed to connect wallet';
      setErrorMessage(message);
      dispatch(setError(message));
    } finally {
      setIsConnecting(false);
      dispatch(setLoading(false));
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md mx-auto mt-20 glass-card rounded-xl p-8 space-y-6"
    >
      <div className="text-center space-y-4">
        <Shield className="w-16 h-16 text-primary mx-auto" />
        <h1 className="text-3xl font-bold text-gradient">Welcome to e-Citizenship</h1>
        <p className="text-foreground/80">
          Connect your wallet to access your digital identity
        </p>
      </div>

      {errorMessage && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          <span className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4" />
            {errorMessage}
          </span>
          {!hasMetaMask && (
            <a
              href="https://metamask.io/download/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline mt-2 block"
            >
              Install MetaMask
            </a>
          )}
        </div>
      )}

      <button
        onClick={connectWallet}
        disabled={isConnecting}
        className={`glass-button w-full flex items-center justify-center space-x-2 py-3 ${
          !hasMetaMask ? 'opacity-50' : 'hover:bg-primary/90'
        }`}
      >
        <Wallet className="w-5 h-5" />
        <span>
          {isConnecting 
            ? 'Connecting...' 
            : !hasMetaMask 
              ? 'Install MetaMask' 
              : 'Connect Wallet'
          }
        </span>
      </button>

      <p className="text-sm text-center text-foreground/60">
        By connecting your wallet, you agree to our Terms of Service and Privacy Policy
      </p>
    </motion.div>
  );
};

export default Login;