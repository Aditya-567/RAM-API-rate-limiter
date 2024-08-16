import React from 'react';
import { useAuth } from '../context/AuthContext';

const HomePage = () => {
    const { state } = useAuth();

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold">Home</h1>
            {state.user && <p>Welcome, {state.user.email}!</p>}
        </div>
    );
};

export default HomePage;
