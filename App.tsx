
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { User, UserStatus, AuthState } from './types';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import TestPlatform from './pages/TestPlatform';
import Projects from './pages/Projects';
import Jobs from './pages/Jobs';
import ATSResume from './pages/ATSResume';
import AdminPanel from './pages/AdminPanel';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

// Mock initial data
const MOCK_USER: User = {
  id: 'u1',
  fullName: 'Alex Chen',
  email: 'alex.chen@example.com',
  education: 'B.S. Computer Science',
  skills: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'],
  experienceLevel: 'Mid',
  employabilityScore: 85,
  status: UserStatus.NORMAL,
  profilePhoto: 'https://picsum.photos/seed/alex/200'
};

const App: React.FC = () => {
  const [authState, setAuthState] = useState<AuthState>(() => {
    const stored = localStorage.getItem('skillmatch_auth');
    return stored ? JSON.parse(stored) : { user: null, isAuthenticated: false };
  });

  const login = (userData: User) => {
    const newState = { user: userData, isAuthenticated: true };
    setAuthState(newState);
    localStorage.setItem('skillmatch_auth', JSON.stringify(newState));
  };

  const logout = () => {
    setAuthState({ user: null, isAuthenticated: false });
    localStorage.removeItem('skillmatch_auth');
  };

  return (
    <HashRouter>
      <div className="min-h-screen bg-slate-950 text-white flex overflow-hidden">
        {authState.isAuthenticated && <Sidebar user={authState.user!} logout={logout} />}
        
        <div className="flex-1 flex flex-col min-w-0">
          {authState.isAuthenticated && <Navbar user={authState.user!} />}
          
          <main className="flex-1 overflow-y-auto p-4 md:p-8">
            <Routes>
              <Route 
                path="/" 
                element={!authState.isAuthenticated ? <Landing onLogin={login} /> : <Navigate to="/dashboard" />} 
              />
              <Route 
                path="/dashboard" 
                element={authState.isAuthenticated ? <Dashboard user={authState.user!} /> : <Navigate to="/" />} 
              />
              <Route 
                path="/profile" 
                element={authState.isAuthenticated ? <Profile user={authState.user!} onUpdate={login} /> : <Navigate to="/" />} 
              />
              <Route 
                path="/test" 
                element={authState.isAuthenticated ? <TestPlatform user={authState.user!} /> : <Navigate to="/" />} 
              />
              <Route 
                path="/projects" 
                element={authState.isAuthenticated ? <Projects user={authState.user!} /> : <Navigate to="/" />} 
              />
              <Route 
                path="/jobs" 
                element={authState.isAuthenticated ? <Jobs user={authState.user!} /> : <Navigate to="/" />} 
              />
              <Route 
                path="/ats" 
                element={authState.isAuthenticated ? <ATSResume user={authState.user!} /> : <Navigate to="/" />} 
              />
              <Route 
                path="/admin" 
                element={authState.isAuthenticated ? <AdminPanel /> : <Navigate to="/" />} 
              />
            </Routes>
          </main>
        </div>
      </div>
    </HashRouter>
  );
};

export default App;
