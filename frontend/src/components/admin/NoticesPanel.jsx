import React, { useState } from 'react';
import Badge from '../common/Badge';
import Button from '../common/Button';
import { Megaphone, Calendar, Users, Eye, Archive, Pin, MoreHorizontal } from 'lucide-react';

const mockNotices = [
    {
        id: "NOT-11",
        title: "Water supply maintenance",
        audience: "All Students",
        publishStatus: "Published",
        createdAt: "2026-03-30",
        isPinned: true
    },
    {
        id: "NOT-12",
        title: "Hostel Fee Submission Deadline",
        audience: "Block A & C",
        publishStatus: "Draft",
        createdAt: "2026-03-31",
        isPinned: false
    },
    {
        id: "NOT-10",
        title: "Upcoming Holi Celebration Details",
        audience: "All Students",
        publishStatus: "Archived",
        createdAt: "2026-03-15",
        isPinned: false
    }
];

const NoticesPanel = () => {
    const [notices] = useState(mockNotices);

    const getStatusStyle = (status) => {
        switch(status) {
            case 'Published': return <Badge variant="green">Live</Badge>;
            case 'Draft': return <Badge variant="yellow">Draft</Badge>;
            case 'Archived': return <Badge variant="gray">Archived</Badge>;
            default: return <Badge variant="gray">{status}</Badge>;
        }
    };

    return (
        <div className="flex flex-col gap-4">
            {notices.map((notice) => (
                <div key={notice.id} className={`bg-white p-5 rounded-2xl border ${notice.isPinned ? 'border-indigo-300 ring-1 ring-indigo-50/50 shadow-sm' : 'border-slate-200'} transition-all hover:shadow-md flex flex-col md:flex-row gap-5 items-start md:items-center justify-between group`}>
                    
                    
                    <div className="flex gap-4 items-start w-full md:w-auto">
                        <div className={`p-3 rounded-xl shrink-0 mt-1 flex text-indigo-700 ${notice.isPinned ? 'bg-indigo-100' : 'bg-slate-50 text-slate-500'}`}>
                            {notice.isPinned ? <Pin size={20}/> : <Megaphone size={20}/>}
                        </div>
                        <div className="flex flex-col gap-1 w-full">
                            <div className="flex justify-between md:justify-start items-center gap-3">
                                <h3 className="text-base font-bold text-slate-900 tracking-tight">{notice.title}</h3>
                                {getStatusStyle(notice.publishStatus)}
                            </div>
                            <div className="flex flex-wrap items-center text-xs font-semibold text-slate-500 gap-3 mt-1">
                                <span className="flex items-center gap-1.5"><Calendar size={13} className="text-slate-400"/> {notice.createdAt}</span>
                                <span className="flex items-center gap-1.5"><Users size={13} className="text-slate-400"/> {notice.audience}</span>
                            </div>
                        </div>
                    </div>

                    
                    <div className="flex items-center gap-2 md:gap-3 ml-14 md:ml-0 shrink-0 mt-4 md:mt-0 w-full md:w-auto justify-end border-t border-slate-100 md:border-0 pt-4 md:pt-0">
                        {notice.publishStatus === 'Draft' ? (
                            <Button variant="primary" size="sm" className="w-full md:w-auto text-xs px-5">Publish</Button>
                        ) : (
                            <Button variant="secondary" size="sm" className="w-full md:w-auto text-xs"><Eye size={14} className="mr-1.5"/>View Metrics</Button>
                        )}
                        <button className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors border border-transparent hover:border-slate-200 ml-2">
                             <MoreHorizontal size={18}/>
                        </button>
                    </div>

                </div>
            ))}
        </div>
    );
};

export default NoticesPanel;
