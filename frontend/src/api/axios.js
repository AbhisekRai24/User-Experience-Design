import axios from 'axios';
import useAuthStore from '../store/authStore';

const api = axios.create({
  baseURL: '/api',
  // Remove the default Content-Type header
});

api.interceptors.request.use(
  (config) => {
    const { accessToken, isAuthenticated } = useAuthStore.getState();
    
    // Only add token if user is authenticated
    if (isAuthenticated && accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    
    // Only set Content-Type to JSON if it's not FormData
    if (!(config.data instanceof FormData)) {
      config.headers['Content-Type'] = 'application/json';
    }
    // If it IS FormData, let axios set the Content-Type with boundary automatically
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const { refreshToken, isAuthenticated, logout } = useAuthStore.getState();
        
        // Check if user is authenticated before trying to refresh
        if (!isAuthenticated || !refreshToken) {
          logout();
          window.location.href = '/login';
          return Promise.reject(error);
        }

        const response = await axios.post('/api/auth/refresh', {
          refreshToken,
        });

        const { accessToken, user } = response.data;
        useAuthStore.getState().setAuth(user, accessToken, refreshToken);

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        useAuthStore.getState().logout();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;