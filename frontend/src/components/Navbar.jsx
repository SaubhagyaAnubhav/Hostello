import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from './ui/Button';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();


    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    
    useEffect(() => {
        setIsOpen(false);
    }, [location.pathname]);

    const handleLogout = () => {
        logout();
        navigate('/');
        setIsOpen(false);
    };

    const toggleMenu = () => setIsOpen(!isOpen);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Hostels', path: '/hostels' },
        { name: 'Facilities', path: '/facilities' },
        { name: 'Food Menu', path: '/food-menu' },
        { name: 'Contact', path: '/faq' },
    ];

    const isActive = (path) => {
        if (path === '/' && location.pathname !== '/') return false;
        return location.pathname.startsWith(path) && (path !== '/' || location.pathname === '/');
    };

    const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

    return (
        <nav
            className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 border-b ${
                scrolled 
                    ? 'bg-white/80 backdrop-blur-md border-gray-200 shadow-sm py-3' 
                    : 'bg-white border-transparent py-4'
            }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className={isAuthPage ? 
                    'flex items-center justify-between h-14 md:h-16': 
                    'flex items-center justify-between h-14 md:h-16 md:grid md:grid-cols-[auto_1fr_auto]'
                    }
                    >
                    
                    
                    <div className="flex items-center justify-start">
                        <Link 
                            to="/"
                            aria-label="Hostello Home"
                            className="group flex items-center"
                        >
                            <span className="font-sans text-2xl md:text-3xl font-black tracking-[-0.05em] sm:tracking-[-0.075em] text-transparent bg-clip-text bg-gradient-to-br from-primary via-blue-600 to-indigo-700 drop-shadow-sm group-hover:opacity-90 transition-opacity duration-300">
                                Hostello
                            </span>
                        </Link>
                    </div>

                    {!isAuthPage && (
                        <>
                            
                            <div className="hidden md:flex items-center justify-center gap-1 w-max mx-auto">
                                {navLinks.filter(link => link.path !== '/').map((link) => {
                                    const active = isActive(link.path);
                                    return (
                                        <Link
                                            key={link.name}
                                            to={link.path}
                                            className={`px-4 py-2 rounded-full text-[14px] font-bold transition-all duration-300 cursor-pointer ${
                                                active 
                                                    ? 'text-white bg-slate-900 shadow-md ring-1 ring-slate-800' 
                                                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 ring-1 ring-transparent hover:ring-slate-200/50'
                                            }`}
                                        >
                                            {link.name}
                                        </Link>
                                    );
                                })}
                            </div>
                        </>
                    )}

                    
                    <div className={`${isAuthPage ? 'ml-auto' : 'justify-self-end pl-6 lg:pl-8'} hidden md:flex items-center gap-3`}>
                        {isAuthPage ? (
                            <div className="flex items-center gap-3">
                                <Link to="/" className="text-sm font-semibold text-slate-500 transition-colors hover:text-slate-900">
                                    Back to Home
                                </Link>
                                {location.pathname === '/login' ? (
                                    <Link to="/signup" className="focus:outline-none">
                                        <Button variant="outline" className="h-[40px] rounded-xl px-5 text-[14px] font-bold leading-none transition-all duration-300 hover:shadow-sm">
                                            Sign Up
                                        </Button>
                                    </Link>
                                ) : (
                                    <Link to="/login" className="focus:outline-none">
                                        <Button variant="outline" className="h-[40px] rounded-xl px-5 text-[14px] font-bold leading-none transition-all duration-300 hover:shadow-sm">
                                            Log in
                                        </Button>
                                    </Link>
                                )}
                            </div>
                        ) : user ? (
                            <div className="flex items-center gap-3">
                                <Link to="/student/dashboard" className="focus:outline-none">
                                    <Button variant="outline" className="font-semibold text-sm h-10 px-5 rounded-xl hover:bg-slate-50 border-slate-200">
                                        Dashboard
                                    </Button>
                                </Link>
                                <Button 
                                    variant="ghost" 
                                    className="text-slate-600 text-sm h-10 px-4 rounded-xl hover:text-red-600 hover:bg-red-50 font-semibold transition-colors" 
                                    onClick={handleLogout}
                                >
                                    Logout
                                </Button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2">
                                <Link to="/login" className="focus:outline-none">
                                    <Button variant="ghost" className="text-slate-500 text-[14px] leading-none h-[40px] px-5 rounded-xl hover:text-slate-900 hover:bg-slate-100 font-bold transition-all duration-300 hover:shadow-sm">
                                        Log in
                                    </Button>
                                </Link>
                                <Link to="/signup" className="focus:outline-none">
                                    <Button className="font-bold text-[14px] leading-none h-[40px] px-6 rounded-xl bg-gradient-to-r from-primary to-blue-600 text-white shadow-[0_8px_20px_-8px_rgba(59,130,246,0.6)] hover:shadow-[0_12px_25px_-8px_rgba(59,130,246,0.8)] hover:-translate-y-0.5 border border-white/20 transition-all duration-300 flex items-center gap-2 group">
                                        Get Started
                                        <svg className="w-3.5 h-3.5 text-white/70 group-hover:text-white group-hover:translate-x-0.5 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </div>

                    
                    <div className="flex items-center md:hidden">
                        <button
                            onClick={toggleMenu}
                            type="button"
                            className="inline-flex items-center justify-center p-2 rounded-md text-slate-500 hover:text-slate-900 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary transition-colors"
                            aria-expanded={isOpen}
                            aria-label="Toggle navigation menu"
                        >
                            <span className="sr-only">Open main menu</span>
                            {isOpen ? (
                                <X className="block h-6 w-6" aria-hidden="true" />
                            ) : (
                                <Menu className="block h-6 w-6" aria-hidden="true" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            
            <div 
                className={`md:hidden absolute top-full left-0 w-full bg-white border-b border-gray-200 shadow-lg transition-all duration-300 origin-top overflow-hidden ${
                    isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
                }`}
            >
                <div className="px-4 pt-4 pb-6 space-y-2 bg-white">
                    {!isAuthPage && navLinks.map((link) => {
                        const active = isActive(link.path);
                        return (
                            <Link
                                key={link.name}
                                to={link.path}
                                className={`block px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                                    active
                                        ? 'bg-primary/10 text-primary'
                                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 hover:pl-5'
                                }`}
                            >
                                {link.name}
                            </Link>
                        );
                    })}
                    
                    
                    <div className="pt-6 pb-2 border-t border-gray-100 mt-6 space-y-3 px-2">
                        {isAuthPage ? (
                            <>
                                <Link to="/" className="block text-center text-slate-600 font-medium mb-4">
                                    Back to Home
                                </Link>
                                {location.pathname === '/login' ? (
                                    <Link to="/signup" className="block focus:outline-none">
                                        <Button variant="outline" className="w-full justify-center">
                                            Sign Up
                                        </Button>
                                    </Link>
                                ) : (
                                    <Link to="/login" className="block focus:outline-none">
                                        <Button variant="outline" className="w-full justify-center">
                                            Log in
                                        </Button>
                                    </Link>
                                )}
                            </>
                        ) : user ? (
                            <>
                                <Link to="/student/dashboard" className="block focus:outline-none">
                                    <Button variant="outline" className="w-full justify-center">
                                        Dashboard
                                    </Button>
                                </Link>
                                <Button 
                                    variant="ghost" 
                                    className="w-full justify-center text-red-600 hover:bg-red-50 hover:text-red-700" 
                                    onClick={handleLogout}
                                >
                                    Logout
                                </Button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="block focus:outline-none">
                                    <Button variant="outline" className="w-full justify-center">
                                        Login
                                    </Button>
                                </Link>
                                <Link to="/signup" className="block focus:outline-none">
                                    <Button className="w-full justify-center shadow-sm hover:shadow-md transition-shadow">
                                        Get Started
                                    </Button>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
