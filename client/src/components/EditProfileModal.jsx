import React, { useState } from 'react';

const EditProfileModal = ({ user, onSave, onCancel }) => {
    const [firstName, setFirstName] = useState(user.firstName || '');
    const [lastName, setLastName] = useState(user.lastName || '');

    const handleSave = () => {
        onSave({ ...user, firstName, lastName });
    };

    return (
        <div className="fixed inset-0 flex items-center  justify-center z-50" style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)', backdropFilter: 'blur(6px)' }}>
            <div id="bg" className="p-12 rounded-2xl shadow-lg relative w-full max-w-2xl" style={{ background: 'radial-gradient(circle at top, #2d0136, #0f0216 60%)' }}>
                <h2 className="text-3xl font-bold mb-4 text-white">Edit Profile</h2>
                <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First Name"
                    className="w-full p-2 mb-4 rounded text-gray-900"
                />
                <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Last Name"
                    className="w-full p-2 mb-10 rounded text-gray-900"
                />
                <div className="flex justify-end">
                    <button onClick={handleSave} className="border-2 border-blue-500 text-white px-8 py-2  mr-2">Save</button>
                    <button onClick={onCancel} className="border-2 border-red-500 text-white px-8 py-2 ">Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default EditProfileModal;
