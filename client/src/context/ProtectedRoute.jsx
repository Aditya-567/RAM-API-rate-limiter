import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';



const ProtectedRoute = ({ children }) => {
    const { state } = useAuth();

    if (state.loading) {

        return <div>Loading...</div >  // Show a loading indicator while authentication state is being checked
    }

    if (!state.user) {
        return <Navigate to="/" />; // Redirect to landing page if the user is not logged in
    }

    return children; // Render the protected component if the user is logged in
};

export default ProtectedRoute;
