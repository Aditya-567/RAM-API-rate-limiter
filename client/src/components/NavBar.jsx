import { signOut } from 'firebase/auth';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import { useAuth } from '../context/AuthContext';
import '../context/AuthPage.css';
import { auth } from '../firebase';
import EditProfileModal from './EditProfileModal';
import './nav.css';
import ProfileModal from './ProfileModal';


const NavBar = () => {
    const { state, dispatch } = useAuth();
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await signOut(auth);
            dispatch({ type: 'LOGOUT' });
            navigate('/');
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    const getProfilePicture = () => {
        return state.user.photoURL || `https://ui-avatars.com/api/?name=${state.user.email.charAt(0)}&background=random&color=fff`;
    };

    return (
        <nav className=" bg-opacity-50 text-white px-4 pt-4 font-bold flex justify-between fixed top-0 left-0 w-full z-50" style={{ background: 'radial-gradient(circle at top, #2d0136, #0f0216 80%, #05010b 95%)' }}>
            <div className="flex items-center pl-4 gap-6 ">

                <img src={logo} alt="logo" className="h-14" /><h1 className='text-2xl'>RAM API RATE LIMITER</h1>

            </div>
            <div className='flex items-center gap-2'>
                <div className='flex items-center gap-4 mr-10'>

                    <Link to="/home" className=" border border-blue-500 px-4  py-1 ">Home </Link>
                    <Link to="/save" className=" border border-blue-500 px-4  py-1 ">Save Policy</Link>
                    <Link to="/test" className=" border border-blue-500 px-4  py-1 ">JSON LAB</Link>
                </div>
                {state.user && (
                    <button
                        id='bg6'
                        onClick={() => setIsProfileOpen(!isProfileOpen)} // Toggle profile modal
                        className="rounded-full pt-2 pb-2 px-4"
                    >
                        {state.user.email.charAt(0).toUpperCase() || getProfilePicture()}
                    </button>
                )}
            </div>

            {isProfileOpen && (
                <ProfileModal isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)}>
                    <div className="flex flex-col items-center justify-center pt-8 pb-6">
                        <div className='flex gap-4 font-bold' style={{ fontFamily: 'monospace', fontSize: '16px' }}>
                            <img id='bg1' src={getProfilePicture()} alt="Profile" className="w-20 h-20 rounded-full border border-yellow-900" />
                            <div>
                                <p className='mt-4 text-gray-400'>Email: {state.user.email}</p>
                                <p className='text-gray-400'>Name: {state.user.firstName} {state.user.lastName}</p>
                            </div>
                        </div>
                        <div className='flex gap-2 pt-6 text-gray-200 ml-28'>
                            <button
                                id='bg3'
                                onClick={() => {
                                    setIsProfileOpen(false); // Close the ProfileModal
                                    setIsEditProfileOpen(true); // Open the EditProfileModal
                                }}
                                className="border-2 border-blue-500 text-white px-6 py-1 mt-4"
                            >
                                Edit
                            </button>
                            <button id='bg2' onClick={handleLogout} className="border-2 border-red-500 text-white px-10 py-1 mt-4">Logout</button>
                        </div>
                    </div>
                </ProfileModal>
            )}

            {isEditProfileOpen && (
                <EditProfileModal
                    user={state.user}
                    onSave={(updatedUser) => {
                        dispatch({ type: 'UPDATE_USER', payload: updatedUser });
                        setIsEditProfileOpen(false); // Close the EditProfileModal
                    }}
                    onCancel={() => setIsEditProfileOpen(false)} // Close the EditProfileModal
                />
            )}
        </nav>
    );
};

export default NavBar;