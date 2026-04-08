import React from 'react';

export const Card = ({ children, className = '' }) => {
    return (
        <div className={`bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden ${className}`}>
            {children}
        </div>
    );
};

export const CardHeader = ({ title, subtitle, action, className = '' }) => {
    return (
        <div className={`px-6 py-5 border-b border-slate-100 flex justify-between items-start md:items-center flex-col md:flex-row gap-4 ${className}`}>
            <div>
                {title && <h3 className="text-lg font-bold text-slate-900 tracking-tight">{title}</h3>}
                {subtitle && <p className="text-sm text-slate-500 mt-1">{subtitle}</p>}
            </div>
            {action && (
                <div className="shrink-0">{action}</div>
            )}
        </div>
    );
};

export const CardContent = ({ children, className = '' }) => {
    return (
        <div className={`p-6 ${className}`}>
            {children}
        </div>
    );
};

export default Card;
