import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Globe from '../globe/globe';
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
        <div className="mx-20 mt-36">
            <div className="flex flex-col">
                <div className="">
                    <h1 className="text-4xl font-bold mb-4">Welcome to Our App</h1>
                    <Link to="/login">
                        <button id="bg" className="text-white py-1 px-4 rounded-xl transition duration-300 ease-in-out hover:bg-blue-900 hover:text-white">
                            Sign In
                        </button>
                    </Link>
                    <Link to="/register">
                        <button id="bg" className="text-white py-1 px-4 rounded-xl transition duration-300 ease-in-out hover:bg-blue-900 hover:text-white">
                            Sign Up
                        </button>
                    </Link>
                </div>
                <div className="flex justify-center flex-end">
                    <h1><Globe />
                        Hello</h1>
                </div>

            </div>

        </div>
    );
};

export default LandingPage;