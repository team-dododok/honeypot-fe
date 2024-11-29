import basicAxios from '@/api/basicAxios';
import { setKakaoAccessToken } from '@/utils/storage';

export const postKakaoLogin = async (kakaoAccessToken: string) => {
  const endpoint = '/api/auth/kakao-login';

  try {
    const response = await basicAxios.post(
      endpoint,
      {},
      {
        headers: {
          Authorization: `Bearer ${kakaoAccessToken}`,
        },
      }
    );
    console.log('카카오 로그인 성공:', response);
    return response.data;
  } catch (error) {
    console.error('카카오 로그인 실패:', error);
    setKakaoAccessToken(kakaoAccessToken);
    throw error;
  }
};
