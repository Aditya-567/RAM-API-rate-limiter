import { onAuthStateChanged } from 'firebase/auth';
import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { auth } from '../firebase';

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
        default:
            return state;
    }
};

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                dispatch({ type: 'SET_USER', payload: user });
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
