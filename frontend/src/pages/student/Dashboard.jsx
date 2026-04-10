import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Bell,
  AlertTriangle,
  User,
  Home,
  CheckCircle2,
  RefreshCw,
  Phone,
  FileText,
  ShieldCheck,
  Mail,
  Sparkles,
  Clock3,
  ChevronRight,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { getMyComplaints, getStudentNotices } from '../../services/api';

const DASHBOARD_NOTICES_CACHE = 'dashboard_notices_cache';
const DASHBOARD_NOTICES_CACHE_TIME = 'dashboard_notices_cache_time';
const DASHBOARD_COMPLAINTS_CACHE = 'dashboard_complaints_cache';
const DASHBOARD_COMPLAINTS_CACHE_TIME = 'dashboard_complaints_cache_time';
const CACHE_TTL = 60 * 1000;

const readCachedArray = (key) => {
  try {
    const value = sessionStorage.getItem(key);
    return value ? JSON.parse(value) : [];
  } catch {
    return [];
  }
};

const isCacheFresh = (timeKey) => {
  const lastFetchTime = Number(sessionStorage.getItem(timeKey) || 0);
  return Date.now() - lastFetchTime < CACHE_TTL;
};

const SectionHeader = ({
  title,
  description,
  icon: Icon,
  iconWrapClass = 'bg-slate-100',
  iconClass = 'text-slate-700',
}) => (
  <div className="mb-4 flex items-start justify-between gap-4">
    <div>
      <h3 className="text-xl font-bold tracking-tight text-slate-900">{title}</h3>
      <p className="mt-1 text-sm leading-6 text-slate-500">{description}</p>
    </div>

    <div className={`rounded-2xl p-3 ${iconWrapClass}`}>
      <Icon size={20} className={iconClass} />
    </div>
  </div>
);

const StatCard = ({ title, value, subtitle, icon: Icon, iconBg, iconColor }) => (
  <div className="group rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
    <div className="flex items-start justify-between gap-4">
      <div>
        <p className="text-sm font-medium text-slate-500">{title}</p>
        <h3 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">{value}</h3>
        <p className="mt-2 text-xs leading-5 text-slate-500">{subtitle}</p>
      </div>

      <div className={`rounded-2xl p-3 transition-transform duration-200 group-hover:scale-105 ${iconBg}`}>
        <Icon size={20} className={iconColor} />
      </div>
    </div>
  </div>
);

const EmptyState = ({ icon: Icon, title, description, accent = 'blue' }) => {
  const accentMap = {
    blue: {
      wrap: 'bg-blue-50',
      icon: 'text-blue-600',
    },
    rose: {
      wrap: 'bg-rose-50',
      icon: 'text-rose-600',
    },
    emerald: {
      wrap: 'bg-emerald-50',
      icon: 'text-emerald-600',
    },
    slate: {
      wrap: 'bg-slate-100',
      icon: 'text-slate-700',
    },
  };

  const styles = accentMap[accent] || accentMap.slate;

  return (
    <div className="flex min-h-[148px] flex-col items-center justify-center rounded-[22px] border border-dashed border-slate-200 bg-slate-50 px-6 text-center">
      <div className={`rounded-2xl p-3 ${styles.wrap}`}>
        <Icon size={20} className={styles.icon} />
      </div>
      <p className="mt-4 text-sm font-semibold text-slate-800">{title}</p>
      <p className="mt-2 max-w-sm text-xs leading-6 text-slate-500">{description}</p>
    </div>
  );
};

const NoticePanelSkeleton = () => (
  <div className="animate-pulse rounded-[22px] border border-slate-200 bg-slate-50 p-5">
    <div className="h-4 w-20 rounded bg-slate-200" />
    <div className="mt-3 h-6 w-2/3 rounded bg-slate-200" />
    <div className="mt-4 h-4 w-full rounded bg-slate-200" />
    <div className="mt-2 h-4 w-5/6 rounded bg-slate-200" />
    <div className="mt-5 h-14 rounded-2xl bg-slate-200" />
  </div>
);

