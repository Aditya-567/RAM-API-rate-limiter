import React, { useEffect, useState } from 'react';
import logo from '../assets/login.png';
import './LandingPage.css'; // Import the CSS file

const LandingPage = () => {
    const [showScroll, setShowScroll] = useState(false);

    const checkScrollTop = () => {
        if (!showScroll && window.pageYOffset > 300) {
            setShowScroll(true);
        } else if (showScroll && window.pageYOffset <= 300) {
            setShowScroll(false);
        }
    };

    const scrollTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    useEffect(() => {
        window.addEventListener('scroll', checkScrollTop);
        return () => {
            window.removeEventListener('scroll', checkScrollTop);
        };
    }, [showScroll]);

    return (
        <>
            <div className="text-center p-4">
                <img src={logo} alt="logo" className="mb-4 mx-auto" />
                <h1 className="text-4xl font-bold mb-4">Welcome to Our App</h1>
                <p className="mb-8">Login or Register to continue.</p>
            </div>

            <div className="p-8 bg-darkBlue text-white hide-scrollbar min-h-screen">
                <h1 className="text-2xl font-bold">Features</h1>
                <p>Our app offers a wide range of features...</p>
                <h1 className="text-2xl font-bold mt-8">About</h1>
                <p>Learn more about our app...</p>
            </div>

            {/* Scroll to Top Button */}
            <button
                className={`scroll-top ${showScroll ? 'show' : ''}`}
                onClick={scrollTop}
            >
                &#8679;
            </button>
        </>
    );
};

export default LandingPage;
