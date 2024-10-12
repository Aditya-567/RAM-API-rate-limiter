import React, { useEffect, useRef } from 'react';
import Typed from 'typed.js'; // Make sure this is properly imported
import { useAuth } from '../context/AuthContext';
import Ratelimitform from './Ratelimitform';
import Summarypage from './Summarypage';

const HomePage = () => {
    const { state } = useAuth();
    const typedRef = useRef(null); // Create a ref for the Typed element

    useEffect(() => {
        if (state.user && typedRef.current) {
            const typed = new Typed(typedRef.current, {
                strings: [` ${state.user.email.split('@')[0]}!`], // Use the username from email
                typeSpeed: 200,
                backSpeed: 80,
                backDelay: 1000,
                loop: true,
                showCursor: false,
            });

            return () => {
                typed.destroy(); // Clean up Typed instance when component unmounts
            };
        }
    }, [state.user]);

    return (
        <div className="my-20 mx-20">
            <div className="p-4">
                <h1 className="text-2xl font-bold">Welcome User</h1>
                <p ref={typedRef} className="text-yellow-500 font-bold"></p> {/* Attach ref to the element */}
            </div>
            <div className='flex flex-col justify-center items-center'>
                <Ratelimitform />
                <Summarypage />
            </div>
        </div>
    );
};

export default HomePage;
