import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import PublicNav from './components/publicnav';
import { AuthProvider, useAuth } from './context/AuthContext';
import ProtectedRoute from './context/ProtectedRoute';
import HomePage from './pages/HomePage';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import RegisterPage from './pages/RegisterPage';
import SavePage from './pages/SavePage';
import Test from './pages/Test';

function App() {
  return (
    <AuthProvider>
      <div className="bg-darkBlue text-white min-h-screen">
        <Router>
          <MainContent />
        </Router>
      </div>
    </AuthProvider>
  );
}

const MainContent = () => {
  const { state } = useAuth();

  return (
    <>
      {state.user ? <NavBar /> : <PublicNav />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/home" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
        <Route path="/save" element={<ProtectedRoute><SavePage /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
        <Route path="/test" element={<ProtectedRoute><Test /></ProtectedRoute>} />
      </Routes>
    </>
  );
}

export default App;
