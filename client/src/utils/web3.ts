import { ethers } from 'ethers';

export const checkMetaMaskInstalled = () => {
  // More thorough check for MetaMask
  if (typeof window === 'undefined') return false;
  
  const { ethereum } = window;
  return Boolean(
    ethereum && 
    ethereum.isMetaMask && 
    typeof ethereum.request === 'function'
  );
};

export const getWeb3Provider = async () => {
  if (!window.ethereum) {
    throw new Error('MetaMask is not installed');
  }

  try {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    return new ethers.BrowserProvider(window.ethereum);
  } catch (error) {
    console.error('Failed to get web3 provider:', error);
    throw error;
  }
};

export const signMessage = async (message: string) => {
  const provider = await getWeb3Provider();
  const signer = await provider.getSigner();
  return await signer.signMessage(message);
};