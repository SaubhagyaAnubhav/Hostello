import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { Menu, X } from 'lucide-react';

const DashboardLayout = () => {
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <div className="min-h-screen bg-background">
            <div className="hidden md:block">
                <Sidebar />
            </div>

            <div className="md:ml-64 min-h-screen flex flex-col">
                <header className="md:hidden bg-white border-b border-gray-200 p-4 flex items-center justify-between sticky top-0 z-40">
                    <div className="flex items-center gap-2">
                        <span className="font-sans text-2xl font-black tracking-[-0.05em] text-transparent bg-clip-text bg-gradient-to-br from-primary via-blue-600 to-indigo-700">
                            Hostello
                        </span>
                    </div>

                    <button
                        className="text-slate-600"
                        onClick={() => setMobileOpen((prev) => !prev)}
                    >
                        {mobileOpen ? <X size={26} /> : <Menu size={26} />}
                    </button>
                </header>

                {mobileOpen && (
                    <div className="fixed inset-0 z-50 md:hidden">
                        <div
                            className="absolute inset-0 bg-black/40"
                            onClick={() => setMobileOpen(false)}
                        ></div>

                        <div className="absolute left-0 top-0 h-full w-[260px] bg-white shadow-xl">
                            <Sidebar />
                        </div>
                    </div>
                )}

                <main className="flex-1 p-6 md:p-8 overflow-y-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;