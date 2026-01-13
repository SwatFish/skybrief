import axios from 'axios';

// API client configured for future backend integration
export const apiClient = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for future auth tokens
apiClient.interceptors.request.use(
  (config) => {
    // Future: Add auth token here
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Centralized error handling
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export default apiClient;
