import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import './nav.css';

const PublicNav = () => {
    return (
        <nav className="p-4 text-white flex justify-between fixed top-0 left-0 w-full z-50 bg-darkBlue">
            <div className="flex items-center">
                <img src={logo} alt="logo" className="h-14" />
                <Link to="/" className="mx-6">Home</Link>
            </div>
            <div className="flex items-center gap-4">
                <Link to="/login">
                    <button id="bg4" className="text-white py-1 px-4 rounded-full transition duration-300 ease-in-out hover:bg-blue-900 hover:text-white">
                        Sign In
                    </button>
                </Link>
                <Link to="/register">
                    <button id="bg4" className="text-white py-1 px-4 rounded-full transition duration-300 ease-in-out hover:bg-blue-900 hover:text-white">
                        Sign Up
                    </button>
                </Link>
            </div>
        </nav>
    );
};

export default PublicNav;
