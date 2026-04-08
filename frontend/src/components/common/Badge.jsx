import React from 'react';

const Badge = ({ children, variant = 'gray', className = '' }) => {
    const variants = {
        gray: "bg-slate-100 text-slate-700 border border-slate-200",
        green: "bg-emerald-50 text-emerald-700 border border-emerald-200",
        red: "bg-rose-50 text-rose-700 border border-rose-200",
        yellow: "bg-amber-50 text-amber-700 border border-amber-200",
        indigo: "bg-indigo-50 text-indigo-700 border border-indigo-200",
        blue: "bg-sky-50 text-sky-700 border border-sky-200",
    };

    return (
        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${variants[variant]} ${className}`}>
            {children}
        </span>
    );
};

export default Badge;
