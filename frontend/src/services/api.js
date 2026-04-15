import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5001/api', 
    headers: {
        'Content-Type': 'application/json',
    },
});


api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export const login = async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
};

export const register = async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
};

export const getMe = async () => {
    const response = await api.get('/auth/me');
    return response.data;
};

export const updateProfile = async (profileData) => {
    const response = await api.put('/auth/profile', profileData);
    return response.data;
};

export const createComplaint = async (complaintData) => {
  const { data } = await api.post("/complaints", complaintData);
  return data;
};

let complaintsPromise = null;

const CACHE_TTL = 300 * 1000; 

const getCachedData = (key) => {
    try {
        const cached = sessionStorage.getItem(key);
        if (!cached) return null;
        const { data, timestamp } = JSON.parse(cached);
        if (Date.now() - timestamp < CACHE_TTL) return data;
    } catch {
       
    }
    return null;
};

const setCachedData = (key, data) => {
    try {
        sessionStorage.setItem(key, JSON.stringify({ data, timestamp: Date.now() }));
    } catch {
       
    }
};

export const getMyComplaints = async (force = false) => {
    if (!force) {
        const cached = getCachedData('global_complaints_cache');
        if (cached) return cached;
    }

    if (!complaintsPromise) {
        complaintsPromise = api.get("/complaints/my").then(res => {
            setCachedData('global_complaints_cache', res.data);
            return res.data;
        }).finally(() => {
            complaintsPromise = null;
        });
    }
    return complaintsPromise;
};

export const getAllComplaints = async () => {
  const { data } = await api.get("/complaints");
  return data;
};

export const updateComplaintStatus = async (id, payload) => {
  const { data } = await api.put(`/complaints/${id}`, payload);
  return data;
};
export const deleteComplaint = async (id) => {
  const { data } = await api.delete(`/complaints/${id}`);
  return data;
};

let noticesPromise = null;
export const getStudentNotices = async (force = false) => {
    if (!force) {
        const cached = getCachedData('global_notices_cache');
        if (cached) return cached;
    }

    if (!noticesPromise) {
        noticesPromise = api.get('/notices/student').then(res => {
            setCachedData('global_notices_cache', res.data);
            return res.data;
        }).finally(() => {
            noticesPromise = null;
        });
    }
    return noticesPromise;
};

export const getAllNotices = async () => {
  const { data } = await api.get('/notices');
  return data;
};

export const createNotice = async (noticeData) => {
  const { data } = await api.post('/notices', noticeData);
  return data;
};

export const deleteNotice = async (id) => {
  const { data } = await api.delete(`/notices/${id}`);
  return data;
};

export default api;
