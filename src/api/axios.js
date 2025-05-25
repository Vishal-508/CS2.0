import axios from 'axios';
import { toast } from 'react-hot-toast';
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
 withCredentials: false,
});

// Request interceptor
api.interceptors.request.use(
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

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    if (status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    } else if (status === 400) {
      const message = error.response?.data?.error || 'Bad Request';
      toast.error(message);
    }

    return Promise.reject(error);
  }
);
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response && error.response.status === 401) {
//       localStorage.removeItem('token');
//       window.location.href = '/login';
//     }
//     return Promise.reject(error);
//   }
// );

export default api;