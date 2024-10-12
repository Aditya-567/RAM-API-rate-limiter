import Spline from '@splinetool/react-spline';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import '../components/nav.css';
import { useAuth } from '../context/AuthContext'; // Adjust if necessary
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
        <div className="my-4">
            {/* 3D Scene */}
            <div className="w-full h-screen">
                <Spline scene="https://prod.spline.design/iX9N0wIBST9tjjRm/scene.splinecode" />
            </div>

        </div>
    );
};

export default LandingPage;
