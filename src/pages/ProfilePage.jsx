import React from 'react';
import { useAuth } from '../context/AuthContext';

const ProfilePage = () => {
    const { state } = useAuth();

    if (state.loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold">Profile</h1>
            {state.user ? (
                <div>
                    <p>Email: {state.user.email}</p>
                    <p>UID: {state.user.uid}</p>
                </div>
            ) : (
                <p>No user is logged in</p>
            )}
        </div>
    );
};

export default ProfilePage;
