import React, { useState } from 'react';
import { Search, Bell, Plus, User, ChevronDown } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminHeader = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    const query = searchQuery.trim();
    if (!query) return;
    navigate(`/admin/students?search=${encodeURIComponent(query)}`);
  };

  const handleCreateNotice = () => {
    navigate('/admin/notices');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <header className="sticky top-0 z-30 h-16 border-b border-slate-200/80 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="flex h-full items-center justify-between gap-4 px-4 md:px-6 lg:px-8">
        <div className="flex min-w-0 flex-1 items-center">
          <div className="hidden md:flex w-full max-w-md lg:max-w-lg relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
              <Search size={18} />
            </div>

            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search students, rooms, complaints..."
              className="h-11 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm text-slate-700 placeholder:text-slate-400 outline-none transition-all focus:border-indigo-300 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={handleSearch}
            className="inline-flex h-10 items-center justify-center rounded-xl border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 shadow-sm transition-all hover:border-slate-300 hover:bg-slate-50 sm:hidden"
          >
            <Search size={18} />
          </button>

          <button
            onClick={handleCreateNotice}
            className="inline-flex h-10 items-center justify-center rounded-xl bg-indigo-600 px-3 text-sm font-medium text-white shadow-sm transition-all hover:bg-indigo-700 sm:hidden"
          >
            <Plus size={18} />
          </button>

          <button
            onClick={handleCreateNotice}
            className="hidden sm:inline-flex h-10 items-center gap-2 rounded-xl bg-indigo-600 px-4 text-sm font-medium text-white shadow-sm transition-all hover:bg-indigo-700"
          >
            <Plus size={16} />
            <span>Create Notice</span>
          </button>

          <button className="relative inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm transition-all hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900">
            <Bell size={18} />
          </button>

          <button className="inline-flex items-center gap-3 rounded-2xl border border-slate-200 bg-white pl-2 pr-3 py-1.5 shadow-sm transition-all hover:border-slate-300 hover:bg-slate-50">
            <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl border border-indigo-200 bg-indigo-50 text-indigo-700">
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt="Profile"
                  className="h-full w-full object-cover"
                />
              ) : (
                <User size={18} />
              )}
            </div>

            <div className="hidden text-left lg:block">
              <p className="text-sm font-semibold leading-tight text-slate-900">
                {user?.name || 'Hostello Admin'}
              </p>
              <p className="text-xs text-slate-500">Administrator</p>
            </div>

            <ChevronDown size={16} className="hidden text-slate-400 lg:block" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
