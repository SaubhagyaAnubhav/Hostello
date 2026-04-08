import { useEffect, useState } from "react";
import { getAllComplaints, updateComplaintStatus } from "../../services/api";

export default function AdminComplaintsPage() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchComplaints = async () => {
    try {
      setLoading(true);
      const data = await getAllComplaints();
      setComplaints(data);
    } catch (error) {
      console.error("Failed to fetch complaints", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      await updateComplaintStatus(id, { status });
      fetchComplaints();
    } catch (error) {
      console.error("Failed to update complaint", error);
    }
  };

  if (loading) {
    return <div className="p-6">Loading complaints...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-900">Student Complaints</h1>
        <p className="mt-2 text-slate-600">
          Review and manage complaints submitted by students.
        </p>

        <div className="mt-8 grid gap-4">
          {complaints.map((item) => (
            <div key={item._id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex flex-col lg:flex-row lg:justify-between gap-4">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">{item.subject}</h2>
                  <p className="mt-1 text-sm text-slate-500">
                    {item.name} • {item.email} • Room {item.roomNumber}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2 text-xs">
                    <span className="rounded-full bg-slate-100 px-3 py-1">{item.category}</span>
                    <span className="rounded-full bg-slate-100 px-3 py-1">Priority: {item.priority}</span>
                    <span className="rounded-full bg-slate-100 px-3 py-1">Status: {item.status}</span>
                  </div>

                  <p className="mt-4 text-sm text-slate-700">{item.description}</p>
                </div>

                <div className="flex flex-col gap-2 min-w-[180px]">
                  <button
                    onClick={() => handleStatusChange(item._id, "In Progress")}
                    className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white"
                  >
                    Mark In Progress
                  </button>
                  <button
                    onClick={() => handleStatusChange(item._id, "Resolved")}
                    className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-medium text-white"
                  >
                    Mark Resolved
                  </button>
                  <button
                    onClick={() => handleStatusChange(item._id, "Rejected")}
                    className="rounded-xl bg-rose-600 px-4 py-2 text-sm font-medium text-white"
                  >
                    Reject
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}