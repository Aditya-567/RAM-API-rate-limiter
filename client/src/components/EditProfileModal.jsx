import React, { useState } from 'react';

const EditProfileModal = ({ user, onSave, onCancel }) => {
    const [firstName, setFirstName] = useState(user.firstName || '');
    const [lastName, setLastName] = useState(user.lastName || '');

    const handleSave = () => {
        onSave({ ...user, firstName, lastName });
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div id="bg" className="p-6 rounded-2xl shadow-lg relative w-full max-w-md bg-darkBlue">
                <h2 className="text-xl font-bold mb-4 text-white">Edit Profile</h2>
                <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First Name"
                    className="w-full p-2 mb-2 rounded text-gray-900"
                />
                <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Last Name"
                    className="w-full p-2 mb-4 rounded text-gray-900"
                />
                <div className="flex justify-end">
                    <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded mr-2">Save</button>
                    <button onClick={onCancel} className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default EditProfileModal;
