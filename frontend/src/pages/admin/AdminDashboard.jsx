import React, { useEffect, useMemo, useState } from 'react';
import {
  Users,
  AlertTriangle,
  CheckSquare,
  Activity,
  BellRing,
  Clock3,
  BarChart3,
  ClipboardList,
  Megaphone,
  ArrowUpRight,
} from 'lucide-react';
import Button from '../../components/common/Button';
import {
  getAdminDashboardStats,
  getAllComplaints,
  getAllNotices,
} from '../../services/api';

const panelClass =
  'rounded-[28px] border border-slate-200/80 bg-white shadow-[0_12px_40px_-20px_rgba(15,23,42,0.22)]';
const softPanelClass =
  'rounded-[28px] border border-slate-200/80 bg-gradient-to-br from-white via-slate-50 to-indigo-50/40 shadow-[0_12px_40px_-20px_rgba(15,23,42,0.22)]';

const normalizeStatus = (status = '') => status.toString().trim().toLowerCase();

const extractCollection = (payload, preferredKeys = []) => {
  if (Array.isArray(payload)) return payload;
  if (!payload || typeof payload !== 'object') return [];

  for (const key of preferredKeys) {
    if (Array.isArray(payload[key])) return payload[key];
  }

  if (payload.data) {
    const nested = extractCollection(payload.data, preferredKeys);
    if (nested.length) return nested;
  }

  const firstArray = Object.values(payload).find(Array.isArray);
  return firstArray || [];
};

const formatStatus = (status = 'unknown') =>
  status
    .toString()
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());

const getStatusTone = (status = '') => {
  const normalized = normalizeStatus(status);

  if (['resolved', 'closed', 'approved', 'completed'].includes(normalized)) {
    return 'border-emerald-200 bg-emerald-50 text-emerald-700';
  }

  if (
    ['in progress', 'in-progress', 'processing', 'under review', 'review'].includes(normalized)
  ) {
    return 'border-amber-200 bg-amber-50 text-amber-700';
  }

  return 'border-rose-200 bg-rose-50 text-rose-700';
};

const timeAgo = (dateValue) => {
  if (!dateValue) return 'Recently';

  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) return 'Recently';

  const diffMs = Date.now() - date.getTime();
  const minutes = Math.floor(diffMs / (1000 * 60));
  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;

  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
  }).format(date);
};

const getComplaintTitle = (complaint) =>
  complaint?.title ||
  complaint?.subject ||
  complaint?.category ||
  complaint?.type ||
  complaint?.issue ||
  complaint?.description?.slice?.(0, 42) ||
  'Complaint submitted';

const getNoticeTitle = (notice) =>
  notice?.title ||
  notice?.subject ||
  notice?.headline ||
  'Notice published';

