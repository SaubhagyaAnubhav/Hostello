import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  AlertCircle,
  CheckCircle2,
  Clock3,
  Filter,
  MessageSquareWarning,
  RefreshCcw,
  Search,
  Send,
  ShieldAlert,
  Ticket,
  Trash2,
} from "lucide-react";
import { createComplaint, getMyComplaints, deleteComplaint } from "../../services/api";
import { useAuth } from "../../context/AuthContext";

const categories = [
  "Electricity",
  "Water",
  "WiFi",
  "Cleaning",
  "Food",
  "Security",
  "Furniture",
  "Other",
];

const priorities = ["Low", "Medium", "High"];
const filters = ["All", "Pending", "In Progress", "Resolved", "Rejected"];

const statusStyles = {
  Pending: "bg-amber-50 text-amber-700 border border-amber-200",
  "In Progress": "bg-blue-50 text-blue-700 border border-blue-200",
  Resolved: "bg-emerald-50 text-emerald-700 border border-emerald-200",
  Rejected: "bg-rose-50 text-rose-700 border border-rose-200",
};

const priorityStyles = {
  Low: "bg-slate-100 text-slate-600",
  Medium: "bg-indigo-50 text-indigo-700",
  High: "bg-rose-50 text-rose-700",
};

const COMPLAINTS_CACHE_KEY = "dashboard_complaints_cache";
const COMPLAINTS_CACHE_TIME_KEY = "dashboard_complaints_cache_time";
const COMPLAINTS_CACHE_TTL = 60 * 1000;

const getComplaintRef = (item) => {
  const id = item?._id ? String(item._id).slice(-6).toUpperCase() : "NEW001";
  return `CMP-${id}`;
};

const formatDate = (value) => {
  if (!value) return "—";
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
};

const formatDateTime = (value) => {
  if (!value) return "—";
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));
};

const readCachedComplaints = () => {
  try {
    const value = sessionStorage.getItem(COMPLAINTS_CACHE_KEY);
    return value ? JSON.parse(value) : [];
  } catch {
    return [];
  }
};

const saveComplaintsCache = (items) => {
  sessionStorage.setItem(COMPLAINTS_CACHE_KEY, JSON.stringify(items));
  sessionStorage.setItem(COMPLAINTS_CACHE_TIME_KEY, Date.now().toString());
};

const isComplaintsCacheFresh = () => {
  const lastFetchTime = Number(sessionStorage.getItem(COMPLAINTS_CACHE_TIME_KEY) || 0);
  return Date.now() - lastFetchTime < COMPLAINTS_CACHE_TTL;
};

const getComplaintArray = (response) => {
  if (Array.isArray(response)) return response;
  if (Array.isArray(response?.complaints)) return response.complaints;
  if (Array.isArray(response?.data)) return response.data;
  return [];
};

