import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import AdminDashboard from './components/admin/AdminDashboard';
import PassportIssuance from './components/PassportIssuance';
import ReputationSystem from './components/ReputationSystem';
import MFAVerification from './components/auth/MFAVerification';
import Login from './components/auth/Login';
import type { RootState } from './store';

function App() {
  const { isAuthenticated, user, mfaVerified } = useSelector((state: RootState) => state.auth);

  return (
    <Router>
      <div className="min-h-screen bg-background text-foreground">
        {/* Background gradient */}
        <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-background to-background -z-10" />
        
        <Navbar />
        
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/" />} />
            <Route path="/mfa" element={
              isAuthenticated && !mfaVerified ? <MFAVerification /> : <Navigate to="/" />
            } />
            <Route path="/" element={
              isAuthenticated ? (
                mfaVerified ? (
                  user?.role === 'Admin' ? <AdminDashboard /> : <Dashboard />
                ) : <Navigate to="/mfa" />
              ) : <Navigate to="/login" />
            } />
            <Route path="/passport" element={
              isAuthenticated && mfaVerified ? <PassportIssuance /> : <Navigate to="/login" />
            } />
            <Route path="/reputation" element={
              isAuthenticated && mfaVerified ? <ReputationSystem /> : <Navigate to="/login" />
            } />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;