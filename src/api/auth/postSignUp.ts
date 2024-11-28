import basicAxios from "@/api/basicAxios";
import { getKakaoAccessToken, removeKakaoAccessToken } from "@/utils/storage";
import { SignUpData } from "./types/kakao";

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
