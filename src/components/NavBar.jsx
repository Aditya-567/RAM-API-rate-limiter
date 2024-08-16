import { signOut } from 'firebase/auth';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { auth } from '../firebase'; // Ensure you import auth from your firebase config

const NavBar = () => {
    const navigate = useNavigate();
    const { state, dispatch } = useAuth();

    const handleLogout = async () => {
        try {
            await signOut(auth);
            dispatch({ type: 'LOGOUT' });
            navigate('/');
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    return (
        <nav className=" p-4 text-white flex justify-between">
            <div>
                <Link to="/home" className="mr-4">Home</Link>
                <Link to="/save" className="mr-4">Save Notes</Link>
                <Link to="/profile" className="mr-4">Profile</Link>
                <button onClick={handleLogout} className="bg-red-500 p-2 rounded">Logout</button>
            </div>
        </nav>
    );
};

export default NavBar;
