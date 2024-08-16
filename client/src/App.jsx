import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import PublicNav from './components/publicnav';
import { AuthProvider, useAuth } from './context/AuthContext';
import HomePage from './pages/HomePage';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import RegisterPage from './pages/RegisterPage';
import SavePage from './pages/SavePage';

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
  const { state } = useAuth(); // Ensure this is called inside a component that's wrapped by AuthProvider

  return (
    <>
      {state.user ? <NavBar /> : <PublicNav />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/save" element={<SavePage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </>
  );
}

export default App;
