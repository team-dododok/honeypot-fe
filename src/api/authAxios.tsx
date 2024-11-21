import { getAccessToken } from '@/utils/storage';
import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';

export const authAxios: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  },
});

authAxios.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getAccessToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

authAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const {
      response: { status },
    } = error;

    /* 토큰 만료 시 */
    if (status === 401) {
      // 토큰 재발급 로직
    }
    return Promise.reject(error);
  }
);
