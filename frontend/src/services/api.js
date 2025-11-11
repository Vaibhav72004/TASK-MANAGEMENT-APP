import axios from 'axios';
import { BACKEND_URL } from '../utils/utils';

const api = axios.create({
  baseURL: BACKEND_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Token invalid/expired: optionally clear token
      localStorage.removeItem('token');
    }
    return Promise.reject(error);
  }
);

export default api;
