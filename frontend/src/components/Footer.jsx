import { Link } from 'react-router-dom';
import {
    Github,
    Linkedin,
    Mail,
    MapPin,
    Building2,
    Utensils,
    ShieldCheck
} from 'lucide-react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const footerLinks = {
        platform: [
            { name: 'Hostels & Rooms', path: '/hostels' },
            { name: 'Facilities Overview', path: '/facilities' },
            { name: 'Food & Dining', path: '/food-menu' },
            { name: 'Student Dashboard', path: '/student/dashboard' }
        ],
        resources: [
            { name: 'Help Center & FAQs', path: '/help' },
            { name: 'Rules & Regulations', path: '/rules' },
            { name: 'Report an Issue', path: '/support' },
            { name: 'Campus Map', path: '/map' }
        ],
        legal: [
            { name: 'Privacy Policy', path: '/privacy' },
            { name: 'Terms of Service', path: '/terms' },
            { name: 'Code of Conduct', path: '/conduct' }
        ]
    };

    const productTags = [
        { icon: Building2, label: 'Student Housing' },
        { icon: Utensils, label: 'Dining Operations' },
        { icon: ShieldCheck, label: 'Resident Support' }
    ];

    const socialLinks = [
        {
            name: 'GitHub',
            href: '#',
            icon: Github
        },
        {
            name: 'LinkedIn',
            href: '#',
            icon: Linkedin
        }
    ];

    return (
        <footer className="relative mt-auto overflow-hidden border-t border-white/5 bg-slate-950">
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute left-1/2 top-0 h-[340px] w-[900px] -translate-x-1/2 bg-[radial-gradient(circle,rgba(37,99,235,0.14),transparent_62%)]" />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.012)_1px,transparent_1px)] bg-[size:44px_44px] opacity-10 [mask-image:radial-gradient(ellipse_at_top,black_35%,transparent_75%)]" />
            </div>

            <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-12 py-14 md:py-16 lg:grid-cols-12 lg:gap-10">
                    <div className="lg:col-span-5 lg:pr-10">
                        <Link
                            to="/"
                            className="inline-flex items-end rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-950"
                            aria-label="Hostello Home"
                        >
                            <span className="bg-gradient-to-br from-blue-500 via-blue-400 to-indigo-500 bg-clip-text text-3xl font-black tracking-[-0.07em] text-transparent md:text-4xl">
                                Hostello
                            </span>
                            
                        </Link>

                        <p className="mt-6 max-w-md text-[16px] leading-8 text-slate-400">
                            Modern hostel management for student housing, room operations,
                            dining, and resident support.
                        </p>

                        <div className="mt-6 flex flex-wrap gap-2">
                            {productTags.map((tag) => {
                                const Icon = tag.icon;
                                return (
                                    <span
                                        key={tag.label}
                                        className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[11px] font-medium text-slate-300 backdrop-blur-sm"
                                    >
                                        <Icon className="h-3.5 w-3.5 text-blue-400" />
                                        {tag.label}
                                    </span>
                                );
                            })}
                        </div>

                        <div className="mt-6 flex items-center gap-3">
                            {socialLinks.map((item) => {
                                const Icon = item.icon;

                                return (
                                    <a
                                        key={item.name}
                                        href={item.href}
                                        aria-label={item.name}
                                        className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-slate-400 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/15 hover:bg-white/[0.07] hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <Icon className="h-4.5 w-4.5" />
                                    </a>
                                );
                            })}
                        </div>
                    </div>

                    <div className="lg:col-span-7 grid grid-cols-2 gap-10 sm:grid-cols-3">
                        <div>
                            <h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.22em] text-white/85">
                                Platform
                            </h3>
                            <ul className="space-y-3.5">
                                {footerLinks.platform.map((link) => (
                                    <li key={link.name}>
                                        <Link
                                            to={link.path}
                                            className="inline-flex text-[15px] text-slate-400 transition-all duration-200 hover:translate-x-0.5 hover:text-white"
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.22em] text-white/85">
                                Resources
                            </h3>
                            <ul className="space-y-3.5">
                                {footerLinks.resources.map((link) => (
                                    <li key={link.name}>
                                        <Link
                                            to={link.path}
                                            className="inline-flex text-[15px] text-slate-400 transition-all duration-200 hover:translate-x-1 hover:text-white"
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.22em] text-white/85">
                                Legal
                            </h3>
                            <ul className="space-y-3.5">
                                {footerLinks.legal.map((link) => (
                                    <li key={link.name}>
                                        <Link
                                            to={link.path}
                                            className="inline-flex text-[15px] text-slate-400 transition-all duration-200 hover:translate-x-1 hover:text-white"
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-5 border-t border-white/8 py-6 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
                    <p>
                        © {currentYear} Hostello. Built for modern student living.
                    </p>

                    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-6">
                        <a
                            href="mailto:admin@adypu.edu.in"
                            className="inline-flex items-center gap-2 transition-colors hover:text-white"
                        >
                            <Mail className="h-4 w-4 text-slate-500" />
                            admin@adypu.edu.in
                        </a>

                        <div className="inline-flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-slate-500" />
                            Lohegaon, Pune
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;