export const setAccessToken = (accessToken: string) => {
  localStorage.setItem('accessToken', accessToken);
};

export const setRefreshToken = (refreshToken: string) => {
  localStorage.setItem('refreshToken', refreshToken);
};

export const setKakaoAccessToken = (kakaoAccessToken: string) => {
  localStorage.setItem('kakaoAccessToken', kakaoAccessToken);
};

export const getAccessToken = () => {
    return (localStorage.getItem('accessToken'));
};

export const getRefreshToken = () => {
    return localStorage.getItem('refreshToken');
};

export const getKakaoAccessToken = () => {
  return localStorage.getItem('kakaoAccessToken');
};

export const removeKakaoAccessToken = () => {
  return localStorage.removeItem('kakaoAccessToken');
};