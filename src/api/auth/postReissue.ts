import basicAxios from '@/api/basicAxios';
import { getAccessToken, getRefreshToken, setAccessToken, setRefreshToken } from '@/utils/storage';

export const postReissue = async () => {
  const endpoint = '/api/auth/reissue';

  const accessToken = getAccessToken() || '';
  const refreshToken = getRefreshToken() || '';
  try {
    const response = await basicAxios.post(endpoint, {accessToken: accessToken, refreshToken: refreshToken});
    console.log('토큰 재발급 성공:', response);
    setAccessToken(response.data.data.accessToken);
    setRefreshToken(response.data.data.refreshToken);
    return response.data.data;
  } catch (error) {
    console.error('토큰 재발급 실패:', error);
    throw error;
  }
};
