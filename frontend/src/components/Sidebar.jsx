import { Link, NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  User,
  Utensils,
  MessageSquare,
  Bell,
  LogOut,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = [
    { name: 'Dashboard', path: '/student/dashboard', icon: LayoutDashboard },
    { name: 'My Profile', path: '/student/profile', icon: User },
    { name: 'Food Menu', path: '/student/menu', icon: Utensils },
    { name: 'Complaints', path: '/student/complaints', icon: MessageSquare },
    { name: 'Notices', path: '/student/notices', icon: Bell },
  ];

  return (
    <aside className="fixed left-0 top-0 flex h-screen w-[250px] flex-col border-r border-slate-200 bg-white">
      <div className="border-b border-slate-200 px-6 py-6">
        <Link
          to="/"
          className="text-[2.65rem] font-black tracking-[-0.07em] text-blue-600 transition hover:text-blue-700"
        >
          Hostello
        </Link>
      </div>

      <div className="flex-1 px-4 py-5">
        <p className="px-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
          Main Menu
        </p>

        <nav className="mt-4 space-y-1.5">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `group flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div
                    className={`flex h-9 w-9 items-center justify-center rounded-xl transition-all duration-200 ${
                      isActive
                        ? 'bg-white text-blue-600 shadow-sm'
                        : 'text-slate-500 group-hover:bg-white group-hover:text-slate-800'
                    }`}
                  >
                    <item.icon size={18} strokeWidth={2} />
                  </div>

                  <span className="text-[15px] font-medium">{item.name}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="border-t border-slate-200 p-4">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-red-600 transition-all duration-200 hover:bg-red-50"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-50">
            <LogOut size={18} strokeWidth={2} />
          </div>
          <span className="text-[15px] font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;