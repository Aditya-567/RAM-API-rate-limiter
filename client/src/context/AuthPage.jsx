import {
    createUserWithEmailAndPassword,
    GithubAuthProvider,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    signInWithPopup,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import google from '../assets/gg.png';
import github from '../assets/git.png';
import twitter from '../assets/tt.png';
import '../components/nav.css';
import { useAuth } from '../context/AuthContext'; // Import the useAuth hook
import { auth, db } from '../firebase'; // Ensure db is imported from firebase.js
import './AuthPage.css';

const AuthPage = ({ initialMode }) => {
    const [isSignUp, setIsSignUp] = useState(initialMode === 'sign-up');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const navigate = useNavigate();
    const { state } = useAuth(); // Access the user's authentication state

    // Redirect to /home if user is already logged in
    useEffect(() => {
        if (state.user) {
            navigate('/home');
        }
    }, [state.user, navigate]);

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
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Store first name and last name in Firestore
            await setDoc(doc(db, 'users', user.uid), {
                firstName: firstName,
                lastName: lastName,
                email: email,
            });

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

    const handleGoogleSignIn = async () => {
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
            navigate('/home'); // Redirect to home on successful sign-in
        } catch (error) {
            setError(error.message);
        }
    };

    const handleGithubSignIn = async () => {
        const provider = new GithubAuthProvider();
        try {
            await signInWithPopup(auth, provider);
            navigate('/home'); // Redirect to home on successful sign-in
        } catch (error) {
            setError(error.message);
        }
    };

    const handleTwitterSignIn = async () => {
        console.log('Twitter sign-in clicked');
    };

    return (
        <div id="container" className={`container ${isSignUp ? 'sign-up' : 'sign-in'}`}>
            <div className="row">
                {/* Sign Up Form */}
                <div className="col align-items-center flex-col sign-up">
                    <div className="form-wrapper align-items-center">
                        <div id="bg" className="form sign-up">
                            {error && <p className="error-message">{error}</p>}
                            <div className="flex justify-center ml-20 mr-20 gap-10">
                                <button
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        width: '195px',
                                        borderRadius: '80px',
                                    }}
                                    onClick={handleGoogleSignIn}
                                >
                                    <img className="w-15 h-10" src={google} alt="Google" />
                                </button>
                                <button
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        width: '195px',
                                        borderRadius: '80px',
                                    }}
                                    onClick={handleGithubSignIn}
                                >
                                    <img className="w-15 h-10" src={github} alt="Github" />
                                </button>
                                <button
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        width: '195px',
                                        borderRadius: '80px',
                                    }}
                                    onClick={handleTwitterSignIn}
                                >
                                    <img className="w-15 h-10" src={twitter} alt="Twitter" />
                                </button>
                            </div>
                            <div className="flex justify-center text-gray-600 ml-20 mr-20 gap-2 my-4">
                                <p className="text-gray-100">
                                    <span id="bg" className="py-1 px-2 rounded-full">
                                        Or
                                    </span>
                                </p>
                            </div>
                            <div className="input-group flex gap-2">
                                <i className="bx bxs-user font-bold "></i>
                                <input
                                    className='font-bold'
                                    type="text"
                                    placeholder="First Name"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                                <input
                                    className='font-bold'
                                    type="text"
                                    placeholder="Last Name"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </div>
                            <div className="input-group">
                                <i className="bx bxs-user font-bold"></i>
                                <input
                                    className='font-bold'
                                    type="text"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="input-group">
                                <i className="bx bxs-lock-alt font-bold"></i>
                                <input
                                    className='font-bold'
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div className="input-group">
                                <i className="bx bxs-lock-alt font-bold "></i>
                                <input
                                    className='font-bold'
                                    type="password"
                                    placeholder="Confirm password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>
                            <button className="btn" onClick={handleSignUp}>
                                Sign up
                            </button>
                            <p className="text-gray-600 font-bold" style={{ fontSize: '14px', }}>
                                <span>Already have an account? </span>
                                <b onClick={toggle} className="pointer text-blue-500" style={{ fontSize: '18px', }}>
                                    Sign in here
                                </b>
                            </p>
                        </div>
                    </div>
                </div>
                {/* Sign In Form */}
                <div className="col align-items-center flex-col sign-in overflow-hidden">
                    <div className="form-wrapper align-items-center">
                        <div id="bg" className="form sign-in">
                            {error && <p className="error-message">{error}</p>}
                            <div className="flex justify-center ml-20 mr-20 gap-10">
                                <button
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        width: '195px',
                                        borderRadius: '80px',
                                    }}
                                    onClick={handleGoogleSignIn}
                                >
                                    <img className="w-15 h-10" src={google} alt="Google" />
                                </button>
                                <button
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        width: '195px',
                                        borderRadius: '80px',
                                    }}
                                    onClick={handleGithubSignIn}
                                >
                                    <img className="w-15 h-10" src={github} alt="Github" />
                                </button>
                                <button
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        width: '195px',
                                        borderRadius: '80px',
                                    }}
                                    onClick={handleTwitterSignIn}
                                >
                                    <img className="w-15 h-10" src={twitter} alt="Twitter" />
                                </button>
                            </div>
                            <div className="flex justify-center ml-20 mr-20 gap-2 my-4">
                                <p className="text-gray-100">
                                    <span id="bg" className=" py-1 px-2 rounded-full">
                                        Or
                                    </span>
                                </p>
                            </div>
                            <div className="input-group">
                                <i className="bx bxs-user font-bold"></i>
                                <input
                                    className='font-bold'
                                    type="text"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="input-group">
                                <i className="bx bxs-lock-alt font-bold"></i>
                                <input
                                    className='font-bold'
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <button className="btn" onClick={handleSignIn}>
                                Sign in
                            </button>
                            <p className="text-gray-500 font-bold" style={{ fontSize: '16px', }}>
                                <b>Forgot password?</b>
                            </p>
                            <p className="text-gray-500 font-bold " style={{ fontSize: '14px', }}>
                                <span>Don't have an account? </span>
                                <b onClick={toggle} className="pointer text-blue-500" style={{ fontSize: '18px', }}>
                                    Sign up here
                                </b>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row content-row" >
                <div className="col align-items-center flex-col" style={{ textAlign: 'left', marginLeft: '-120px' }}>
                    <div className='text sign-in' style={{ marginTop: '-140px' }}>

                        <h2 className='text-gray-400 text-4xl font-bold pl-16'>Welcome Back Devs</h2>
                    </div>
                </div>
                <div className="col align-items-center flex-col">
                    <div className="text sign-up" style={{ marginTop: '100px', marginLeft: '300px' }}>
                        <h2>Join with us</h2>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;
