import basicAxios from "@/api/basicAxios";
import { SignUpData } from "../types/kakao";

export const postKakaoLogin = async (kakaoAccessToken:string) => {
  const endpoint = '/api/auth/kakao-login';

  try {
    const response = await basicAxios.post(endpoint, {
      headers: {
        Authorization: `Bearer ${kakaoAccessToken}`,
      },
    });
    console.log('카카오 로그인 성공:', response);
    return response.data;
  } catch (error) {
    console.error('카카오 로그인 실패:', error);
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
    const response = await basicAxios.post(endpoint, {
      serviceTerm,
      personalInfo,
      emailMarketing,
      name,
      email,
      imageUrl,
      onboarding,
    });
    console.log('회원가입 성공:', response);
    return response.data;
  } catch (error) {
    console.error('회원가입 실패:', error);
    throw error;
  }
};
