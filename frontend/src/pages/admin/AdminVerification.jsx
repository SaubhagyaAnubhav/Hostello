import React from 'react';
import VerificationQueue from '../../components/admin/VerificationQueue';
import Button from '../../components/common/Button';
import { ShieldCheck, Filter } from 'lucide-react';

const AdminVerification = () => {
    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-200 relative overflow-hidden">
                <div className="relative z-10">
                    <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Verification Queue</h1>
                    <p className="text-slate-500 text-sm mt-1">Review student KYC, ID cards, and room assignments.</p>
                </div>
                <div className="flex gap-3 relative z-10 w-full sm:w-auto">
                    <Button variant="secondary" leftIcon={Filter} className="w-full sm:w-auto">
                        High Priority First
                    </Button>
                </div>
                
                
                <ShieldCheck size={120} className="absolute -right-4 -bottom-8 text-indigo-50 opacity-[0.03] transform rotate-12 pointer-events-none" />
            </div>

            <VerificationQueue />
        </div>
    );
};

export default AdminVerification;
