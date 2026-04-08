import React, { useEffect, useState } from 'react';
import { createNotice, deleteNotice, getAllNotices } from '../../services/api';

const initialForm = {
  title: '',
  message: '',
  category: 'General',
  priority: 'Normal',
  audience: 'All',
  pinned: false,
};

const AdminNotices = () => {
  const [form, setForm] = useState(initialForm);
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchNotices = async () => {
    try {
      const data = await getAllNotices();
      setNotices(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await createNotice(form);
      setForm(initialForm);
      fetchNotices();
    } catch (error) {
      alert(error?.response?.data?.message || 'Failed to create notice');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteNotice(id);
      fetchNotices();
    } catch (error) {
      alert(error?.response?.data?.message || 'Failed to delete notice');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-7xl grid gap-6 lg:grid-cols-[420px_1fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h1 className="text-2xl font-bold text-slate-900">Publish Notice</h1>
          <p className="mt-2 text-sm text-slate-600">
            Share hostel announcements directly with students.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Notice title"
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-400"
              required
            />

            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              rows="5"
              placeholder="Write the notice message"
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-400"
              required
            />

            <div className="grid grid-cols-2 gap-4">
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="rounded-2xl border border-slate-200 px-4 py-3"
              >
                <option>General</option>
                <option>Maintenance</option>
                <option>Fee</option>
                <option>Food</option>
                <option>Event</option>
                <option>Emergency</option>
              </select>

              <select
                name="priority"
                value={form.priority}
                onChange={handleChange}
                className="rounded-2xl border border-slate-200 px-4 py-3"
              >
                <option>Normal</option>
                <option>High</option>
                <option>Urgent</option>
              </select>
            </div>

            <select
              name="audience"
              value={form.audience}
              onChange={handleChange}
              className="w-full rounded-2xl border border-slate-200 px-4 py-3"
            >
              <option>All</option>
              <option>Your Space 1</option>
              <option>Your Space 2</option>
            </select>

            <label className="flex items-center gap-3 text-sm text-slate-700">
              <input
                type="checkbox"
                name="pinned"
                checked={form.pinned}
                onChange={handleChange}
              />
              Pin this notice
            </label>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-2xl bg-slate-900 px-4 py-3 font-semibold text-white transition hover:bg-slate-800"
            >
              {loading ? 'Publishing...' : 'Publish Notice'}
            </button>
          </form>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900">Published Notices</h2>

          <div className="mt-6 space-y-4">
            {notices.length === 0 ? (
              <p className="text-slate-500">No notices published yet.</p>
            ) : (
              notices.map((notice) => (
                <div key={notice._id} className="rounded-2xl border border-slate-200 p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900">{notice.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-slate-600">{notice.message}</p>
                      <p className="mt-3 text-xs text-slate-500">
                        {notice.category} • {notice.priority} • {notice.audience}
                      </p>
                    </div>

                    <button
                      onClick={() => handleDelete(notice._id)}
                      className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-700 hover:bg-red-100"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminNotices;