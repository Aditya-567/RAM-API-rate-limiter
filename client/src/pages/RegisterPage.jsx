import React, { useEffect } from 'react';
import AuthPage from '../context/AuthPage';

const RegisterPage = () => {
    useEffect(() => {
        document.body.style.overflow = 'hidden'; // Prevent scrolling

        return () => {
            document.body.style.overflow = 'auto'; // Restore scrolling on unmount
        };
    }, []);

    return <AuthPage className="h-min-screen" initialMode="sign-up" />;
};

export default RegisterPage;