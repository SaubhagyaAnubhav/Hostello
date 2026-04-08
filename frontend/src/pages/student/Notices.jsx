import React, { useEffect, useState } from 'react';
import { BellRing, Pin, CalendarDays, AlertTriangle } from 'lucide-react';
import { getStudentNotices } from '../../services/api';

const badgeStyles = {
  Normal: 'bg-slate-100 text-slate-700',
  High: 'bg-amber-50 text-amber-700',
  Urgent: 'bg-red-50 text-red-700',
};

const categoryStyles = {
  General: 'bg-slate-100 text-slate-700',
  Maintenance: 'bg-blue-50 text-blue-700',
  Fee: 'bg-emerald-50 text-emerald-700',
  Food: 'bg-orange-50 text-orange-700',
  Event: 'bg-pink-50 text-pink-700',
  Emergency: 'bg-red-50 text-red-700',
};

const Notices = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchNotices = async () => {
    try {
      setLoading(true);
      const data = await getStudentNotices();
      setNotices(data);
      setError('');
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to load notices');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-700">
            <BellRing className="h-4 w-4" />
            Hostel Notice Board
          </div>

          <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            Notices from your hostel warden
          </h1>

          <p className="mt-3 max-w-3xl text-slate-600 leading-7">
            Stay updated with official announcements, maintenance updates, fee reminders,
            food changes, event information, and urgent hostel communication.
          </p>
        </div>

        {loading ? (
          <div className="mt-6 space-y-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="animate-pulse rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="h-5 w-48 rounded bg-slate-200"></div>
                <div className="mt-4 h-4 w-full rounded bg-slate-200"></div>
                <div className="mt-2 h-4 w-5/6 rounded bg-slate-200"></div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="mt-6 rounded-3xl border border-red-200 bg-red-50 p-6 text-red-700">
            {error}
          </div>
        ) : notices.length === 0 ? (
          <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
            <h3 className="text-xl font-semibold text-slate-900">No notices yet</h3>
            <p className="mt-2 text-slate-600">
              New notices from the hostel warden will appear here.
            </p>
          </div>
        ) : (
          <div className="mt-6 space-y-5">
            {notices.map((notice) => (
              <div
                key={notice._id}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex-1">
                    <div className="mb-3 flex flex-wrap items-center gap-2">
                      {notice.pinned && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
                          <Pin className="h-3.5 w-3.5" />
                          Pinned
                        </span>
                      )}

                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${categoryStyles[notice.category] || 'bg-slate-100 text-slate-700'}`}>
                        {notice.category}
                      </span>

                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${badgeStyles[notice.priority] || 'bg-slate-100 text-slate-700'}`}>
                        {notice.priority}
                      </span>
                    </div>

                    <h2 className="text-xl font-bold text-slate-900">{notice.title}</h2>
                    <p className="mt-3 whitespace-pre-line leading-7 text-slate-600">{notice.message}</p>
                  </div>

                  {notice.priority === 'Urgent' && (
                    <div className="inline-flex items-center gap-2 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                      <AlertTriangle className="h-4 w-4" />
                      Urgent
                    </div>
                  )}
                </div>

                <div className="mt-5 flex flex-wrap items-center gap-4 border-t border-slate-100 pt-4 text-sm text-slate-500">
                  <span className="inline-flex items-center gap-2">
                    <CalendarDays className="h-4 w-4" />
                    {new Date(notice.createdAt).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </span>
                  <span>Audience: {notice.audience}</span>
                  <span>By {notice.createdBy?.name || 'Hostel Warden'}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Notices;