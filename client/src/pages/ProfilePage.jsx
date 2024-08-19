import { doc, getDoc, updateDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import EditProfileModal from '../components/EditProfileModal';
import ProfileModal from '../components/ProfileModal';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';

const ProfilePage = () => {
    const { state, dispatch } = useAuth();
    const [isEditing, setIsEditing] = useState(false);

    const handleSaveProfile = async (updatedData) => {
        if (state.user) {
            const userRef = doc(db, "users", state.user.uid);

            const docSnap = await getDoc(userRef);
            if (docSnap.exists()) {
                await updateDoc(userRef, updatedData);

                const updatedUserDoc = await getDoc(userRef);

                dispatch({
                    type: 'UPDATE_USER',
                    payload: {
                        ...state.user,
                        ...updatedUserDoc.data(),
                    },
                });
            } else {
                console.error("No document to update");
            }
        }
        setIsEditing(false);
    };

    const getProfilePicture = () => {
        return state.user.photoURL || `https://ui-avatars.com/api/?name=${state.user.email.charAt(0)}&background=random&color=fff`;
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold">Profile</h1>
            {state.user ? (
                <div>
                    <img src={getProfilePicture()} alt="Profile" className="w-20 h-20 rounded-full" />
                    <p>Email: {state.user.email}</p>
                    <p>Name: {state.user.firstName} {state.user.lastName}</p>
                    <button onClick={() => setIsEditing(true)} className="btn btn-primary mt-4">Edit Profile</button>
                </div>
            ) : (
                <p>No user is logged in</p>
            )}
            <ProfileModal isOpen={isEditing} onClose={() => setIsEditing(false)}>
                <EditProfileModal user={state.user} onSave={handleSaveProfile} onCancel={() => setIsEditing(false)} />
            </ProfileModal>
        </div>
    );
};

export default ProfilePage;
