import React from 'react';
import Button from './Button';

const EmptyState = ({ 
    icon: Icon, 
    title, 
    description, 
    actionLabel, 
    onAction 
}) => {
    return (
        <div className="flex flex-col items-center justify-center p-8 text-center min-h-[300px] bg-white rounded-2xl border border-dashed border-slate-300">
            {Icon && (
                <div className="p-4 bg-slate-50 rounded-full mb-4">
                    <Icon size={32} className="text-slate-400" />
                </div>
            )}
            <h3 className="text-lg font-bold text-slate-900 tracking-tight mb-2">{title}</h3>
            <p className="text-sm text-slate-500 max-w-sm mb-6">{description}</p>
            {actionLabel && onAction && (
                <Button variant="secondary" onClick={onAction}>
                    {actionLabel}
                </Button>
            )}
        </div>
    );
};

export default EmptyState;
