import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import './nav.css';

const PublicNav = () => {
    return (
        <nav className="p-4 text-white flex justify-between" style={{ position: 'relative', zIndex: 10 }}>
            <div className="flex items-center">
                <img src={logo} alt="logo" className="h-14" />
                <Link to="/" className="mx-6">Home</Link>
            </div>
            <div className="flex items-center gap-4">
                <button id="bg4" className="text-white py-1 px-4 rounded-full transition duration-300 ease-in-out hover:bg-blue-900 hover:text-white">
                    <Link to="/login">Sign In</Link>
                </button>
                <button id="bg4" className="text-white py-1 px-4 rounded-full transition duration-300 ease-in-out hover:bg-blue-900 hover:text-white">
                    <Link to="/register">Sign Up</Link>
                </button>
            </div>
        </nav>
    );
};

export default PublicNav;