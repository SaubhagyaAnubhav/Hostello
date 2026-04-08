import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  DoorOpen,
  AlertTriangle,
  Bell,
  CheckSquare,
  IndianRupee,
  History,
  UserX,
  FileText,
  Settings,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const AdminSidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { path: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/admin/students', icon: Users, label: 'Students' },
    { path: '/admin/rooms', icon: DoorOpen, label: 'Rooms' },
    { path: '/admin/complaints', icon: AlertTriangle, label: 'Complaints' },
    { path: '/admin/notices', icon: Bell, label: 'Notices' },
    { path: '/admin/verification', icon: CheckSquare, label: 'Verification' },
    { path: '/admin/payments', icon: IndianRupee, label: 'Payments' },
    { path: '/admin/visitors', icon: History, label: 'Visitor Logs' },
    { path: '/admin/leaves', icon: UserX, label: 'Leaves / Passes' },
    { path: '/admin/reports', icon: FileText, label: 'Reports' },
    { path: '/admin/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/20 backdrop-blur-[1px] md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div className="fixed left-4 top-4 z-[60] md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm"
        >
          {isOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-[248px] flex-col border-r border-slate-200 bg-slate-50 transition-transform duration-300 ease-in-out md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="border-b border-slate-200 px-7 py-8">
          <Link
            to="/admin/dashboard"
            onClick={() => setIsOpen(false)}
            className="block"
          >
            <h1 className="text-[34px] font-extrabold leading-none tracking-tight text-indigo-600">
              Hostello
            </h1>
          </Link>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-8">
          <p className="mb-5 text-[12px] font-semibold uppercase tracking-[0.28em] text-slate-400">
            Main Menu
          </p>

          <nav className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `group flex items-center gap-3 rounded-[22px] px-4 py-3 transition-all duration-200 ${
                      isActive
                        ? 'bg-slate-200/80 text-indigo-600'
                        : 'text-slate-600 hover:bg-white/70 hover:text-slate-900'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <div
                        className={`flex shrink-0 items-center justify-center rounded-[16px] transition-all duration-200 ${
                          isActive
                            ? 'h-11 w-11 bg-white shadow-sm'
                            : 'h-11 w-11 bg-transparent'
                        }`}
                      >
                        <Icon
                          size={21}
                          strokeWidth={1.9}
                          className={
                            isActive
                              ? 'text-indigo-600'
                              : 'text-slate-500 group-hover:text-slate-700'
                          }
                        />
                      </div>

                      <span
                        className={`truncate text-[15px] font-medium tracking-[-0.01em] ${
                          isActive ? 'text-indigo-600' : 'text-slate-600'
                        }`}
                      >
                        {item.label}
                      </span>
                    </>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        <div className="border-t border-slate-200 px-5 py-6">
          <button
            onClick={handleLogout}
            className="group flex w-full items-center gap-3 rounded-[22px] px-4 py-3 transition-all duration-200 hover:bg-red-50"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[16px] bg-red-50">
              <LogOut
                size={21}
                strokeWidth={1.9}
                className="text-red-600"
              />
            </div>

            <span className="text-[15px] font-medium tracking-[-0.01em] text-red-600">
              Logout
            </span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;