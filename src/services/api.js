import axios from 'axios';

// Create axios instance with base URL
const API = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add a request interceptor to include the auth token in headers
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth API calls
export const authAPI = {
  register: (userData) => API.post('/auth/register', userData),
  login: (credentials) => API.post('/auth/login', credentials),
  getProfile: () => API.get('/auth/me'),
  updateRole: (role) => API.put('/auth/role', { role })
};

// Event API calls
export const eventAPI = {
  getAllEvents: (params) => API.get('/events', { params }),
  getEvent: (id) => API.get(`/events/${id}`),
  createEvent: (eventData) => API.post('/events', eventData),
  updateEvent: (id, eventData) => API.put(`/events/${id}`, eventData),
  deleteEvent: (id) => API.delete(`/events/${id}`),
  getMyEvents: () => API.get('/events/user/my-events')
};

// Application API calls
export const applicationAPI = {
  createApplication: (applicationData) => API.post('/applications', applicationData),
  getMyApplications: () => API.get('/applications/my-applications'),
  getEventApplications: (eventId) => API.get(`/applications/event/${eventId}`),
  updateApplicationStatus: (id, status) => API.put(`/applications/${id}`, { status })
};

// Create a separate instance for file uploads with different content-type header
const FileAPI = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'multipart/form-data'
  }
});

// Add auth token to file upload requests
FileAPI.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// User API calls
export const userAPI = {
  getProfile: () => API.get('/users/profile'),
  updateProfile: (profileData) => API.put('/users/profile', profileData),
  uploadProfileImage: (formData) => FileAPI.post('/users/profile/upload-image', formData)
};

export default API;
