import { postKakaoLogin } from '@/features/Login/api/kakao';
import { getKakaoAccessTokenUrl } from '@/features/Login/services/oauthToken';
import { setAccessToken, setRefreshToken } from '@/utils/storage';
import axios, { AxiosError } from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const KakaoPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const CODE = new URL(window.location.href).searchParams.get('code');
    const getKakaoToken = async () => {
      try {
        /* 카카오 토큰 받아오기 */
        console.log('code', CODE);
        const KAKAO_ACCESSTOKEN_URL = getKakaoAccessTokenUrl(CODE);
        const response = await axios.post(KAKAO_ACCESSTOKEN_URL, {
          headers: { 'Content-Type': 'application/json' },
        });

        const kakao_accessToken = response.data.access_token;
        console.log('카카오 액세스 토큰', kakao_accessToken);

        /* 로그인 유무 확인 */
        try {
          const response = await postKakaoLogin(kakao_accessToken);
          setAccessToken(response.data.accessToken);
          setRefreshToken(response.data.refreshToken);
          navigate('/');

          // params에 칭찬 글 id가 있을 경우 해당 편지 주소로 이동하기
          // 추후 작성
        } catch (error) {
          if ((error as AxiosError).response?.status === 404) {
            navigate('/signup/agree');
          }
        }
      } catch (error) {
        console.log(error);
        navigate('/login');
      }
    };

    if (!CODE) {
      console.log('code가 없습니다.');
      return;
    } else {
      getKakaoToken();
    }
  }, []);

  return null;
};

export default KakaoPage;
