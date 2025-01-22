import axios from "axios";

// Create an Axios instance
const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT || "http://localhost:3000/api",
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        // Get the token from localStorage or cookies
        const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

        // If token exists, add it to the Authorization header
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        
        return config;
    },
    (error) => {
        // Handle request errors
        return Promise.reject(error);
    }
);

export default axiosInstance;