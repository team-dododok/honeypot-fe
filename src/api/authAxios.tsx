import {
  getAccessToken,
  getRefreshToken,
  removeAccessToken,
  removeRefreshToken,
  setAccessToken,
  setRefreshToken,
} from '@/utils/storage';
import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { postReissue } from './auth/postReissue';

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
    const originalRequest = error.config;
    /* 토큰 만료 시 */
    const accessToken = getAccessToken() || '';
    const refreshToken = getRefreshToken() || '';
    if (status === 401) {
      try {
        const newToken = await postReissue(accessToken, refreshToken).catch(
          (tokenError) => {
            console.error('토큰 갱신 실패:', tokenError);
            throw tokenError;
          }
        );

        if (newToken) {
          setAccessToken(newToken.accessToken);
          setRefreshToken(newToken.refreshToken);
          originalRequest.headers.Authorization = `Bearer ${newToken.accessToken}`;
          return authAxios(originalRequest);
        }
      } catch (refreshError) {
        console.error('토큰 갱신 중 에러 발생:', refreshError);
        removeAccessToken();
        removeRefreshToken();
        // window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    } else {
      if (!accessToken) {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);
