import React from 'react';
import { Search, Bell, Plus, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const AdminHeader = () => {
    const { user } = useAuth();

    return (
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 md:px-8 shrink-0 sticky top-0 z-30">

            <div className="flex items-center md:hidden w-10"></div>
            
            
            <div className="hidden md:flex items-center font-semibold text-slate-800 text-lg">
                Admin Portal
            </div>

           
            <div className="flex items-center gap-4 sm:gap-6 ml-auto">
                
                
                <div className="hidden sm:flex relative group">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400 group-focus-within:text-indigo-500 transition-colors">
                        <Search size={18} />
                    </div>
                    <input 
                        type="text" 
                        placeholder="Search students, rooms..."
                        className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white w-64 transition-all"
                    />
                </div>

                
                <button className="hidden sm:flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm">
                    <Plus size={16} />
                    <span>Create Notice</span>
                </button>

                
                <button className="relative p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900 rounded-full transition-colors">
                    <Bell size={20} />
                    
                    <span className="absolute top-1.5 right-1.5 flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500 border-2 border-white"></span>
                    </span>
                </button>

                
                <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
                    <div className="flex flex-col text-right hidden lg:flex mt-0.5">
                        <span className="text-sm font-semibold text-slate-900 leading-tight">
                            {user?.name || 'Chief Warden'}
                        </span>
                        <span className="text-xs text-slate-500">
                            Administrator
                        </span>
                    </div>
                    <button className="h-9 w-9 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 border border-indigo-200 overflow-hidden shrink-0 hover:ring-2 hover:ring-indigo-600/20 transition-all">
                        {user?.avatar ? (
                            <img src={user.avatar} alt="Profile" className="h-full w-full object-cover" />
                        ) : (
                            <User size={18} />
                        )}
                    </button>
                </div>
            </div>
        </header>
    );
};

export default AdminHeader;
