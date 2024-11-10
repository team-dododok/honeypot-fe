import { getKakaoAccessTokenUrl } from '@/features/Login/services/oauthToken';
import axios from 'axios';
import React, { useEffect } from 'react';
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
        // API 연결

        navigate('/signup/agree');
        // navigate('/');
      } catch (error) {
        navigate('/login');
        console.log(error);
      }
    };
    if (!CODE) {
      console.log('code가 없습니다.');
      return;
    } else {
      getKakaoToken();
    }
  }, []);

  return <div>KakaoPage</div>;
};

export default KakaoPage;
