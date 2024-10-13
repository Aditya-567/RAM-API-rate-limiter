import React, { useEffect, useRef } from 'react';
import Typed from 'typed.js'; // Make sure this is properly imported
import { useAuth } from '../context/AuthContext';
import './HomePage.css';
import Ratelimitform from './Ratelimitform';
import Summarypage from './Summarypage';

const HomePage = () => {
    const { state } = useAuth();
    const typedRef = useRef(null); // Create a ref for the Typed element

    useEffect(() => {
        if (state.user && typedRef.current) {
            const typed = new Typed(typedRef.current, {
                strings: [` ${state.user.email.split('@')[0]}...`], // Use the username from email
                typeSpeed: 200,
                backSpeed: 80,
                backDelay: 1000,
                loop: true,
                smartBackspace: true,
                showCursor: true,
                cursorChar: ' >', // Optional: Customize the cursor character
                attr: null,
                bindInputFocusEvents: true,
                contentType: 'html',
            });

            // Add this line to apply the custom cursor class
            document.querySelector('.typed-cursor').classList.add('large-cursor');

            return () => {
                typed.destroy(); // Clean up Typed instance when component unmounts
            };
        }
    }, [state.user]);

    return (
        <div className="my-40 mx-20">
            <div className='flex gap-10 justify-center pb-20'>
                <div>
                    {/* <img src={rco} alt="RCO" className='w-60 h-90' /> */}

                    <div className='flex gap-4 pb-4'>
                        <img src='https://i.giphy.com/kZzY6eKKPdIjK.webp' title="API Gif" style={{ width: '100px', height: '100px' }}></img>
                        <div>
                            <h1 className="text-xl font-bold">Welcome User </h1> {/* Attach ref to the element */}
                            <span ref={typedRef} className="text-yellow-500 font-bold " style={{ fontFamily: 'monospace', fontSize: '32px' }}></span>
                        </div>
                    </div>
                    <h1 className='pb-4' style={{ fontFamily: 'monospace', fontSize: '16px', width: '600px' }}>This tool allows you to test and compare four key rate-limiting algorithms—Token Bucket, Fixed Window, Sliding Window, and Step Ladder. Based on your API use case, you can input a URL and the number of requests to evaluate which algorithm best suits your needs.</h1>
                    <h1 className='pb-4' style={{ fontFamily: 'monospace', fontSize: '16px', width: '590px' }}>Below is a detailed summary outlining how each Lambda function leverages the various payload parameters. These parameters are critical to defining the rate-limiting behavior, including identifying the resource to be limited, specifying the target URL, and setting specific limits like bucket size, refill rate, and time-to-live for requests. Each Lambda function operates using a unique combination of these parameters to effectively manage and enforce rate limits across different use cases."</h1>
                    <h1 className='pb-4' style={{ fontFamily: 'monospace', fontSize: '16px', width: '590px' }}>click on the button below to begin      <button
                        className='border-2 text-lg font-bold border-blue-500 text-white px-10 py-1 relative overflow-hidden hover:text-blue-900'
                        onClick={() => {
                            document.getElementById('summary').scrollIntoView({ behavior: 'smooth' });
                        }}
                    >
                        <span className="relative z-10">GO TO INFO</span>
                    </button></h1>
                </div>
                <div>
                    <Ratelimitform />

                </div>

            </div>
            <div id='summary'>
                <Summarypage />
            </div>

        </div>
    );
};

export default HomePage;