export default function ComplaintsPage() {
  const { user } = useAuth();
  const location = useLocation();
  const historyRef = useRef(null);
  const successTimer = useRef(null);
  const errorTimer = useRef(null);

  const prefetchedComplaints = location.state?.prefetchedComplaints || [];
  const initialComplaints =
    prefetchedComplaints.length > 0 ? prefetchedComplaints : readCachedComplaints();

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    roomNumber: user?.profile?.roomNumber || "",
    hostelName: user?.profile?.hostelName || "",
    category: "Electricity",
    subject: "",
    description: "",
    priority: "Medium",
  });

  const [complaints, setComplaints] = useState(initialComplaints);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(initialComplaints.length === 0);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [fetchError, setFetchError] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  const fetchComplaints = async (force = false) => {
    try {
      setFetchError("");

      if (!force && complaints.length > 0 && isComplaintsCacheFresh()) {
        setFetching(false);
        return;
      }

      setFetching(true);

      const response = await getMyComplaints();
      const items = getComplaintArray(response);

      setComplaints(items);
      saveComplaintsCache(items);
    } catch (err) {
      setFetchError(err?.response?.data?.message || "Failed to load complaints.");
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    if (prefetchedComplaints.length > 0) {
      saveComplaintsCache(prefetchedComplaints);
      setComplaints(prefetchedComplaints);
      setFetching(false);
      return;
    }

    fetchComplaints();
  }, []);

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: user?.name || "",
        email: user?.email || "",
        roomNumber: user?.profile?.roomNumber || prev.roomNumber,
        hostelName: user?.profile?.hostelName || prev.hostelName,
      }));
    }
  }, [user]);

  useEffect(() => {
    return () => {
      clearTimeout(successTimer.current);
      clearTimeout(errorTimer.current);
    };
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    setError("");

    try {
      const res = await createComplaint(formData);
      const createdComplaint = res?.complaint || null;
      const ticketLabel = createdComplaint ? getComplaintRef(createdComplaint) : null;

      setSuccess(
        ticketLabel
          ? `Complaint ${ticketLabel} has been sent to the warden successfully.`
          : "Your complaint has been submitted to the warden successfully."
      );

      clearTimeout(successTimer.current);
      successTimer.current = setTimeout(() => setSuccess(""), 5000);

      setFormData((prev) => ({
        ...prev,
        category: "Electricity",
        subject: "",
        description: "",
        priority: "Medium",
      }));

      if (createdComplaint) {
        setComplaints((prev) => {
          const updated = [createdComplaint, ...prev];
          saveComplaintsCache(updated);
          return updated;
        });
      } else {
        await fetchComplaints(true);
      }

      requestAnimationFrame(() => {
        historyRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      });
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to submit complaint."
      );

      clearTimeout(errorTimer.current);
      errorTimer.current = setTimeout(() => setError(""), 5000);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteComplaint = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this complaint? You can only delete pending complaints."
    );

    if (!confirmed) return;

    try {
      setDeletingId(id);
      setError("");
      setSuccess("");

      const res = await deleteComplaint(id);

      setComplaints((prev) => {
        const updated = prev.filter((item) => item._id !== id);
        saveComplaintsCache(updated);
        return updated;
      });

      setSuccess(res?.message || "Complaint deleted successfully.");

      clearTimeout(successTimer.current);
      successTimer.current = setTimeout(() => setSuccess(""), 5000);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to delete complaint."
      );

      clearTimeout(errorTimer.current);
      errorTimer.current = setTimeout(() => setError(""), 5000);
    } finally {
      setDeletingId(null);
    }
  };

  const summary = useMemo(() => {
    const total = complaints.length;
    const open = complaints.filter(
      (item) => item.status === "Pending" || item.status === "In Progress"
    ).length;
    const resolved = complaints.filter((item) => item.status === "Resolved").length;
    const highPriority = complaints.filter((item) => item.priority === "High").length;

    return { total, open, resolved, highPriority };
  }, [complaints]);

  const filteredComplaints = useMemo(() => {
    return complaints.filter((item) => {
      const matchesFilter =
        activeFilter === "All" ? true : item.status === activeFilter;

      const haystack = [
        item.subject,
        item.description,
        item.category,
        item.roomNumber,
        item.hostelName,
        getComplaintRef(item),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const matchesSearch = haystack.includes(searchTerm.trim().toLowerCase());

      return matchesFilter && matchesSearch;
    });
  }, [complaints, activeFilter, searchTerm]);

  return (
    <div className="min-h-screen bg-slate-50">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-sm">
            <ShieldAlert className="h-4 w-4 text-indigo-600" />
            Complaint Support
          </div>

          <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
                Raise a Complaint
              </h1>
              <p className="mt-3 max-w-2xl text-slate-600 text-base md:text-lg leading-7">
                Report hostel issues directly to the warden. Add clear, specific
                details so your complaint can be reviewed and resolved faster.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  Total
                </p>
                <p className="mt-2 text-2xl font-semibold text-slate-900">
                  {summary.total}
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  Open
                </p>
                <p className="mt-2 text-2xl font-semibold text-slate-900">
                  {summary.open}
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  Resolved
                </p>
                <p className="mt-2 text-2xl font-semibold text-slate-900">
                  {summary.resolved}
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  High Priority
                </p>
                <p className="mt-2 text-2xl font-semibold text-slate-900">
                  {summary.highPriority}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 items-start">
          <div className="xl:col-span-2 rounded-[28px] border border-slate-200 bg-white p-6 md:p-8 shadow-[0_20px_60px_-28px_rgba(15,23,42,0.18)]">
            <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
              <div>
                <h2 className="text-xl md:text-2xl font-semibold text-slate-900">
                  Complaint Form
                </h2>
                <p className="mt-2 text-sm text-slate-500">
                  Your complaint will be recorded and shown in your complaint
                  history below for tracking.
                </p>
              </div>

              <div className="rounded-2xl border border-indigo-100 bg-indigo-50 px-4 py-3 text-sm text-indigo-700">
                <p className="font-semibold">Student details are auto-filled</p>
                <p className="mt-1 text-indigo-600">
                  Only room, complaint type, subject, and description need your input.
                </p>
              </div>
            </div>

            {success && (
              <div className="mb-5 flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-emerald-700">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />
                <span className="text-sm md:text-[15px]">{success}</span>
              </div>
            )}

            {error && (
              <div className="mb-5 flex items-start gap-3 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-rose-700">
                <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
                <span className="text-sm md:text-[15px]">{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  readOnly
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  readOnly
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Room Number <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  name="roomNumber"
                  value={formData.roomNumber}
                  onChange={handleChange}
                  placeholder="Enter your room number"
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-800 outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Hostel Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  name="hostelName"
                  value={formData.hostelName}
                  onChange={handleChange}
                  placeholder="Your Space 1 / Your Space 2"
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-800 outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-800 outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
                >
                  {categories.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Priority
                </label>
                <select
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-800 outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
                >
                  {priorities.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Subject <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  name="subject"
                  maxLength={120}
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Example: WiFi not working in Room 204"
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-800 outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
                  required
                />
                <div className="mt-2 flex justify-end text-xs text-slate-400">
                  {formData.subject.length}/120
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Complaint Description <span className="text-rose-500">*</span>
                </label>
                <textarea
                  name="description"
                  maxLength={1000}
                  value={formData.description}
                  onChange={handleChange}
                  rows="6"
                  placeholder="Describe the issue clearly. Include where it happened, when it started, and how it is affecting you."
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-800 outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 resize-none"
                  required
                />
                <div className="mt-2 flex justify-between text-xs text-slate-400">
                  <span>Clear, short complaints are easier to act on.</span>
                  <span>{formData.description.length}/1000</span>
                </div>
              </div>

              <div className="md:col-span-2 flex flex-col gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-slate-500">
                  Submitted complaints appear in your history with live status
                  tracking.
                </p>

                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
                >
                  <Send className="h-4 w-4" />
                  {loading ? "Submitting..." : "Submit Complaint"}
                </button>
              </div>
            </form>
          </div>

          <div className="space-y-5">
            <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_20px_60px_-28px_rgba(15,23,42,0.16)]">
              <h3 className="text-lg font-semibold text-slate-900">
                Before you submit
              </h3>
              <div className="mt-5 space-y-3 text-sm text-slate-600">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  Use a clear subject so the warden can understand the issue quickly.
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  Mention your room number correctly for faster hostel-level action.
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  Add exact details in the description instead of one-line complaints.
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  Use high priority only for urgent issues like safety, electricity,
                  or water breakdowns.
                </div>
              </div>
            </div>

            <div className="rounded-[28px] border border-slate-200 bg-slate-900 p-6 text-white shadow-[0_20px_60px_-28px_rgba(15,23,42,0.38)]">
              <p className="text-sm font-semibold tracking-wide text-slate-200">
                Complaint workflow
              </p>

              <div className="mt-5 space-y-4 text-sm text-slate-200">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 rounded-full bg-white/10 p-2">
                    <Clock3 className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium text-white">Step 1 — Submission</p>
                    <p className="mt-1 text-slate-300">
                      Your complaint is recorded and shown in your personal history.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-0.5 rounded-full bg-white/10 p-2">
                    <Clock3 className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium text-white">Step 2 — Review</p>
                    <p className="mt-1 text-slate-300">
                      The warden reviews the subject, room details, and issue severity.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-0.5 rounded-full bg-white/10 p-2">
                    <Clock3 className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium text-white">Step 3 — Status update</p>
                    <p className="mt-1 text-slate-300">
                      You can track whether the complaint is pending, in progress, or resolved.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-200">
                Urgent safety issues should be reported to the hostel office immediately in
                addition to submitting a complaint here.
              </div>
            </div>
          </div>
        </div>

        <div
          ref={historyRef}
          className="mt-10 rounded-[28px] border border-slate-200 bg-white p-6 md:p-8 shadow-[0_20px_60px_-28px_rgba(15,23,42,0.16)]"
        >
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h2 className="text-xl md:text-2xl font-semibold text-slate-900">
                My Complaint History
              </h2>
              <p className="mt-2 text-sm text-slate-500">
                Track all your previous complaints and their latest status.
              </p>
            </div>

            <div className="flex w-full flex-col gap-3 lg:w-auto lg:min-w-[420px]">
              <div className="relative">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by subject, room, category, or complaint ID"
                  className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-slate-800 outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
                />
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-600">
                  <Filter className="h-3.5 w-3.5" />
                  Filter
                </div>

                {filters.map((filter) => (
                  <button
                    key={filter}
                    type="button"
                    onClick={() => setActiveFilter(filter)}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                      activeFilter === filter
                        ? "bg-slate-900 text-white shadow-sm"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {fetchError && (
            <div className="mt-6 flex items-start gap-3 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-rose-700">
              <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
              <span className="flex-1 text-sm">{fetchError}</span>
              <button
                type="button"
                onClick={() => fetchComplaints(true)}
                className="inline-flex items-center gap-2 text-sm font-semibold underline underline-offset-2 hover:text-rose-900"
              >
                <RefreshCcw className="h-4 w-4" />
                Retry
              </button>
            </div>
          )}

          {fetching ? (
            <div className="mt-6 space-y-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-32 animate-pulse rounded-3xl border border-slate-100 bg-slate-100"
                />
              ))}
            </div>
          ) : filteredComplaints.length === 0 ? (
            <div className="mt-6 rounded-3xl border border-dashed border-slate-300 bg-slate-50 px-6 py-12 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-sm">
                <MessageSquareWarning className="h-6 w-6 text-slate-500" />
              </div>
              <p className="mt-4 text-base font-semibold text-slate-800">
                {complaints.length === 0
                  ? "No complaints submitted yet"
                  : "No complaints match your current filter"}
              </p>
              <p className="mt-2 text-sm text-slate-500">
                {complaints.length === 0
                  ? "Once you submit a complaint, it will appear here with its current status."
                  : "Try a different search term or switch the active filter."}
              </p>
            </div>
          ) : (
            <div className="mt-6 space-y-4">
              {filteredComplaints.map((item) => (
                <div
                  key={item._id}
                  className="group rounded-[26px] border border-slate-200 bg-white p-5 transition duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-[0_18px_40px_-24px_rgba(15,23,42,0.22)]"
                >
                  <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="text-lg font-semibold text-slate-900">
                          {item.subject}
                        </h3>

                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            statusStyles[item.status] || statusStyles.Pending
                          }`}
                        >
                          {item.status}
                        </span>

                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            priorityStyles[item.priority] || priorityStyles.Medium
                          }`}
                        >
                          {item.priority} Priority
                        </span>
                      </div>

                      <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-slate-600">
                          <Ticket className="h-3.5 w-3.5" />
                          {getComplaintRef(item)}
                        </span>
                        <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-600">
                          {item.category}
                        </span>
                        <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-600">
                          Room: {item.roomNumber}
                        </span>
                        {item.hostelName && (
                          <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-600">
                            {item.hostelName}
                          </span>
                        )}
                      </div>

                      <p className="mt-4 text-sm leading-7 text-slate-600">
                        {item.description}
                      </p>

                      {item.adminNote && (
                        <div className="mt-4 rounded-2xl border border-indigo-200 bg-indigo-50 px-4 py-3">
                          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-indigo-700">
                            Warden Note
                          </p>
                          <p className="mt-1 text-sm leading-6 text-indigo-900">
                            {item.adminNote}
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600 lg:min-w-[210px] lg:items-end">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                          Submitted on
                        </p>
                        <p className="mt-2 font-medium text-slate-800">
                          {formatDate(item.createdAt)}
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                          {formatDateTime(item.createdAt)}
                        </p>
                      </div>

                      {item.status === "Pending" && (
                        <button
                          type="button"
                          onClick={() => handleDeleteComplaint(item._id)}
                          disabled={deletingId === item._id}
                          className="inline-flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm font-medium text-rose-700 transition hover:bg-rose-100 disabled:cursor-not-allowed disabled:opacity-70"
                        >
                          <Trash2 className="h-4 w-4" />
                          {deletingId === item._id ? "Deleting..." : "Delete"}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}