import React from 'react';
import { Link } from 'react-router-dom';

const PublicNav = () => {
    return (
        <nav className=" p-4 text-white flex justify-between">
            <div>
                <Link to="/login" className="mr-4">Login</Link>
                <Link to="/register" className="mr-4">Register</Link>
            </div>
        </nav>
    );
};

export default PublicNav;
