import basicAxios from "@/api/basicAxios";
import { SignUpData } from "../types/kakao";
import { getKakaoAccessToken, removeKakaoAccessToken, setKakaoAccessToken } from "@/utils/storage";

export const postKakaoLogin = async (kakaoAccessToken:string) => {
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

export const postSignUp = async ({
  serviceTerm,
  personalInfo,
  emailMarketing,
  name,
  email,
  imageUrl,
  onboarding,
}: SignUpData) => {
  const endpoint = '/api/auth/register';

  try {
    const kakaoAccessToken = getKakaoAccessToken();
    const response = await basicAxios.post(
      endpoint,
      {
        serviceTerm,
        personalInfo,
        emailMarketing,
        name,
        email,
        imageUrl,
        onboarding,
      },
      {
        headers: {
          Authorization: `Bearer ${kakaoAccessToken}`,
        },
      }
    );
    console.log('회원가입 성공:', response);
    removeKakaoAccessToken();
    return response.data;
  } catch (error) {
    console.error('회원가입 실패:', error);
    throw error;
  }
};
