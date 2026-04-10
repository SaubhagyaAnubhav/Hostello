import React, { useEffect, useState } from 'react';
import { BellRing, Pin, CalendarDays, AlertTriangle, RefreshCcw } from 'lucide-react';
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

const NoticeSkeleton = () => (
  <div className="mt-6 space-y-4" aria-hidden="true">
    {[1, 2, 3].map((item) => (
      <div key={item} className="animate-pulse rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-4 h-6 w-1/3 rounded bg-slate-200"></div>
        <div className="space-y-2">
          <div className="h-4 w-full rounded bg-slate-200"></div>
          <div className="h-4 w-5/6 rounded bg-slate-200"></div>
        </div>
      </div>
    ))}
  </div>
);

const NoticeCard = ({ notice }) => (
  <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div className="flex-1">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          {notice.pinned && (
            <span className="inline-flex items-center gap-1 rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
              <Pin className="h-3.5 w-3.5" aria-hidden="true" />
              Pinned
            </span>
          )}

          <span className={`rounded-full px-3 py-1 text-xs font-semibold ${categoryStyles[notice.category] || categoryStyles.General}`}>
            {notice.category}
          </span>

          <span className={`rounded-full px-3 py-1 text-xs font-semibold ${badgeStyles[notice.priority] || badgeStyles.Normal}`}>
            {notice.priority}
          </span>
        </div>

        <h2 className="text-xl font-bold text-slate-900">{notice.title}</h2>
        <p className="mt-3 whitespace-pre-line leading-7 text-slate-600">{notice.message}</p>
      </div>

      {notice.priority === 'Urgent' && (
        <div className="inline-flex shrink-0 items-center gap-2 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          <AlertTriangle className="h-4 w-4" aria-hidden="true" />
          Urgent
        </div>
      )}
    </div>

    <footer className="mt-5 flex flex-wrap items-center gap-4 border-t border-slate-100 pt-4 text-sm text-slate-500">
      <time dateTime={notice.createdAt} className="inline-flex items-center gap-2">
        <CalendarDays className="h-4 w-4" aria-hidden="true" />
        {new Date(notice.createdAt).toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        })}
      </time>
      <span>Audience: {notice.audience}</span>
      <span>By {notice.createdBy?.name || 'Hostel Warden'}</span>
    </footer>
  </article>
);

const CACHE_KEY = 'hostel_notices_cache';
const CACHE_TIME_KEY = 'hostel_notices_cache_time';
const CACHE_TTL = 60 * 1000; // 1 minute

const Notices = () => {
  const [notices, setNotices] = useState(() => {
    const cachedData = sessionStorage.getItem(CACHE_KEY);
    return cachedData ? JSON.parse(cachedData) : [];
  });

  const [loading, setLoading] = useState(notices.length === 0);
  const [isBackgroundUpdating, setIsBackgroundUpdating] = useState(false);
  const [error, setError] = useState('');

  const fetchNotices = async (isManualRetry = false) => {
    try {
      const lastFetchTime = Number(sessionStorage.getItem(CACHE_TIME_KEY) || 0);
      const isCacheFresh = Date.now() - lastFetchTime < CACHE_TTL;

      if (!isManualRetry && notices.length > 0 && isCacheFresh) {
        return;
      }

      if (notices.length === 0 || isManualRetry) {
        setLoading(true);
      } else {
        setIsBackgroundUpdating(true);
      }

      const data = await getStudentNotices();

      setNotices(data || []);
      sessionStorage.setItem(CACHE_KEY, JSON.stringify(data || []));
      sessionStorage.setItem(CACHE_TIME_KEY, Date.now().toString());
      setError('');
    } catch (err) {
      if (notices.length === 0) {
        setError(err?.response?.data?.message || 'Failed to load notices.');
      }
    } finally {
      setLoading(false);
      setIsBackgroundUpdating(false);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <header className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          {isBackgroundUpdating && (
            <div className="absolute left-0 top-0 h-1 w-full animate-pulse bg-indigo-500"></div>
          )}

          <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-700">
            <BellRing className="h-4 w-4" aria-hidden="true" />
            Hostel Notice Board
          </div>

          <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            Notices from your hostel warden
          </h1>

          <p className="mt-3 max-w-3xl leading-7 text-slate-600">
            Stay updated with official announcements, maintenance updates, fee reminders,
            food changes, event information, and urgent hostel communication.
          </p>
        </header>

        <div aria-live="polite">
          {loading ? (
            <NoticeSkeleton />
          ) : error ? (
            <div className="mt-6 flex flex-col items-start gap-4 rounded-3xl border border-red-200 bg-red-50 p-6 text-red-700" role="alert">
              <p>{error}</p>
              <button
                onClick={() => fetchNotices(true)}
                className="inline-flex items-center gap-2 rounded-lg bg-red-100 px-4 py-2 text-sm font-medium text-red-800 transition-colors hover:bg-red-200"
              >
                <RefreshCcw className="h-4 w-4" />
                Try Again
              </button>
            </div>
          ) : !notices?.length ? (
            <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
              <h3 className="text-xl font-semibold text-slate-900">No notices yet</h3>
              <p className="mt-2 text-slate-600">New notices from the hostel warden will appear here.</p>
            </div>
          ) : (
            <div className="mt-6 space-y-5">
              {notices.map((notice) => (
                <NoticeCard key={notice._id} notice={notice} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Notices;