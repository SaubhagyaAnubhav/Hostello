import React from 'react';

const MetricCard = ({ title, value, icon: Icon, trendStr, isPositive, subtitle }) => {
    return (
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 relative overflow-hidden flex flex-col justify-between">
            <div className="flex justify-between items-start mb-4">
                <h3 className="text-sm font-medium text-slate-500 max-w-[70%] leading-tight">
                    {title}
                </h3>
                <div className="p-2 bg-indigo-50 rounded-lg shrink-0">
                    <Icon className="text-indigo-600" size={20} />
                </div>
            </div>
            
            <div>
                <div className="text-3xl font-bold text-slate-900 tracking-tight mb-1">
                    {value}
                </div>
                
                <div className="flex items-center gap-2 mt-2">
                    {trendStr && (
                        <span className={`text-xs font-semibold px-1.5 py-0.5 rounded-md ${isPositive ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                            {trendStr}
                        </span>
                    )}
                    {subtitle && (
                        <span className="text-xs text-slate-500 font-medium">
                            {subtitle}
                        </span>
                    )}
                </div>
            </div>
            
            
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-indigo-50/50 rounded-full blur-2xl pointer-events-none"></div>
        </div>
    );
};

export default MetricCard;
