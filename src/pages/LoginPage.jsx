import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/home');
        } catch (error) {
            console.error("Error logging in:", error);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            const provider = new GoogleAuthProvider();
            await signInWithPopup(auth, provider);
            navigate('/home');
        } catch (error) {
            console.error("Error logging in with Google:", error);
        }
    };

    return (
        <div>
            <h1>Login</h1>
            <input
                className="bg-gray-800 text-white p-2 rounded"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
            />
            <input
                className="bg-gray-800 text-white p-2 rounded"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            <button
                className="bg-blue-500 text-white p-2 rounded"
                onClick={handleLogin}
            >
                Login
            </button>
            <button
                className="bg-red-500 text-white p-2 rounded mt-4"
                onClick={handleGoogleLogin}
            >
                Login with Google
            </button>
        </div>
    );
};

export default LoginPage;
