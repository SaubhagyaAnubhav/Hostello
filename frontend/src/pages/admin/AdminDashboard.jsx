import React from 'react';
import MetricCard from '../../components/admin/MetricCard';
import { 
    Users, DoorOpen, AlertTriangle, 
    IndianRupee, CheckSquare, Activity, UserPlus, Clock
} from 'lucide-react';
import Button from '../../components/common/Button';

const AdminDashboard = () => {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Dashboard Overview</h1>
                    <p className="text-slate-500 text-sm mt-1">Welcome back. Here's what's happening today.</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="secondary">Download Report</Button>
                    <Button variant="primary">Quick Add</Button>
                </div>
            </div>

            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <MetricCard 
                    title="Total Students" 
                    value="1,248" 
                    icon={Users} 
                    trendStr="+12" 
                    isPositive={true}
                    subtitle="this month" 
                />
                <MetricCard 
                    title="Occupied Rooms" 
                    value="842" 
                    icon={DoorOpen} 
                    trendStr="94%" 
                    isPositive={true}
                    subtitle="occupancy rate" 
                />
                <MetricCard 
                    title="Pending Complaints" 
                    value="24" 
                    icon={AlertTriangle} 
                    trendStr="-5" 
                    isPositive={true}
                    subtitle="since yesterday" 
                />
                <MetricCard 
                    title="Overdue Fees" 
                    value="₹1.2L" 
                    icon={IndianRupee} 
                    trendStr="+15%" 
                    isPositive={false}
                    subtitle="vs last month" 
                />
                <MetricCard 
                    title="Pending Verifications" 
                    value="45" 
                    icon={CheckSquare} 
                    trendStr="Action Req." 
                    isPositive={false}
                    subtitle="Waiting approval" 
                />
                <MetricCard 
                    title="Active Notices" 
                    value="8" 
                    icon={Activity} 
                    trendStr="Stable" 
                    isPositive={true}
                    subtitle="Published" 
                />
                <MetricCard 
                    title="Visitor Logs" 
                    value="112" 
                    icon={UserPlus} 
                    trendStr="Today" 
                    isPositive={true}
                    subtitle="Checked in" 
                />
                <MetricCard 
                    title="Leave Passes" 
                    value="36" 
                    icon={Clock} 
                    trendStr="+4" 
                    isPositive={true}
                    subtitle="Pending approval" 
                />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 col-span-2 min-h-[400px]">
                    <h3 className="text-lg font-bold text-slate-900 tracking-tight mb-4">Recent Activity</h3>
                    <div className="flex items-center justify-center h-[300px] text-slate-400">
                        Activity Timeline View Coming Soon...
                    </div>
                </div>

                
                 <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 col-span-1 min-h-[400px]">
                    <h3 className="text-lg font-bold text-slate-900 tracking-tight mb-4">Urgent Actions</h3>
                    <div className="flex flex-col gap-3">
                        <div className="p-4 rounded-xl border border-slate-100 bg-slate-50 flex items-start gap-3">
                            <div className="bg-red-100 p-2 rounded-lg text-red-600 mt-0.5"><AlertTriangle size={16}/></div>
                            <div>
                                <p className="text-sm font-semibold text-slate-900">Water Supply Issue</p>
                                <p className="text-xs text-slate-500 mt-1">Block B - Priority High</p>
                            </div>
                        </div>
                        <div className="p-4 rounded-xl border border-slate-100 bg-slate-50 flex items-start gap-3">
                            <div className="bg-amber-100 p-2 rounded-lg text-amber-600 mt-0.5"><CheckSquare size={16}/></div>
                            <div>
                                <p className="text-sm font-semibold text-slate-900">12 Pending Approvals</p>
                                <p className="text-xs text-slate-500 mt-1">Student KYC documents</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
