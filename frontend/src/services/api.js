import axios from 'axios';

const API = axios.create({
  baseURL: 'https://day-six.onrender.com',
  withCredentials: true
});

// Auto set token if logged in
API.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user?.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

export default API;
