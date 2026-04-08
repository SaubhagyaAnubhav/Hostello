import React, { useState } from 'react';
import Badge from '../common/Badge';
import Button from '../common/Button';
import { ExternalLink, Check, X, Clock, FileText, UploadCloud, AlertCircle } from 'lucide-react';

const mockVerifications = [
    {
        id: "VER-8902",
        studentName: "Sneha Kapoor",
        requestType: "Room Assignment",
        details: "Requested Room A-203 upgrade",
        submittedAt: "2 hours ago",
        status: "Pending",
        urgent: true
    },
    {
        id: "VER-8901",
        studentName: "Vikram Dev",
        requestType: "ID Verification",
        details: "Uploaded college ID card and Aadhar",
        submittedAt: "1 day ago",
        status: "Pending",
        urgent: false
    },
    {
        id: "VER-8900",
        studentName: "Ananya Desai",
        requestType: "Fee Waiver",
        details: "Scholarship allocation document",
        submittedAt: "2 days ago",
        status: "Resubmission",
        urgent: false
    }
];

const VerificationQueue = () => {
    const [queue] = useState(mockVerifications);

    const getIconForType = (type) => {
        if (type.includes("ID")) return <FileText className="text-indigo-600" size={18}/>;
        if (type.includes("Room")) return <AlertCircle className="text-amber-600" size={18}/>;
        return <UploadCloud className="text-emerald-600" size={18}/>;
    };

    return (
        <div className="grid gap-4">
            {queue.map((item) => (
                <div key={item.id} className="bg-white rounded-2xl border border-slate-200 p-5 flex flex-col lg:flex-row gap-5 lg:items-center justify-between shadow-sm hover:shadow-md transition-shadow group">
                    
            
                    <div className="flex gap-4 items-start lg:w-1/2">
                        <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl shrink-0 mt-1 shadow-inner">
                            {getIconForType(item.requestType)}
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <div className="flex items-center gap-3">
                                <h3 className="font-bold text-slate-900 tracking-tight">{item.studentName}</h3>
                                {item.urgent && <Badge variant="red" className="animate-pulse">Urgent</Badge>}
                                {item.status === 'Resubmission' && <Badge variant="yellow">Awaiting Resubmission</Badge>}
                            </div>
                            <p className="text-sm font-semibold text-slate-700">{item.requestType}</p>
                            <p className="text-xs text-slate-500 line-clamp-1">{item.details}</p>
                        </div>
                    </div>

                    
                    <div className="flex flex-col lg:items-center gap-1.5 lg:w-1/4 border-t lg:border-t-0 lg:border-l border-slate-100 pt-4 lg:pt-0 lg:pl-6">
                        <span className="text-xs font-semibold text-slate-400 tracking-wide uppercase">Submitted</span>
                        <span className="text-sm font-medium flex items-center gap-1.5 text-slate-700">
                            <Clock size={14} className="text-slate-400"/> {item.submittedAt}
                        </span>
                        <span className="text-[10px] text-slate-400 mt-1 font-mono">{item.id}</span>
                    </div>

                    
                    <div className="flex gap-2 w-full lg:w-auto justify-end border-t border-slate-100 lg:border-none pt-4 lg:pt-0 shrink-0">
                        <Button variant="secondary" size="icon" className="text-green-600 hover:text-green-700 hover:bg-green-50 hover:border-green-200 delay-75 transition-colors">
                            <Check size={18}/>
                        </Button>
                        <Button variant="secondary" size="icon" className="text-rose-600 hover:text-rose-700 hover:bg-rose-50 hover:border-rose-200 delay-75 transition-colors">
                            <X size={18}/>
                        </Button>
                        <Button variant="secondary" size="sm" className="hidden sm:flex text-slate-600 ml-2" leftIcon={ExternalLink}>
                            Review Documents
                        </Button>
                    </div>

                </div>
            ))}
        </div>
    );
};

export default VerificationQueue;
