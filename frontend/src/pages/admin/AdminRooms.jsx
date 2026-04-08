import React, { useState } from 'react';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import { DoorOpen, Columns, Users, LayoutDashboard, Plus } from 'lucide-react';

const mockRooms = [
    { id: "R-101", block: "Block A", capacity: 2, currentOccupancy: 2, status: "Full" },
    { id: "R-102", block: "Block A", capacity: 2, currentOccupancy: 1, status: "Available" },
    { id: "R-103", block: "Block A", capacity: 1, currentOccupancy: 0, status: "Maintenance" },
    { id: "R-201", block: "Block B", capacity: 3, currentOccupancy: 3, status: "Full" },
    { id: "R-202", block: "Block B", capacity: 3, currentOccupancy: 1, status: "Available" },
];

const AdminRooms = () => {
    const [rooms] = useState(mockRooms);

    const getStatusBadge = (status) => {
        switch(status) {
            case 'Full': return <Badge variant="gray">Full</Badge>;
            case 'Available': return <Badge variant="green">Available</Badge>;
            case 'Maintenance': return <Badge variant="red">Maintenance</Badge>;
            default: return <Badge variant="gray">{status}</Badge>;
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Room Management</h1>
                    <p className="text-slate-500 text-sm mt-1">Manage hostel blocks, room availability, and occupancy.</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="primary" leftIcon={Plus}>
                        Add Room
                    </Button>
                </div>
            </div>

    
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {rooms.map((room) => (
                    <div key={room.id} className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                        <div className="flex justify-between items-center mb-3">
                            <span className="font-bold text-slate-900 tracking-tight">{room.id}</span>
                            {getStatusBadge(room.status)}
                        </div>
                        <div className="flex flex-col gap-2 relative z-10 text-sm text-slate-600">
                            <span className="flex items-center gap-2"><Columns size={14} className="text-slate-400"/> {room.block}</span>
                            <span className="flex items-center gap-2"><Users size={14} className="text-slate-400"/> Occupancy: {room.currentOccupancy}/{room.capacity}</span>
                        </div>
                        
                        
                        <div 
                            className={`absolute bottom-0 left-0 h-1 transition-all ${room.status === 'Full' ? 'bg-slate-300' : room.status === 'Available' ? 'bg-emerald-400' : 'bg-rose-400'}`} 
                            style={{ width: `${(room.currentOccupancy / room.capacity) * 100}%` }}
                        />
                    </div>
                ))}
            </div>

            
             <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 flex flex-col items-center justify-center text-slate-400 min-h-[300px]">
                <LayoutDashboard size={40} className="mb-4 opacity-50 text-slate-300" />
                <p className="text-lg font-medium text-slate-600">Detailed Allocation List</p>
                <p className="text-sm">Filter, search, and assign students to rooms.</p>
            </div>
            
        </div>
    );
};

export default AdminRooms;