const ComplaintPanelSkeleton = () => (
  <div className="space-y-3">
    {[1, 2].map((item) => (
      <div
        key={item}
        className="animate-pulse rounded-[20px] border border-slate-200 bg-slate-50 p-4"
      >
        <div className="h-4 w-40 rounded bg-slate-200" />
        <div className="mt-2 h-3 w-24 rounded bg-slate-200" />
      </div>
    ))}
  </div>
);

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [notices, setNotices] = useState(() => readCachedArray(DASHBOARD_NOTICES_CACHE));
  const [complaints, setComplaints] = useState(() => readCachedArray(DASHBOARD_COMPLAINTS_CACHE));
  const [noticesLoading, setNoticesLoading] = useState(
    () => readCachedArray(DASHBOARD_NOTICES_CACHE).length === 0
  );
  const [complaintsLoading, setComplaintsLoading] = useState(
    () => readCachedArray(DASHBOARD_COMPLAINTS_CACHE).length === 0
  );
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');

  const firstName = user?.name?.split(' ')[0] || 'Student';
  const roomNumber = user?.profile?.roomNumber || 'Not Assigned';
  const mobileNumber = user?.profile?.mobileNumber || user?.profile?.phone || '';
  const email = user?.email || '';

  const date = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  const getArrayData = (response, keys = []) => {
    if (Array.isArray(response)) return response;

    for (const key of keys) {
      if (Array.isArray(response?.[key])) return response[key];
    }

    if (Array.isArray(response?.data)) return response.data;

    return [];
  };

  const formatDate = (value) => {
    if (!value) return 'Recently';

    const dateValue = new Date(value);
    if (Number.isNaN(dateValue.getTime())) return 'Recently';

    return dateValue.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getComplaintStatusMeta = (status) => {
    const value = String(status || 'Pending').toLowerCase();

    if (['resolved', 'closed', 'completed'].includes(value)) {
      return {
        label: 'Resolved',
        badgeClass: 'border border-emerald-200 bg-emerald-50 text-emerald-700',
      };
    }

    if (['in progress', 'in-progress', 'ongoing'].includes(value)) {
      return {
        label: 'In Progress',
        badgeClass: 'border border-amber-200 bg-amber-50 text-amber-700',
      };
    }

    if (['rejected'].includes(value)) {
      return {
        label: 'Rejected',
        badgeClass: 'border border-slate-300 bg-slate-100 text-slate-700',
      };
    }

    return {
      label: status || 'Pending',
      badgeClass: 'border border-rose-200 bg-rose-50 text-rose-700',
    };
  };

  const fetchDashboardData = async (isRefresh = false) => {
    const requests = [];

    try {
      if (isRefresh) setRefreshing(true);
      setError('');

      const shouldUseNoticeCache = !isRefresh && isCacheFresh(DASHBOARD_NOTICES_CACHE_TIME);
      const shouldUseComplaintCache = !isRefresh && isCacheFresh(DASHBOARD_COMPLAINTS_CACHE_TIME);

      if (shouldUseNoticeCache) {
        setNotices(readCachedArray(DASHBOARD_NOTICES_CACHE));
        setNoticesLoading(false);
      } else {
        setNoticesLoading(true);

        const noticeRequest = getStudentNotices()
          .then((res) => {
            const data = getArrayData(res, ['notices']);
            setNotices(data);
            sessionStorage.setItem(DASHBOARD_NOTICES_CACHE, JSON.stringify(data));
            sessionStorage.setItem(DASHBOARD_NOTICES_CACHE_TIME, Date.now().toString());
          })
          .catch(() => {
            setNotices([]);
          })
          .finally(() => {
            setNoticesLoading(false);
          });

        requests.push(noticeRequest);
      }

      if (shouldUseComplaintCache) {
        setComplaints(readCachedArray(DASHBOARD_COMPLAINTS_CACHE));
        setComplaintsLoading(false);
      } else {
        setComplaintsLoading(true);

        const complaintRequest = getMyComplaints()
          .then((res) => {
            const data = getArrayData(res, ['complaints']);
            setComplaints(data);
            sessionStorage.setItem(DASHBOARD_COMPLAINTS_CACHE, JSON.stringify(data));
            sessionStorage.setItem(DASHBOARD_COMPLAINTS_CACHE_TIME, Date.now().toString());
          })
          .catch(() => {
            setComplaints([]);
          })
          .finally(() => {
            setComplaintsLoading(false);
          });

        requests.push(complaintRequest);
      }

      const results = await Promise.allSettled(requests);

      if (
        results.length > 0 &&
        results.every((result) => result.status === 'rejected')
      ) {
        setError('Failed to load dashboard data.');
      }
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to load dashboard data.');
      setNoticesLoading(false);
      setComplaintsLoading(false);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const sortedNotices = useMemo(() => {
    return [...notices].sort(
      (a, b) =>
        new Date(b.createdAt || b.updatedAt || 0) -
        new Date(a.createdAt || a.updatedAt || 0)
    );
  }, [notices]);

  const sortedComplaints = useMemo(() => {
    return [...complaints].sort(
      (a, b) =>
        new Date(b.createdAt || b.updatedAt || 0) -
        new Date(a.createdAt || a.updatedAt || 0)
    );
  }, [complaints]);

  const latestNotice = sortedNotices[0] || null;
  const latestComplaint = sortedComplaints[0] || null;

  const activeComplaints = sortedComplaints.filter((item) => {
    const status = String(item?.status || '').toLowerCase();
    return !['resolved', 'closed', 'completed', 'rejected'].includes(status);
  });

  const complaintPreview =
    activeComplaints.length > 0 ? activeComplaints.slice(0, 2) : sortedComplaints.slice(0, 2);

  const profileFields = [
    {
      label: 'Full Name',
      value: user?.name,
      completed: Boolean(user?.name),
    },
    {
      label: 'Email Address',
      value: email,
      completed: Boolean(email),
    },
    {
      label: 'Room Number',
      value: user?.profile?.roomNumber,
      completed: Boolean(user?.profile?.roomNumber),
    },
    {
      label: 'Phone Number',
      value: mobileNumber,
      completed: Boolean(mobileNumber),
    },
  ];

  const completedProfileFields = profileFields.filter((item) => item.completed).length;
  const profileCompletion = Math.round(
    (completedProfileFields / profileFields.length) * 100
  );
  const remainingFields = profileFields.length - completedProfileFields;

  const profileStatusText =
    profileCompletion === 100
      ? 'Profile complete'
      : `Profile ${profileCompletion}% complete`;

  const profileStatusSubtext =
    profileCompletion === 100
      ? 'All essential student details are available and ready for day-to-day hostel operations.'
      : `Add ${remainingFields} more ${remainingFields === 1 ? 'detail' : 'details'} to fully complete your student account.`;

  const accountHealth =
    profileCompletion === 100 && activeComplaints.length === 0
      ? 'Operational'
      : profileCompletion >= 75
      ? 'Stable'
      : 'Needs Review';

  const stats = [
    {
      title: 'Room Number',
      value: roomNumber,
      subtitle:
        roomNumber === 'Not Assigned'
          ? 'Awaiting hostel assignment'
          : 'Assigned hostel accommodation',
      icon: Home,
      iconBg: 'bg-blue-50',
      iconColor: 'text-blue-600',
    },
    {
      title: 'Profile Status',
      value: `${profileCompletion}%`,
      subtitle:
        profileCompletion === 100
          ? 'All required dashboard details completed'
          : 'A few student details still need attention',
      icon: CheckCircle2,
      iconBg: 'bg-emerald-50',
      iconColor: 'text-emerald-600',
    },
    {
      title: 'Live Notices',
      value: String(sortedNotices.length).padStart(2, '0'),
      subtitle: latestNotice
        ? 'Recent hostel update available'
        : 'No new announcements right now',
      icon: Bell,
      iconBg: 'bg-violet-50',
      iconColor: 'text-violet-600',
    },
    {
      title: 'Open Complaints',
      value: String(activeComplaints.length).padStart(2, '0'),
      subtitle:
        activeComplaints.length > 0
          ? 'Track active support requests'
          : 'All complaint requests currently cleared',
      icon: AlertTriangle,
      iconBg: 'bg-rose-50',
      iconColor: 'text-rose-600',
    },
  ];

  const activityItems = [
    {
      title: noticesLoading
        ? 'Loading latest hostel notice...'
        : latestNotice
        ? latestNotice.title || latestNotice.subject || 'Latest hostel notice published'
        : 'No new notices published yet.',
      meta: noticesLoading
        ? 'Notice feed'
        : latestNotice
        ? `Notice · ${formatDate(latestNotice.createdAt || latestNotice.updatedAt)}`
        : 'Notice feed',
      tone: 'blue',
    },
    {
      title: complaintsLoading
        ? 'Loading complaint updates...'
        : latestComplaint
        ? latestComplaint.subject || latestComplaint.category || 'Latest complaint recorded'
        : 'No complaints submitted yet.',
      meta: complaintsLoading
        ? 'Complaint center'
        : latestComplaint
        ? `${getComplaintStatusMeta(latestComplaint.status).label} · ${formatDate(
            latestComplaint.createdAt || latestComplaint.updatedAt
          )}`
        : 'Complaint center',
      tone: 'rose',
    },
    {
      title:
        profileCompletion === 100
          ? 'Your student profile is fully completed.'
          : `${profileStatusText}.`,
      meta:
        profileCompletion === 100
          ? 'Profile readiness'
          : `${remainingFields} field${remainingFields === 1 ? '' : 's'} remaining`,
      tone: 'emerald',
    },
  ];

  return (
    <div className="space-y-6 bg-slate-50/70 pb-8">
      <section className="overflow-hidden rounded-[32px] border border-slate-200 bg-gradient-to-br from-white via-white to-slate-50 p-6 shadow-sm md:p-8">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/10 bg-primary/5 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
              <Sparkles size={14} />
              Student Operations Dashboard
            </div>

            <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl xl:text-[2.9rem] xl:leading-[1.05]">
              Welcome back, {firstName}
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 md:text-base">
              {date} · Track notices, complaints, and account readiness from one
              clean dashboard designed for organized hostel operations.
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              <span className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow-sm">
                Hostel Resident
              </span>
              <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700">
                {profileStatusText}
              </span>
              <span className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700">
                {sortedNotices.length} live notices
              </span>
              <span className="rounded-full border border-rose-200 bg-rose-50 px-3 py-1.5 text-xs font-medium text-rose-700">
                {activeComplaints.length} active complaints
              </span>
            </div>
          </div>

          <div className="w-full max-w-sm rounded-[26px] border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-primary/10 p-3 text-primary">
                <User size={20} />
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-slate-400">
                  Account Summary
                </p>
                <p className="mt-1 text-base font-semibold text-slate-900">
                  {user?.name || 'Not Available'}
                </p>
              </div>
            </div>

            <div className="my-4 h-px bg-slate-200" />

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs text-slate-500">Room</p>
                <p className="mt-1 text-lg font-bold text-slate-900">{roomNumber}</p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs text-slate-500">Account Health</p>
                <p
                  className={`mt-1 text-lg font-bold ${
                    accountHealth === 'Operational'
                      ? 'text-emerald-600'
                      : accountHealth === 'Stable'
                      ? 'text-amber-600'
                      : 'text-rose-600'
                  }`}
                >
                  {accountHealth}
                </p>
              </div>
            </div>

            <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.12em] text-slate-400">
                    Dashboard Status
                  </p>
                  <p className="mt-1 text-sm font-semibold text-slate-900">
                    {profileCompletion === 100
                      ? 'Ready for daily hostel operations'
                      : 'Finish account setup for a better experience'}
                  </p>
                </div>

                <div className="rounded-xl bg-white p-2 shadow-sm">
                  <Clock3 size={16} className="text-slate-600" />
                </div>
              </div>
            </div>

            <button
              onClick={() => fetchDashboardData(true)}
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              <RefreshCw size={16} className={refreshing ? 'animate-spin' : ''} />
              {refreshing ? 'Refreshing...' : 'Refresh Dashboard'}
            </button>
          </div>
        </div>

        {error && (
          <div className="mt-6 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {error}
          </div>
        )}

        <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <StatCard key={stat.title} {...stat} />
          ))}
        </div>
      </section>

      <section className="grid grid-cols-1 gap-5 xl:grid-cols-12">
        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm xl:col-span-5">
          <SectionHeader
            title="Latest Notice"
            description="Recent communication from hostel administration"
            icon={Bell}
            iconWrapClass="bg-blue-50"
            iconClass="text-blue-600"
          />

          {noticesLoading ? (
            <NoticePanelSkeleton />
          ) : latestNotice ? (
            <div className="rounded-[22px] border border-blue-100 bg-gradient-to-br from-blue-50/80 to-white p-5">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-blue-600">
                    Notice
                  </p>
                  <h4 className="mt-2 text-base font-semibold leading-7 text-slate-900">
                    {latestNotice.title || latestNotice.subject || 'Hostel notice'}
                  </h4>
                </div>

                <span className="whitespace-nowrap rounded-full border border-blue-200 bg-white px-3 py-1 text-[11px] font-medium text-blue-700">
                  {formatDate(latestNotice.createdAt || latestNotice.updatedAt)}
                </span>
              </div>

              <p className="mt-4 text-sm leading-7 text-slate-600">
                {latestNotice.description ||
                  latestNotice.message ||
                  latestNotice.content ||
                  'No description available.'}
              </p>

              <div className="mt-5 flex items-center justify-between rounded-2xl border border-blue-100 bg-white/80 px-4 py-3">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.12em] text-slate-400">
                    Notice Feed
                  </p>
                  <p className="mt-1 text-sm font-semibold text-slate-900">
                    {sortedNotices.length} live {sortedNotices.length === 1 ? 'notice' : 'notices'}
                  </p>
                </div>

                <button
                  onClick={() => navigate('/student/notices')}
                  className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-semibold text-slate-800 shadow-sm ring-1 ring-slate-200 transition hover:bg-slate-50"
                >
                  Open notices
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          ) : (
            <EmptyState
              icon={Bell}
              title="No active notices right now"
              description="You are all caught up. New hostel announcements will appear here once they are published."
              accent="blue"
            />
          )}
        </div>

        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm xl:col-span-4">
          <SectionHeader
            title="Complaint Status"
            description="Follow progress on student support requests"
            icon={AlertTriangle}
            iconWrapClass="bg-rose-50"
            iconClass="text-rose-600"
          />

          {complaintsLoading ? (
            <ComplaintPanelSkeleton />
          ) : complaintPreview.length > 0 ? (
            <div className="space-y-3">
              {complaintPreview.map((item) => {
                const statusMeta = getComplaintStatusMeta(item.status);

                return (
                  <div
                    key={item._id}
                    className="rounded-[20px] border border-slate-200 bg-slate-50 p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-slate-900">
                          {item.subject || item.category || 'Complaint'}
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                          {item.category ? `${item.category} · ` : ''}
                          {formatDate(item.createdAt || item.updatedAt)}
                        </p>
                      </div>

                      <span
                        className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${statusMeta.badgeClass}`}
                      >
                        {statusMeta.label}
                      </span>
                    </div>
                  </div>
                );
              })}

              <div className="rounded-[20px] border border-slate-200 bg-white px-4 py-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.12em] text-slate-400">
                      Current Queue
                    </p>
                    <p className="mt-1 text-sm font-semibold text-slate-900">
                      {activeComplaints.length} active {activeComplaints.length === 1 ? 'request' : 'requests'}
                    </p>
                  </div>

                  <button
                    onClick={() =>
                      navigate('/student/complaints', {
                        state: { prefetchedComplaints: complaints },
                      })
                    }
                    className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                  >
                    View all
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <EmptyState
              icon={CheckCircle2}
              title="No complaints in progress"
              description="Everything looks stable right now. Any future support requests will appear here with live status updates."
              accent="emerald"
            />
          )}
        </div>

        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm xl:col-span-3">
          <SectionHeader
            title="Profile Health"
            description="Essential dashboard identity and contact details"
            icon={ShieldCheck}
            iconWrapClass="bg-emerald-50"
            iconClass="text-emerald-600"
          />

          <div className="rounded-[20px] border border-slate-200 bg-slate-50 p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-slate-700">{profileStatusText}</p>
              <p className="text-sm font-bold text-slate-900">{profileCompletion}%</p>
            </div>

            <div className="mt-3 h-2.5 w-full overflow-hidden rounded-full bg-slate-200">
              <div
                className="h-full rounded-full bg-emerald-500 transition-all duration-500"
                style={{ width: `${profileCompletion}%` }}
              />
            </div>

            <p className="mt-3 text-xs leading-6 text-slate-500">
              {profileStatusSubtext}
            </p>
          </div>

          <div className="mt-4 space-y-3">
            {profileFields.map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3"
              >
                <div className="min-w-0">
                  <p className="text-sm font-medium text-slate-700">{item.label}</p>
                  <p className="mt-1 truncate text-xs text-slate-500">
                    {item.value || 'Not added yet'}
                  </p>
                </div>

                <span
                  className={`ml-3 rounded-full px-2.5 py-1 text-[11px] font-medium ${
                    item.completed
                      ? 'border border-emerald-200 bg-emerald-50 text-emerald-700'
                      : 'border border-amber-200 bg-amber-50 text-amber-700'
                  }`}
                >
                  {item.completed ? 'Added' : 'Missing'}
                </span>
              </div>
            ))}
          </div>

          <button
            onClick={() => navigate('/student/profile')}
            className="mt-5 w-full rounded-2xl bg-primary px-4 py-3 text-sm font-semibold text-white transition hover:opacity-95"
          >
            Update Profile
          </button>
        </div>

        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm xl:col-span-7">
          <SectionHeader
            title="Recent Activity"
            description="A concise summary of the latest updates on your account"
            icon={FileText}
            iconWrapClass="bg-slate-100"
            iconClass="text-slate-700"
          />

          <div className="space-y-3">
            {activityItems.map((item, index) => (
              <div
                key={index}
                className="rounded-[20px] border border-slate-200 bg-slate-50 px-4 py-4"
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`mt-1.5 h-2.5 w-2.5 rounded-full ${
                      item.tone === 'blue'
                        ? 'bg-blue-500'
                        : item.tone === 'rose'
                        ? 'bg-rose-500'
                        : 'bg-emerald-500'
                    }`}
                  />
                  <div className="min-w-0">
                    <p className="text-sm font-medium leading-6 text-slate-800">
                      {item.title}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">{item.meta}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm xl:col-span-5">
          <SectionHeader
            title="Quick Actions"
            description="Useful shortcuts for daily hostel workflows"
            icon={Phone}
            iconWrapClass="bg-slate-100"
            iconClass="text-slate-700"
          />

          <div className="space-y-3">
            <button
              onClick={() => navigate('/student/notices')}
              className="group w-full rounded-[20px] border border-slate-200 bg-slate-50 p-4 text-left transition-all duration-200 hover:bg-white hover:shadow-sm"
            >
              <div className="flex items-start gap-3">
                <div className="rounded-xl bg-blue-50 p-2.5">
                  <Bell size={18} className="text-blue-600" />
                </div>

                <div className="flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <p className="font-semibold text-slate-900">Check Hostel Notices</p>
                    <ChevronRight
                      size={18}
                      className="text-slate-400 transition-transform duration-200 group-hover:translate-x-0.5"
                    />
                  </div>

                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    Review the latest announcements and communication from hostel administration.
                  </p>
                </div>
              </div>
            </button>

            <button
              onClick={() => navigate('/student/complaints')}
              className="group w-full rounded-[20px] border border-slate-200 bg-slate-50 p-4 text-left transition-all duration-200 hover:bg-white hover:shadow-sm"
            >
              <div className="flex items-start gap-3">
                <div className="rounded-xl bg-rose-50 p-2.5">
                  <AlertTriangle size={18} className="text-rose-600" />
                </div>

                <div className="flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <p className="font-semibold text-slate-900">Manage Complaints</p>
                    <ChevronRight
                      size={18}
                      className="text-slate-400 transition-transform duration-200 group-hover:translate-x-0.5"
                    />
                  </div>

                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    Raise a new issue or track the progress of ongoing support requests.
                  </p>
                </div>
              </div>
            </button>

            <button
              onClick={() => navigate('/student/profile')}
              className="group w-full rounded-[20px] border border-slate-200 bg-slate-50 p-4 text-left transition-all duration-200 hover:bg-white hover:shadow-sm"
            >
              <div className="flex items-start gap-3">
                <div className="rounded-xl bg-emerald-50 p-2.5">
                  <Mail size={18} className="text-emerald-600" />
                </div>

                <div className="flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <p className="font-semibold text-slate-900">Edit Student Profile</p>
                    <ChevronRight
                      size={18}
                      className="text-slate-400 transition-transform duration-200 group-hover:translate-x-0.5"
                    />
                  </div>

                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    Update room details, contact information, and essential account data.
                  </p>
                </div>
              </div>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;