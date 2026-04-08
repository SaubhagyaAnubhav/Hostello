import React, { useState } from 'react';
import Badge from '../common/Badge';
import Button from '../common/Button';
import { MoreVertical, Edit, CheckCircle, ShieldAlert, UserX } from 'lucide-react';

const mockStudents = [
    {
        id: "STU-1024",
        name: "Aarav Sharma",
        email: "aarav@college.edu",
        phone: "+91 9876543210",
        roomNumber: "A-203",
        hostelName: "Your Space 1",
        verificationStatus: "Pending",
        paymentStatus: "Paid",
        complaintCount: 2,
        status: "Active"
    },
    {
        id: "STU-1025",
        name: "Priya Singh",
        email: "priya.s@college.edu",
        phone: "+91 9123456780",
        roomNumber: "B-104",
        hostelName: "Your Space 2",
        verificationStatus: "Verified",
        paymentStatus: "Overdue",
        complaintCount: 0,
        status: "Active"
    },
    {
        id: "STU-1026",
        name: "Rahul M",
        email: "rahul.m@college.edu",
        phone: "+91 9988776655",
        roomNumber: "A-105",
        hostelName: "Your Space 1",
        verificationStatus: "Verified",
        paymentStatus: "Paid",
        complaintCount: 1,
        status: "Active"
    },
    {
        id: "STU-1027",
        name: "Neha Gupta",
        email: "neha@college.edu",
        phone: "+91 9876501234",
        roomNumber: "C-301",
        hostelName: "Your Space 3",
        verificationStatus: "Rejected",
        paymentStatus: "Paid",
        complaintCount: 0,
        status: "Inactive"
    }
];

const StudentsTable = () => {
    const [students] = useState(mockStudents);

    const getVerificationBadge = (status) => {
        switch(status) {
            case 'Verified': return <Badge variant="green">{status}</Badge>;
            case 'Pending': return <Badge variant="yellow">{status}</Badge>;
            case 'Rejected': return <Badge variant="red">{status}</Badge>;
            default: return <Badge variant="gray">{status}</Badge>;
        }
    };

    const getPaymentBadge = (status) => {
        return status === 'Paid' ? <Badge variant="green">Paid</Badge> : <Badge variant="red">Overdue</Badge>;
    };

    return (
        <div className="overflow-x-auto w-full">
            <table className="w-full text-left border-collapse min-w-[800px]">
                <thead>
                    <tr className="border-b border-slate-200 bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                        <th className="px-6 py-4 font-semibold rounded-tl-xl">Student Info</th>
                        <th className="px-6 py-4 font-semibold">Room & Hostel</th>
                        <th className="px-6 py-4 font-semibold">Verification</th>
                        <th className="px-6 py-4 font-semibold">Payment</th>
                        <th className="px-6 py-4 font-semibold text-center">Complaints</th>
                        <th className="px-6 py-4 font-semibold text-right rounded-tr-xl">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {students.map((student) => (
                        <tr key={student.id} className="hover:bg-slate-50/50 transition-colors group">
                            <td className="px-6 py-4">
                                <div className="flex flex-col">
                                    <span className="font-semibold text-slate-900">{student.name}</span>
                                    <span className="text-xs text-slate-500">{student.id} | {student.email}</span>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex flex-col">
                                    <span className="text-sm font-medium text-slate-900">{student.roomNumber}</span>
                                    <span className="text-xs text-slate-500">{student.hostelName}</span>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                {getVerificationBadge(student.verificationStatus)}
                            </td>
                            <td className="px-6 py-4">
                                {getPaymentBadge(student.paymentStatus)}
                            </td>
                            <td className="px-6 py-4 text-center">
                                {student.complaintCount > 0 ? (
                                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-amber-100 text-amber-700 text-xs font-bold">
                                        {student.complaintCount}
                                    </span>
                                ) : (
                                    <span className="text-slate-400 text-sm">-</span>
                                )}
                            </td>
                            <td className="px-6 py-4 text-right">
                                <Button variant="ghost" size="sm" className="hidden group-hover:inline-flex mr-2 text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100">
                                    View Details
                                </Button>
                                <button className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors">
                                    <MoreVertical size={18} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default StudentsTable;
