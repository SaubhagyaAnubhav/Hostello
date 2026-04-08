import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';


import MainLayout from '../layouts/MainLayout';
import DashboardLayout from '../layouts/DashboardLayout';
import AdminLayout from '../layouts/AdminLayout';

import PublicRoute from './PublicRoute';
import ProtectedRoute from './ProtectedRoute';


import Home from '../pages/public/Home';
import Login from '../pages/public/Login';
import Signup from '../pages/public/Signup';
import Hostels from '../pages/Hostels';
import Facilities from '../pages/public/Facilities';
import FAQ from '../pages/public/FAQ';
import FoodMenu from '../pages/public/FoodMenu';


import Dashboard from '../pages/student/Dashboard';
import Profile from '../pages/student/Profile';
import StudentFoodMenu from '../pages/student/StudentFoodMenu';
import Complaints from '../pages/student/Complaints';
import Notices from '../pages/student/Notices';


import AdminDashboard from '../pages/admin/AdminDashboard';
import AdminStudents from '../pages/admin/AdminStudents';
import AdminComplaints from '../pages/admin/AdminComplaints';
import AdminNotices from '../pages/admin/AdminNotices';
import AdminVerification from '../pages/admin/AdminVerification';
import AdminRooms from '../pages/admin/AdminRooms';
import AdminPayments from '../pages/admin/AdminPayments';

const AppRoutes = () => {
    return (
        <Routes>
            
            <Route element={<MainLayout />}>
                <Route path="/" element={<Home />} />

            
                <Route element={<PublicRoute />}>
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                </Route>

                <Route path="/hostels" element={<Hostels />} />
                <Route path="/facilities" element={<Facilities />} />

            
                <Route path="/food-menu" element={<FoodMenu />} />
                <Route path="/faq" element={<FAQ />} />
            </Route>

            
            <Route path="/student" element={<ProtectedRoute allowedRoles={['student']} />}>
                <Route element={<DashboardLayout />}>
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="profile" element={<Profile />} />
                    <Route path="menu" element={<StudentFoodMenu />} />
                    <Route path="complaints" element={<Complaints />} />
                    <Route path="notices" element={<Notices />} />
                </Route>
            </Route>

            
            <Route path="/admin" element={<ProtectedRoute allowedRoles={['admin']} />}>
                <Route element={<AdminLayout />}>
                    <Route path="dashboard" element={<AdminDashboard />} />
                    <Route path="students" element={<AdminStudents />} />
                    <Route path="rooms" element={<AdminRooms />} />
                    <Route path="complaints" element={<AdminComplaints />} />
                    <Route path="notices" element={<AdminNotices />} />
                    <Route path="verification" element={<AdminVerification />} />
                    <Route path="payments" element={<AdminPayments />} />
                    <Route path="visitors" element={<div className="p-8 text-slate-500">Visitor Logs (Coming Soon)</div>} />
                    <Route path="leaves" element={<div className="p-8 text-slate-500">Leaves / Gate Passes (Coming Soon)</div>} />
                    <Route path="reports" element={<div className="p-8 text-slate-500">Reports (Coming Soon)</div>} />
                    <Route path="settings" element={<div className="p-8 text-slate-500">Settings (Coming Soon)</div>} />
                </Route>
            </Route>

            
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
};

export default AppRoutes;
