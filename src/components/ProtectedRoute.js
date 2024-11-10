import React from 'react';
import { Navigate } from 'react-router-dom';
import {useAuth} from './AuthContext';

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useAuth(); // Get authentication status from context

    return isAuthenticated ? children : <Navigate to="/signin" />; // Redirect to signin if not authenticated
};

export default ProtectedRoute;