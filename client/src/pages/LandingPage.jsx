import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll'; // Import Link from react-scroll
import Typed from 'typed.js'; // Ensure Typed.js is imported
import { useAuth } from '../context/AuthContext';
import Globe from '../globe/globe';
import './LandingPage.css';

const LandingPage = () => {
    const { state } = useAuth();
    const navigate = useNavigate();

    // Redirect authenticated users to /home
    useEffect(() => {
        if (state.user) {
            navigate('/home');
        }
    }, [state.user, navigate]);

    // Initialize Typed.js
    useEffect(() => {
        const typed = new Typed('.role', {
            strings: ["RAM"],
            typeSpeed: 200,
            backSpeed: 80,
            backDelay: 1000,
            loop: true,
            showCursor: false,
        });

        // Cleanup function to destroy the Typed instance on component unmount
        return () => {
            typed.destroy();
        };
    }, []);

    return (
        <div className="mx-20 my-36">

            <div className="flex flex-col md:flex-row pl-10 mb-40">
                <div className="md:w-1/2">
                    <h1 className="text-4xl font-extrabold">Welcome to <span className="pl-4 text-7xl font-extrabold text-yellow-500 role"></span></h1>
                    <h1 className="text-sm text-gray-400 font-extrabold mb-6 bg-gray-700 py-1 rounded-xl pl-2" style={{ fontFamily: 'monospace', }}>Empowering Your APIs with RAM Platform — Craft, Save, and Perfect Your JSON Policies </h1>

                    <h1 className="text-xl font-extrabold mb-10">RAM is the ultimate testing interface for developers, providing a seamless environment to experiment with and refine JSON policies. Instantly test your policies under various conditions, fine-tune them for optimal performance, and customize them to meet your specific API needs. With RAM, you can easily craft tailored policies and save them for future use, ensuring your progress is never lost and can be revisited or updated as your requirements evolve.</h1>

                    <div className="flex gap-4">
                        <Link to="/login">
                            <button id="bg" className="text-white border-2 px-4 py-1 border-blue-900 transition duration-300 ease-in-out hover:bg-blue-900 hover:text-white">
                                Sign In
                            </button>
                        </Link>
                        <ScrollLink to="features" smooth={true} duration={500}>
                            <button id="bg" className="text-white border-2 px-4 py-1 border-blue-900 transition duration-300 ease-in-out hover:bg-blue-900 hover:text-white">
                                Features
                            </button>
                        </ScrollLink>
                    </div>
                </div>
                <div className="flex justify-center md:w-1/2">
                    <Globe />
                </div>
            </div>
            <div id="features" className="my-40 flex flex-col items-center">
                <h1 className="text-6xl font-extrabold mb-10">Features</h1>
                <div className="flex gap-8">
                    <div className="  border-2 border-blue-900 text-center" style={{ height: '200px', width: '350px' }}>
                        <h2 className="text-xl font-bold mb-2">Compare</h2>
                        <p>Compare your JSON policies easily.</p>
                    </div>
                    <div className="  border-2 border-blue-900 text-center" style={{ height: '200px', width: '350px' }}>
                        <h2 className="text-xl font-bold mb-2">Save</h2>
                        <p>Save your JSON policies for future use.</p>
                    </div>
                    <div className="  border-2 border-blue-900 text-center" style={{ height: '200px', width: '350px' }}>
                        <h2 className="text-xl font-bold mb-2">JSON Lab</h2>
                        <p>Experiment with JSON policies in the lab.</p>
                    </div>
                </div>
            </div>
            <div className="my-40 flex flex-col items-center">
                <h1 className="text-3xl font-extrabold mb-10">Pricing</h1>
                <div className="flex gap-8">
                    <div className=" p-10 border-2 border-blue-900 text-center">
                        <h2 className="text-xl font-bold mb-2">Free</h2>
                        <p>Free to use.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
