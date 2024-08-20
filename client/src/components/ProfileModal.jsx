import React from 'react';
import { createPortal } from 'react-dom';
import '../context/AuthPage.css';

const ProfileModal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return createPortal(
        <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center z-0" >
            <div id='bg' className=" bg-richblack-900 mt-20 mr-4 rounded-2xl shadow-lg  w-full max-w-sm top-0 right-0 absolute">
                <button
                    className="absolute right-2 top-2 text-gray-900 hover:text-blue-700 pr-2 text-2xl"
                    onClick={onClose}
                >
                    &times;
                </button>
                {children}
            </div>
        </div>,
        document.getElementById('modal-root')
    );
};

export default ProfileModal;