import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

const PublicNav = () => {
    return (
        <nav className="p-4 text-white flex font-bold justify-between fixed top-0 left-0 w-full z-50 ">
            <div className="flex items-center gap-4">
                <img src={logo} alt="logo" className="h-14" />
                <h1 className="text-2xl">RAM API RATE LIMITER</h1>
            </div>
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-4 mr-10">
                    <Link to="/" className="border-2 px-4 py-1 border-blue-900">
                        Home
                    </Link>

                    <Link to="/login" className="border-2 px-4 py-1 border-blue-900">
                        Sign In
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default PublicNav;