const StatCard = ({
  icon: Icon,
  title,
  value,
  subtitle,
  badge,
  tone = 'indigo',
}) => {
  const toneMap = {
    indigo: {
      icon: 'bg-indigo-50 text-indigo-600 ring-1 ring-indigo-100',
      badge: 'border-indigo-200 bg-indigo-50 text-indigo-700',
    },
    rose: {
      icon: 'bg-rose-50 text-rose-600 ring-1 ring-rose-100',
      badge: 'border-rose-200 bg-rose-50 text-rose-700',
    },
    amber: {
      icon: 'bg-amber-50 text-amber-600 ring-1 ring-amber-100',
      badge: 'border-amber-200 bg-amber-50 text-amber-700',
    },
    emerald: {
      icon: 'bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100',
      badge: 'border-emerald-200 bg-emerald-50 text-emerald-700',
    },
  };

  return (
    <div className="group rounded-[26px] border border-slate-200/80 bg-white p-5 shadow-[0_8px_30px_-18px_rgba(15,23,42,0.25)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_-22px_rgba(15,23,42,0.28)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <p className="mt-4 text-[2.1rem] font-bold leading-none tracking-[-0.03em] text-slate-950">
            {value}
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            {badge ? (
              <span
                className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${toneMap[tone].badge}`}
              >
                {badge}
              </span>
            ) : null}
            <span className="text-sm text-slate-500">{subtitle}</span>
          </div>
        </div>

        <div
          className={`rounded-2xl p-3 transition-transform duration-300 group-hover:scale-105 ${toneMap[tone].icon}`}
        >
          <Icon size={20} />
        </div>
      </div>
    </div>
  );
};

const ChartRow = ({ label, value, maxValue, tone = 'rose' }) => {
  const toneMap = {
    rose: 'from-rose-500 to-rose-400',
    amber: 'from-amber-500 to-amber-400',
    emerald: 'from-emerald-500 to-emerald-400',
    indigo: 'from-indigo-500 to-indigo-400',
  };

  const width =
    maxValue > 0 ? `${Math.max((value / maxValue) * 100, value > 0 ? 12 : 0)}%` : '0%';

  return (
    <div className="rounded-2xl border border-slate-200/80 bg-slate-50/70 p-4">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-sm font-semibold text-slate-700">{label}</p>
        <span className="text-sm font-bold text-slate-950">{value}</span>
      </div>
      <div className="h-2.5 overflow-hidden rounded-full bg-slate-200">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${toneMap[tone]}`}
          style={{ width }}
        />
      </div>
    </div>
  );
};

const ActivityItem = ({ item }) => {
  const isComplaint = item.type === 'complaint';

  return (
    <div className="group flex items-start gap-4 rounded-[22px] border border-slate-200/80 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
      <div
        className={`mt-0.5 rounded-2xl p-3 ${
          isComplaint ? 'bg-rose-50 text-rose-600' : 'bg-indigo-50 text-indigo-600'
        }`}
      >
        {isComplaint ? <ClipboardList size={18} /> : <Megaphone size={18} />}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-slate-900">{item.title}</p>
            <p className="mt-1.5 text-xs leading-5 text-slate-500">{item.description}</p>
          </div>
          <span className="shrink-0 text-xs font-medium text-slate-400">{item.time}</span>
        </div>

        <div className="mt-3 flex items-center gap-2">
          <span
            className={`rounded-full border px-2.5 py-1 text-[11px] font-semibold ${
              isComplaint
                ? getStatusTone(item.status)
                : 'border-indigo-200 bg-indigo-50 text-indigo-700'
            }`}
          >
            {isComplaint ? formatStatus(item.status) : 'Notice'}
          </span>
          <ArrowUpRight
            size={14}
            className="text-slate-300 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </div>
      </div>
    </div>
  );
};

const PriorityItem = ({ icon: Icon, title, description, tone = 'rose' }) => {
  const toneMap = {
    rose: 'bg-rose-50 text-rose-600',
    amber: 'bg-amber-50 text-amber-600',
    indigo: 'bg-indigo-50 text-indigo-600',
  };

  return (
    <div className="rounded-[22px] border border-slate-200/80 bg-slate-50/80 p-4 transition-all duration-300 hover:border-slate-300 hover:bg-white">
      <div className="flex items-start gap-3">
        <div className={`rounded-2xl p-3 ${toneMap[tone]}`}>
          <Icon size={18} />
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-900">{title}</p>
          <p className="mt-1.5 text-xs leading-5 text-slate-500">{description}</p>
        </div>
      </div>
    </div>
  );
};

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalStudents: 0,
    pendingComplaints: 0,
    pendingVerifications: 0,
    activeNotices: 0,
  });

  const [complaints, setComplaints] = useState([]);
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [statsResult, complaintsResult, noticesResult] = await Promise.allSettled([
          getAdminDashboardStats(),
          getAllComplaints(),
          getAllNotices(),
        ]);

        if (statsResult.status === 'rejected') {
          throw statsResult.reason;
        }

        setStats(statsResult.value.stats || {});

        if (complaintsResult.status === 'fulfilled') {
          setComplaints(
            extractCollection(complaintsResult.value, ['complaints', 'data', 'items'])
          );
        }

        if (noticesResult.status === 'fulfilled') {
          setNotices(
            extractCollection(noticesResult.value, ['notices', 'data', 'items'])
          );
        }
      } catch (err) {
        console.error('Failed to fetch dashboard data:', err);
        setError('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const complaintChart = useMemo(() => {
    const counts = {
      pending: 0,
      inProgress: 0,
      resolved: 0,
      other: 0,
    };

    complaints.forEach((complaint) => {
      const status = normalizeStatus(complaint?.status);

      if (['pending', 'open'].includes(status)) {
        counts.pending += 1;
      } else if (
        ['in progress', 'in-progress', 'processing', 'under review', 'review'].includes(status)
      ) {
        counts.inProgress += 1;
      } else if (['resolved', 'closed', 'completed'].includes(status)) {
        counts.resolved += 1;
      } else {
        counts.other += 1;
      }
    });

    return counts;
  }, [complaints]);

  const maxChartValue = useMemo(
    () =>
      Math.max(
        complaintChart.pending,
        complaintChart.inProgress,
        complaintChart.resolved,
        complaintChart.other,
        1
      ),
    [complaintChart]
  );

  const recentActivity = useMemo(() => {
    const complaintItems = complaints.map((complaint) => ({
      id: complaint._id || complaint.id,
      type: 'complaint',
      title: getComplaintTitle(complaint),
      description:
        complaint?.student?.name
          ? `Submitted by ${complaint.student.name}`
          : 'Complaint logged in the system',
      status: complaint?.status || 'pending',
      date: complaint?.updatedAt || complaint?.createdAt,
      time: timeAgo(complaint?.updatedAt || complaint?.createdAt),
    }));

    const noticeItems = notices.map((notice) => ({
      id: notice._id || notice.id,
      type: 'notice',
      title: getNoticeTitle(notice),
      description:
        notice?.message?.slice?.(0, 70) ||
        notice?.description?.slice?.(0, 70) ||
        'Notice published for hostel communication',
      status: 'published',
      date: notice?.updatedAt || notice?.createdAt,
      time: timeAgo(notice?.updatedAt || notice?.createdAt),
    }));

    return [...complaintItems, ...noticeItems]
      .sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0))
      .slice(0, 6);
  }, [complaints, notices]);

  const recentComplaints = useMemo(() => {
    return [...complaints]
      .sort(
        (a, b) =>
          new Date(b.updatedAt || b.createdAt || 0) -
          new Date(a.updatedAt || a.createdAt || 0)
      )
      .slice(0, 5);
  }, [complaints]);

  const priorityItems = [
    ...(stats.pendingComplaints > 0
      ? [
          {
            icon: AlertTriangle,
            title: `${stats.pendingComplaints} pending complaint${
              stats.pendingComplaints === 1 ? '' : 's'
            }`,
            description: 'Review unresolved issues and assign the next action.',
            tone: 'rose',
          },
        ]
      : []),
    ...(stats.pendingVerifications > 0
      ? [
          {
            icon: CheckSquare,
            title: `${stats.pendingVerifications} verification request${
              stats.pendingVerifications === 1 ? '' : 's'
            }`,
            description: 'Clear the approval queue to keep onboarding smooth.',
            tone: 'amber',
          },
        ]
      : []),
    {
      icon: BellRing,
      title: stats.activeNotices > 0 ? 'Notice board active' : 'No active notices',
      description:
        stats.activeNotices > 0
          ? 'Published announcements are currently visible to students.'
          : 'Publish a notice when an important hostel update is needed.',
      tone: 'indigo',
    },
  ];

  if (loading) {
    return <div className="p-6 text-slate-500">Loading dashboard...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500">{error}</div>;
  }

  return (
    <div className="space-y-6">
      <section className={`${softPanelClass} relative overflow-hidden p-6 md:p-7`}>
        <div className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-indigo-100/50 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 right-24 h-28 w-28 rounded-full bg-sky-100/40 blur-2xl" />

        <div className="relative flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">Overview</p>
            <h1 className="mt-1 text-[2rem] font-bold tracking-[-0.04em] text-slate-950 md:text-[2.35rem]">
              Dashboard
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
              Monitor student operations, complaint activity, verification requests, and notice
              updates.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button variant="secondary">Download Report</Button>
            <Button variant="primary">Create Notice</Button>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          icon={Users}
          title="Total Students"
          value={stats.totalStudents}
          subtitle="student records"
          badge="Live"
          tone="indigo"
        />
        <StatCard
          icon={AlertTriangle}
          title="Pending Complaints"
          value={stats.pendingComplaints}
          subtitle="awaiting action"
          badge="Open"
          tone="rose"
        />
        <StatCard
          icon={CheckSquare}
          title="Pending Verifications"
          value={stats.pendingVerifications}
          subtitle="approval queue"
          badge={stats.pendingVerifications > 0 ? 'Review' : 'Clear'}
          tone="amber"
        />
        <StatCard
          icon={Activity}
          title="Active Notices"
          value={stats.activeNotices}
          subtitle="currently published"
          badge="Visible"
          tone="emerald"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 2xl:grid-cols-5">
        <div className={`${panelClass} p-6 2xl:col-span-3`}>
          <div className="mb-5 flex items-start justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold tracking-[-0.03em] text-slate-950">
                Recent Activity
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                Latest complaint and notice updates.
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-600">
              {recentActivity.length} items
            </div>
          </div>

          <div className="space-y-3">
            {recentActivity.length > 0 ? (
              recentActivity.map((item) => <ActivityItem key={item.id} item={item} />)
            ) : (
              <div className="rounded-[22px] border border-dashed border-slate-300 bg-slate-50 p-10 text-center">
                <p className="text-sm font-semibold text-slate-900">No recent activity</p>
                <p className="mt-2 text-sm text-slate-500">
                  Complaint and notice updates will appear here.
                </p>
              </div>
            )}
          </div>
        </div>

        <div className={`${panelClass} p-6 2xl:col-span-2`}>
          <div className="mb-5 flex items-start justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold tracking-[-0.03em] text-slate-950">
                Complaint Status
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                Current distribution of complaint records.
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-600">
              {complaints.length} total
            </div>
          </div>

          <div className="space-y-4">
            <ChartRow
              label="Pending"
              value={complaintChart.pending}
              maxValue={maxChartValue}
              tone="rose"
            />
            <ChartRow
              label="In Progress"
              value={complaintChart.inProgress}
              maxValue={maxChartValue}
              tone="amber"
            />
            <ChartRow
              label="Resolved"
              value={complaintChart.resolved}
              maxValue={maxChartValue}
              tone="emerald"
            />
            {complaintChart.other > 0 && (
              <ChartRow
                label="Other"
                value={complaintChart.other}
                maxValue={maxChartValue}
                tone="indigo"
              />
            )}
          </div>

          <div className="mt-6 rounded-[22px] border border-slate-200/80 bg-slate-50/80 p-4">
            <div className="flex items-start gap-3">
              <div className="rounded-2xl bg-indigo-50 p-3 text-indigo-600">
                <BarChart3 size={18} />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">Status summary</p>
                <p className="mt-1.5 text-xs leading-5 text-slate-500">
                  Keep the pending queue low and move open requests toward resolution.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className={`${panelClass} p-6 xl:col-span-2`}>
          <div className="mb-5 flex items-start justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold tracking-[-0.03em] text-slate-950">
                Recent Complaints
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                Latest complaint records that may need review.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-600">
              {recentComplaints.length} items
            </div>
          </div>

          {recentComplaints.length > 0 ? (
            <div className="overflow-x-auto">
              <div className="min-w-[720px] overflow-hidden rounded-[22px] border border-slate-200/80">
                <div className="grid grid-cols-[1.8fr_0.9fr_0.8fr_0.8fr] bg-slate-50 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  <span>Complaint</span>
                  <span>Status</span>
                  <span>Student</span>
                  <span>Updated</span>
                </div>

                <div className="divide-y divide-slate-200/80 bg-white">
                  {recentComplaints.map((complaint) => (
                    <div
                      key={complaint._id || complaint.id}
                      className="grid grid-cols-[1.8fr_0.9fr_0.8fr_0.8fr] items-center px-4 py-4 text-sm"
                    >
                      <div className="min-w-0 pr-4">
                        <p className="truncate font-semibold text-slate-900">
                          {getComplaintTitle(complaint)}
                        </p>
                        <p className="mt-1 truncate text-xs text-slate-500">
                          {complaint?.description || 'Complaint logged in the system'}
                        </p>
                      </div>

                      <div>
                        <span
                          className={`inline-flex rounded-full border px-2.5 py-1 text-[11px] font-semibold ${getStatusTone(
                            complaint?.status
                          )}`}
                        >
                          {formatStatus(complaint?.status || 'pending')}
                        </span>
                      </div>

                      <div className="truncate pr-3 text-slate-600">
                        {complaint?.student?.name || 'Student'}
                      </div>

                      <div className="text-slate-500">
                        {timeAgo(complaint?.updatedAt || complaint?.createdAt)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="rounded-[22px] border border-dashed border-slate-300 bg-slate-50 p-10 text-center">
              <p className="text-sm font-semibold text-slate-900">No complaints yet</p>
              <p className="mt-2 text-sm text-slate-500">
                Complaint records will appear here once data is available.
              </p>
            </div>
          )}
        </div>

        <div className={`${panelClass} p-6`}>
          <div className="mb-5">
            <h3 className="text-xl font-bold tracking-[-0.03em] text-slate-950">
              Priority Actions
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Items that may need attention today.
            </p>
          </div>

          <div className="space-y-3">
            {priorityItems.map((item) => (
              <PriorityItem
                key={item.title}
                icon={item.icon}
                title={item.title}
                description={item.description}
                tone={item.tone}
              />
            ))}
          </div>

          <div className="mt-5 rounded-[22px] border border-slate-200/80 bg-slate-50/80 p-4">
            <div className="flex items-start gap-3">
              <div className="rounded-2xl bg-slate-900 p-3 text-white">
                <Clock3 size={18} />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">Today’s focus</p>
                <p className="mt-1.5 text-xs leading-5 text-slate-500">
                  Resolve pending complaints first, then clear approvals and keep notices updated.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;