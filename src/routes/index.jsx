import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts'; 

export default function ProtectedRoute({ redirectTo }) {
    const { user } = useAuth()
    return user ? <Outlet /> : <Navigate to={redirectTo} />;
}
