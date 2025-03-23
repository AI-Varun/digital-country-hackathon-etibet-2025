import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Shield } from 'lucide-react';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import AdminDashboard from './components/admin/AdminDashboard';
import PassportIssuance from './components/PassportIssuance';
import ReputationSystem from './components/ReputationSystem';
import MFAVerification from './components/auth/MFAVerification';
import Login from './components/auth/Login';
import type { RootState } from './store';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, mfaVerified } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    } else if (!mfaVerified) {
      navigate('/mfa');
    }
  }, [isAuthenticated, mfaVerified, navigate]);

  return children;
};

function App() {
  const { isAuthenticated, user, mfaVerified } = useSelector((state: RootState) => state.auth);

  // Redirect to MFA verification if not verified
  if (isAuthenticated && !mfaVerified) {
    return <MFAVerification />;
  }

  return (
    <Router>
      <div className="min-h-screen bg-background text-foreground">
        {/* Background gradient */}
        <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-background to-background -z-10" />
        
        <Navbar />
        
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/" />} />
            <Route 
              path="/" 
              element={
                isAuthenticated ? (
                  user?.role === 'Admin' ? <AdminDashboard /> : <Dashboard />
                ) : (
                  <Navigate to="/login" />
                )
              } 
            />
            <Route 
              path="/passport" 
              element={
                isAuthenticated ? <PassportIssuance /> : <Navigate to="/login" />
              } 
            />
            <Route 
              path="/reputation" 
              element={
                isAuthenticated ? <ReputationSystem /> : <Navigate to="/login" />
              } 
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App