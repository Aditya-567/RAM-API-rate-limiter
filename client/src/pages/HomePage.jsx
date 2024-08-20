import React from 'react';
import { useAuth } from '../context/AuthContext';

const HomePage = () => {
    const { state } = useAuth();

    return (
        <div className="mx-20 my-20">
            <div className="p-4">
                <h1 className="text-2xl font-bold">Home</h1>
                {state.user && <p>Welcome, {state.user.email.split('@')[0]}!</p>}
                <img
                    style={{ boxShadow: '3px 3px 10px black' }}
                    align="center"
                    alt="GIF"
                    src='https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExNzYzZGx5aWE2NDd3Ymg5YzIxYXczaW9sMnZyd2M2MnMxaGZiN3l5byZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/bGgsc5mWoryfgKBx1u/giphy.webp'
                />
            </div>
        </div>
    );
};

export default HomePage;