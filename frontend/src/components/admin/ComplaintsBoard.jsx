import React, { useState } from 'react';
import Badge from '../common/Badge';
import Button from '../common/Button';
import { Filter, Search, Download, Clock, Wrench, MessageSquare, CheckCircle2 } from 'lucide-react';

const mockComplaints = [
    {
        id: "CMP-201",
        title: "Fan regulator not working",
        studentName: "Priya Singh",
        roomNumber: "B-104",
        category: "Maintenance",
        priority: "High",
        status: "In Progress",
        submittedAt: "2026-03-31"
    },
    {
        id: "CMP-202",
        title: "AC cooling issue",
        studentName: "Aarav Sharma",
        roomNumber: "A-203",
        category: "Appliance",
        priority: "Medium",
        status: "Pending",
        submittedAt: "2026-03-31"
    },
    {
        id: "CMP-200",
        title: "Internet disconnects frequently",
        studentName: "Rahul M",
        roomNumber: "A-105",
        category: "Network",
        priority: "Low",
        status: "Resolved",
        submittedAt: "2026-03-29"
    }
];

const ComplaintsBoard = () => {
    const [complaints] = useState(mockComplaints);

    const getStatusStyle = (status) => {
        switch(status) {
            case 'Resolved': return <Badge variant="green" className="flex items-center gap-1.5"><CheckCircle2 size={12}/> Resolved</Badge>;
            case 'Pending': return <Badge variant="yellow" className="flex items-center gap-1.5"><Clock size={12}/> Pending</Badge>;
            case 'In Progress': return <Badge variant="blue" className="flex items-center gap-1.5"><Wrench size={12}/> In Progress</Badge>;
            default: return <Badge variant="gray">{status}</Badge>;
        }
    };

    const getPriorityStyle = (priority) => {
        switch(priority) {
            case 'High': return 'text-rose-600 bg-rose-50';
            case 'Medium': return 'text-amber-600 bg-amber-50';
            case 'Low': return 'text-slate-600 bg-slate-50';
            default: return 'text-slate-600 bg-slate-50';
        }
    };

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {complaints.map((complaint) => (
                    <div key={complaint.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                        
                        
                        <div className="flex justify-between items-start mb-3">
                            <div className="flex flex-col">
                                <span className="text-xs font-semibold text-slate-400">{complaint.id} • {complaint.submittedAt}</span>
                                <h3 className="text-sm font-bold text-slate-900 mt-1 pr-4">{complaint.title}</h3>
                            </div>
                            {getStatusStyle(complaint.status)}
                        </div>

                        
                         <div className="flex items-center justify-between text-sm mt-4">
                             <div className="flex flex-col">
                                 <span className="text-slate-500 font-medium">{complaint.studentName}</span>
                                 <span className="text-slate-400 text-xs">Room {complaint.roomNumber}</span>
                             </div>
                             
                             <div className="flex flex-col items-end">
                                <span className="text-xs font-semibold text-slate-500">{complaint.category}</span>
                                <span className={`text-[10px] uppercase tracking-wider font-bold px-1.5 py-0.5 mt-1 rounded ${getPriorityStyle(complaint.priority)}`}>
                                    {complaint.priority}
                                </span>
                             </div>
                         </div>
                        
                        
                         <div className="mt-5 pt-4 border-t border-slate-100 flex gap-2">
                             {complaint.status !== 'Resolved' && (
                                <Button size="sm" variant="primary" className="flex-1 text-xs">Update Status</Button>
                             )}
                             <Button size="sm" variant="secondary" className="flex-1 text-xs">View Thread</Button>
                         </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ComplaintsBoard;
