import React, { useState } from 'react';
import StudentsTable from '../../components/admin/StudentsTable';
import Button from '../../components/common/Button';
import { Search, Filter, Download } from 'lucide-react';

const AdminStudents = () => {
    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Student Management</h1>
                    <p className="text-slate-500 text-sm mt-1">Manage all registered students, room assignments, and statuses.</p>
                </div>
                <div className="flex gap-3 w-full sm:w-auto">
                    <Button variant="secondary" leftIcon={Download} className="w-full sm:w-auto">
                        Export CSV
                    </Button>
                    <Button variant="primary" className="w-full sm:w-auto">
                        Add New Student
                    </Button>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
                
                <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row gap-4 justify-between items-center bg-slate-50/50">
                    <div className="relative w-full sm:w-72">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                            <Search size={16} />
                        </div>
                        <input 
                            type="text"
                            placeholder="Search by name, ID, or room..."
                            className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-shadow"
                        />
                    </div>
                    <div className="flex gap-2 w-full sm:w-auto">
                        <Button variant="secondary" size="sm" leftIcon={Filter}>
                            Filters
                        </Button>
                    </div>
                </div>

                
                <StudentsTable />

               
                <div className="p-4 border-t border-slate-200 flex items-center justify-between text-sm text-slate-600">
                    <div>Showing <span className="font-medium text-slate-900">1</span> to <span className="font-medium text-slate-900">4</span> of <span className="font-medium text-slate-900">1,248</span> students</div>
                    <div className="flex gap-2">
                        <Button variant="secondary" size="sm" disabled>Previous</Button>
                        <Button variant="secondary" size="sm">Next</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminStudents;
