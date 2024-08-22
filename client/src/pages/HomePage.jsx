import React from 'react';
import { useAuth } from '../context/AuthContext';

const HomePage = () => {
    const { state } = useAuth();

    return (
        <div className="min-h-screen flex flex-col justify-center items-center">
            <div className="p-4">
                <h1 className="text-2xl font-bold">Home</h1>
                {state.user && <p>Welcome, {state.user.email.split('@')[0]}!</p>}
            </div>
        </div>
    );
};

export default HomePage;
