import React, { useState } from 'react';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import { IndianRupee, Download, AlertCircle, FileText } from 'lucide-react';

const mockPayments = [
    { id: "PAY-10023", studentName: "Aarav Sharma", amount: "₹45,000", type: "Semester Fee", status: "Paid", date: "2026-03-15" },
    { id: "PAY-10024", studentName: "Priya Singh", amount: "₹45,000", type: "Semester Fee", status: "Overdue", date: "2026-03-10" },
    { id: "PAY-10025", studentName: "Rahul M", amount: "₹5,000", type: "Mess Deposit", status: "Paid", date: "2026-03-20" },
    { id: "PAY-10026", studentName: "Neha Gupta", amount: "₹45,000", type: "Semester Fee", status: "Pending", date: "2026-03-29" },
];

const AdminPayments = () => {
    const [payments] = useState(mockPayments);

    const getStatusBadge = (status) => {
        switch(status) {
            case 'Paid': return <Badge variant="green">Paid</Badge>;
            case 'Pending': return <Badge variant="yellow">Pending</Badge>;
            case 'Overdue': return <Badge variant="red" className="animate-pulse">Overdue</Badge>;
            default: return <Badge variant="gray">{status}</Badge>;
        }
    };

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                    <h3 className="text-sm font-medium text-slate-500 mb-2">Total Collection (YTD)</h3>
                    <div className="text-3xl font-bold text-slate-900 tracking-tight">₹42.5L</div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-indigo-200 bg-indigo-50/30 ring-1 ring-indigo-50">
                    <h3 className="text-sm font-medium text-indigo-700 mb-2">Pending Dues</h3>
                    <div className="text-3xl font-bold text-indigo-900 tracking-tight">₹3.2L</div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-rose-200 bg-rose-50/30 ring-1 ring-rose-50">
                    <h3 className="text-sm font-medium text-rose-700 mb-2 flex items-center justify-between">Overdue Amount <AlertCircle size={16}/></h3>
                    <div className="text-3xl font-bold text-rose-900 tracking-tight">₹1.5L</div>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50/50">
                     <h3 className="text-sm font-bold text-slate-900 tracking-tight">Recent Transactions</h3>
                     <Button variant="secondary" size="sm" leftIcon={Download}>Export Ledgers</Button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-slate-200 text-slate-500 text-xs uppercase tracking-wider">
                                <th className="px-6 py-4 font-semibold">Transaction ID</th>
                                <th className="px-6 py-4 font-semibold">Student Name</th>
                                <th className="px-6 py-4 font-semibold">Type</th>
                                <th className="px-6 py-4 font-semibold">Amount</th>
                                <th className="px-6 py-4 font-semibold">Date</th>
                                <th className="px-6 py-4 font-semibold">Status</th>
                                <th className="px-6 py-4 font-semibold text-right">Receipt</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-sm">
                            {payments.map((p) => (
                                <tr key={p.id} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="px-6 py-4 font-mono text-xs text-slate-500">{p.id}</td>
                                    <td className="px-6 py-4 font-medium text-slate-900">{p.studentName}</td>
                                    <td className="px-6 py-4 text-slate-600">{p.type}</td>
                                    <td className="px-6 py-4 font-bold text-slate-900">{p.amount}</td>
                                    <td className="px-6 py-4 text-slate-500">{p.date}</td>
                                    <td className="px-6 py-4">{getStatusBadge(p.status)}</td>
                                    <td className="px-6 py-4 text-right">
                                        <Button variant="ghost" size="sm" className="text-indigo-600"><FileText size={16}/></Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminPayments;
