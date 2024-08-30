import React from 'react';
import { useAuth } from '../context/AuthContext';
import Ratelimitform from './Ratelimitform';
import Summarypage from './Summarypage';

const HomePage = () => {
    const { state } = useAuth();

    return (
        <div className="my-20 flex flex-col justify-center items-center">
            <div className="p-4">
                <h1 className="text-2xl font-bold">Home</h1>
                {state.user && <p>Welcome, {state.user.email.split('@')[0]}!</p>}
            </div>
            <Ratelimitform />
            <Summarypage />
        </div>
    );
};

export default HomePage;
