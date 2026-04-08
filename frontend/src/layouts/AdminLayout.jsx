import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '../components/admin/AdminSidebar';
import AdminHeader from '../components/admin/AdminHeader';

const AdminLayout = () => {

    return (
        <div className="min-h-screen bg-slate-50 flex">
            
            <AdminSidebar />

            
            <div className="flex-1 flex flex-col min-w-0 md:ml-64">
                <AdminHeader />
                <main className="flex-1 p-4 md:p-8 overflow-y-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
