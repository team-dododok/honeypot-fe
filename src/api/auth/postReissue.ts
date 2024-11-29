import basicAxios from '@/api/basicAxios';

export const postReissue = async() => {
  const endpoint = '/api/auth/reissue';

  try {
    const response = await basicAxios.post(endpoint, {});
    console.log('토큰 재발급 성공:', response);
    return response.data;
  } catch (error) {
    console.error('토큰 재발급 실패:', error);
    throw error;
  }
};
