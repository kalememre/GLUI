'use client';

// ** Axios Import
import axios from 'axios';
// ** Auth Config
import toast from 'react-hot-toast';

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

axiosInstance.interceptors.request.use(
    (config) => {
        if (typeof window !== 'undefined') {
            const token = window.localStorage.getItem('token');
            if (token) {
                config.headers['Authorization'] = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        // 401 Unauthorized
        if (error.response && error.response.status === 401) {
            if (typeof window !== 'undefined') {
                window.localStorage.removeItem('token');
                window.location.href = '/login';
            }
            toast.error("You're not logged in");
        }

        // 403 Forbidden
        else if (error.response && error.response.status === 403) {
            toast.error("You don't have permission to perform this action");
        }

        // Other Errors
        else if (error.response && error.response.data?.message) {
            toast.error(error.response.data.message);
        } else {
            toast.error('An error occurred');
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
