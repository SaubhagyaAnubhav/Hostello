import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PublicRoute = () => {
    const { user, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>;
    }

    if (user) {
        
        if (user.role === 'student') return <Navigate to="/student/dashboard" replace />;
        if (user.role === 'admin') return <Navigate to="/admin/dashboard" replace />;
        if (user.role === 'warden') return <Navigate to="/warden/dashboard" replace />;
        return <Navigate to="/" replace />; 
    }

    return <Outlet />;
};

export default PublicRoute;
