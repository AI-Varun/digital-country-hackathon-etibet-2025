import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Shield, Home, FileCheck, Award, Wallet, LogOut } from 'lucide-react';
import { logout } from '../store/slices/authSlice';
import type { RootState } from '../store';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  if (!isAuthenticated) return null;

  return (
    <nav className="glass-card sticky top-0 z-50 py-4 mb-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Shield className="w-8 h-8 text-primary" />
            <span className="text-xl font-bold text-gradient">e-Citizenship</span>
          </Link>

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
                  <span className="text-sm">{user?.wallet.slice(0, 6)}...{user?.wallet.slice(-4)}</span>
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
        </div>
      </div>
    </nav>
  );
};

export default Navbar;