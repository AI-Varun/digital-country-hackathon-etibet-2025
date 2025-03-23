import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Shield, Home, FileCheck, Award, Wallet, LogOut } from 'lucide-react';
import { logout } from '../store/slices/authSlice';
import type { RootState } from '../store';

interface User {
  walletAddress?: string;
  // Add other user properties as needed
}

const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const shortenAddress = (address?: string) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  if (!isAuthenticated) return null;

  return (
    <nav className="bg-primary/10 backdrop-blur-sm border-b border-primary/10 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold">
              Identity Hasher
            </Link>
          </div>
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <span className="text-sm text-foreground/80">
                  {shortenAddress(user.walletAddress)}
                </span>
                <div className="flex items-center space-x-8">
                  <Link 
                    to="/" 
                    className={`flex items-center space-x-2 hover:text-primary transition-colors ${
                      location.pathname === '/' ? 'text-primary' : 'text-foreground/80'
                    }`}
                  >
                    <Home className="w-5 h-5" />
                    <span>Dashboard</span>
                  </Link>

                  <Link 
                    to="/passport" 
                    className={`flex items-center space-x-2 hover:text-primary transition-colors ${
                      location.pathname === '/passport' ? 'text-primary' : 'text-foreground/80'
                    }`}
                  >
                    <FileCheck className="w-5 h-5" />
                    <span>Passport</span>
                  </Link>

                  <Link 
                    to="/reputation" 
                    className={`flex items-center space-x-2 hover:text-primary transition-colors ${
                      location.pathname === '/reputation' ? 'text-primary' : 'text-foreground/80'
                    }`}
                  >
                    <Award className="w-5 h-5" />
                    <span>Reputation</span>
                  </Link>

                  <div className="flex items-center space-x-4">
                    <div className="glass-card px-4 py-2 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Wallet className="w-4 h-4 text-primary" />
                        <span className="text-sm">{user?.walletAddress?.slice(0, 6)}...{user?.walletAddress?.slice(-4)}</span>
                      </div>
                    </div>
                    
                    <button
                      onClick={handleLogout}
                      className="glass-button flex items-center space-x-2"
                    >
                      <LogOut className="w-5 h-5" />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <Link 
                to="/login" 
                className="px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Connect Wallet
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;