import React from 'react';
import background from '../assets/bgg.png';

const LandingPage = () => {
    return (
        <>
            <div
                className="flex flex-col items-center justify-center min-h-screen"
                style={{
                    backgroundImage: `url(${background})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    width: '100vw',
                }}
            >
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">Welcome to Our App</h1>
                    <p className="mb-8">Login or Register to continue.</p>
                </div>
            </div>

            <div className="p-8 bg-darkBlue text-white">
                <h1 className="text-2xl font-bold">Features</h1>
                <p>Our app offers a wide range of features...</p>
                <h1 className="text-2xl font-bold mt-8">About</h1>
                <p>Learn more about our app...</p>
            </div>
        </>
    );
};

export default LandingPage;
