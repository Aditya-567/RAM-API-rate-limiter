import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import './AuthPage.css';

const AuthPage = ({ initialMode }) => {
    const [isSignUp, setIsSignUp] = useState(initialMode === 'sign-up');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const toggle = () => {
        setIsSignUp(!isSignUp);
    };

    useEffect(() => {
        setIsSignUp(initialMode === 'sign-up');
    }, [initialMode]);

    const handleSignUp = async () => {
        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        try {
            await createUserWithEmailAndPassword(auth, email, password);
            setError('');
            navigate('/home'); // Redirect to home on successful sign-up
        } catch (error) {
            setError(error.message);
        }
    };

    const handleSignIn = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            setError('');
            navigate('/home'); // Redirect to home on successful sign-in
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div id="container" className={`container ${isSignUp ? 'sign-up' : 'sign-in'}`}>
            <div className="row">
                {/* Sign Up Form */}
                <div className="col align-items-center flex-col sign-up">
                    <div className="form-wrapper align-items-center">
                        <div id="bg" className="form sign-up">
                            {error && <p className="error-message">{error}</p>}
                            <div className="input-group">
                                <i className='bx bxs-user'></i>
                                <input
                                    type="text"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="input-group">
                                <i className='bx bxs-lock-alt'></i>
                                <input
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div className="input-group">
                                <i className='bx bxs-lock-alt'></i>
                                <input
                                    type="password"
                                    placeholder="Confirm password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>
                            <button className="btn" onClick={handleSignUp}>Sign up</button>
                            <p className='text-gray-600'>
                                <span>Already have an account?</span>
                                <b onClick={toggle} className="pointer">Sign in here</b>
                            </p>
                        </div>
                    </div>
                </div>
                {/* Sign In Form */}
                <div className="col align-items-center flex-col sign-in">
                    <div id="bg" className="form-wrapper align-items-center">
                        <div id="bg" className="form sign-in">
                            {error && <p className="error-message">{error}</p>}
                            <div className="input-group ">
                                <i className='bx bxs-user'></i>
                                <input
                                    type="text"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="input-group">
                                <i className='bx bxs-lock-alt'></i>
                                <input
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <button className="btn" onClick={handleSignIn}>Sign in</button>
                            <p className='text-gray-600'>
                                <b>Forgot password?</b>
                            </p>
                            <p className='text-gray-600'>
                                <span>Don't have an account?</span>
                                <b onClick={toggle} className="pointer">Sign up here</b>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row content-row">
                <div className="col align-items-center flex-col">
                    <div className="text sign-in">
                        <h2>Welcome</h2>
                    </div>
                </div>
                <div className="col align-items-center flex-col">
                    <div className="text sign-up">
                        <h2>Join with us</h2>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;
