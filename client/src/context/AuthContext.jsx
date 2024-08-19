import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { auth, db } from '../firebase';

const AuthContext = createContext();

const initialState = {
    user: null,
    loading: true,
};

const authReducer = (state, action) => {
    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                user: action.payload,
                loading: false,
            };
        case 'LOGOUT':
            return {
                ...state,
                user: null,
                loading: false,
            };
        case 'UPDATE_USER': // New action to update user state
            return {
                ...state,
                user: {
                    ...state.user,
                    ...action.payload,
                },
            };
        default:
            return state;
    }
};

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                // Fetch additional user data from Firestore
                const userDocRef = doc(db, 'users', user.uid);
                const userDocSnap = await getDoc(userDocRef);
                if (userDocSnap.exists()) {
                    const userData = userDocSnap.data();
                    dispatch({ type: 'SET_USER', payload: { ...user, ...userData } });
                } else {
                    dispatch({ type: 'SET_USER', payload: user });
                }
            } else {
                dispatch({ type: 'SET_USER', payload: null });
            }
        });

        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ state, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
