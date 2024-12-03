import { authAxios } from '../authAxios';

export const postLogout = async () => {
  const response = await authAxios.post('/api/auth/kakao-logout', {});
  console.log('로그아웃 성공');
  return response.data.data;
};
