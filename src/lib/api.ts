import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://blog-task-backend-rho.vercel.app/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
