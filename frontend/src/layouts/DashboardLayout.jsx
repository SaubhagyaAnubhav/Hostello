import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { Menu } from 'lucide-react';

const DashboardLayout = () => {
    

    return (
        <div className="min-h-screen bg-background">
            
            <div className="hidden md:block">
                <Sidebar />
            </div>

            
            <div className="md:ml-64 min-h-screen flex flex-col">
                
                <header className="md:hidden bg-white border-b border-gray-200 p-4 flex items-center justify-between sticky top-0 z-10">
                    <div className="flex items-center gap-2">
                        <span className="font-sans text-2xl md:text-3xl font-black tracking-[-0.05em] sm:tracking-[-0.075em] text-transparent bg-clip-text bg-gradient-to-br from-primary via-blue-600 to-indigo-700 drop-shadow-sm group-hover:opacity-90 transition-opacity duration-300">Hostello</span>
                    </div>
                    <button className="text-slate-600">
                        <Menu size={26} />
                    </button>
                </header>

                <main className="flex-1 p-6 md:p-8 overflow-y-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
