import React from 'react';

const LoadingSkeleton = ({ count = 3, type = 'card' }) => {
    
    if (type === 'table') {
        return (
            <div className="w-full bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                <div className="p-4 border-b border-slate-100 bg-slate-50 animate-pulse">
                    <div className="h-6 bg-slate-200 rounded w-1/4"></div>
                </div>
                <div className="divide-y divide-slate-100">
                    {[...Array(count)].map((_, i) => (
                        <div key={i} className="p-4 flex justify-between items-center animate-pulse">
                            <div className="flex flex-col gap-2 w-1/3">
                                <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                                <div className="h-3 bg-slate-100 rounded w-1/2"></div>
                            </div>
                            <div className="h-4 bg-slate-200 rounded w-1/6"></div>
                            <div className="h-8 bg-slate-200 rounded w-16"></div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(count)].map((_, i) => (
                <div key={i} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm animate-pulse">
                    <div className="flex justify-between mb-4">
                        <div className="flex flex-col gap-2 w-1/2">
                            <div className="h-3 bg-slate-200 rounded w-1/2"></div>
                            <div className="h-5 bg-slate-300 rounded w-full mt-1"></div>
                        </div>
                        <div className="w-10 h-10 bg-slate-100 rounded-full"></div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default LoadingSkeleton;
