import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// Attaches the JWT access token (stored after OTP login) to every request.
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('ews_access_token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// On 401, attempt a silent refresh once using the stored refresh token.
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    if (error.response?.status === 401 && typeof window !== 'undefined') {
      const refreshToken = localStorage.getItem('ews_refresh_token');
      if (refreshToken) {
        try {
          const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`, {
            refreshToken,
          });
          localStorage.setItem('ews_access_token', data.accessToken);
          localStorage.setItem('ews_refresh_token', data.refreshToken);
          error.config.headers.Authorization = `Bearer ${data.accessToken}`;
          return api.request(error.config);
        } catch {
          localStorage.removeItem('ews_access_token');
          localStorage.removeItem('ews_refresh_token');
          window.location.href = '/auth/login';
        }
      }
    }
    return Promise.reject(error);
  },
);
