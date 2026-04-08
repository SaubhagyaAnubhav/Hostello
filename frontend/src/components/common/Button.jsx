import React from 'react';

const Button = ({ 
    children, 
    variant = 'primary', 
    size = 'md', 
    className = '', 
    disabled = false,
    leftIcon: LeftIcon,
    rightIcon: RightIcon,
    ...props 
}) => {
    const baseStyle = "inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
    
    const variants = {
        primary: "bg-indigo-600 hover:bg-indigo-700 text-white focus:ring-indigo-500 shadow-sm",
        secondary: "bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 focus:ring-slate-500 shadow-sm",
        danger: "bg-red-600 hover:bg-red-700 text-white focus:ring-red-500 shadow-sm",
        ghost: "bg-transparent text-slate-600 hover:bg-slate-100 focus:ring-slate-500",
    };

    const sizes = {
        sm: "px-3 py-1.5 text-xs rounded-md",
        md: "px-4 py-2 text-sm rounded-lg",
        lg: "px-6 py-3 text-base rounded-xl",
        icon: "p-2 rounded-lg",
    };

    return (
        <button 
            className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${className}`}
            disabled={disabled}
            {...props}
        >
            {LeftIcon && <LeftIcon className={`shrink-0 ${children ? 'mr-2' : ''}`} size={size === 'sm' ? 14 : 18} />}
            {children}
            {RightIcon && <RightIcon className={`shrink-0 ${children ? 'ml-2' : ''}`} size={size === 'sm' ? 14 : 18} />}
        </button>
    );
};

export default Button;
