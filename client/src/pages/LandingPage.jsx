import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './LandingPage.css';

const LandingPage = () => {
    const { state } = useAuth();
    const navigate = useNavigate();

    // Redirect authenticated users to /home
    useEffect(() => {
        if (state.user) {
            navigate('/home');
        }
    }, [state.user, navigate]);

    return (
        <div className="landing-page">
            <div className="text-center">
                <h1 className="text-4xl font-bold mb-4">Welcome to Our App</h1>
                <p className="mb-8">Login or Register to continue.</p>
            </div>
            <div className="p-8 bg-darkBlue text-white">
                <h1 className="text-2xl font-bold">Features</h1>
                <p>Our app offers a wide range of features...</p>
                <h1 className="text-2xl font-bold mt-8">About</h1>
                <p>Learn more about our app...</p>
            </div>
        </div>
    );
};

export default LandingPage;
