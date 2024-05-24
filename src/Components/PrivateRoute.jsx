// src/components/PrivateRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import axios from 'axios';
const PrivateRoute = () => {
    const isAuthenticated = !!localStorage.getItem('user');
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
