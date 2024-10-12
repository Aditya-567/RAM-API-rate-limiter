import React from 'react';
import { createPortal } from 'react-dom';
import '../context/AuthPage.css';

const ProfileModal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return createPortal(
        <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center z-0 backdrop-blur-sm " >
            <div id='bg' className=" mt-20 mr-4 rounded-2xl shadow-lg  w-full max-w-md top-0 right-0 absolute bg-[#160518] ">
                <button
                    className="absolute right-2 top-2 text-gray-400 hover:text-blue-700 pr-2 text-2xl"
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
