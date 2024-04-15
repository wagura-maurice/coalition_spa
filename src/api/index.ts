// src/api/index.ts
import axios from 'axios';
import type { AxiosRequestConfig, AxiosResponse } from 'axios';

// Create an Axios instance with custom configuration
const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/coalition', // Replace with your API base URL
  timeout: 5000, // Timeout in milliseconds
});

// Request interceptor for logging requests
api.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // Log request details before sending
    // console.log('Request:', config);
    return config;
  },
  (error) => {
    // Log request error
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for logging responses
api.interceptors.response.use(
  (response: AxiosResponse) => {
    // Log response details after receiving
    // console.log('Response:', response);
    return response;
  },
  (error) => {
    // Log response error
    console.error('Response Error:', error);
    return Promise.reject(error);
  }
);

// Export the Axios instance for global usage
export default api;
