export const setAccessToken = (accessToken: string) => {
  localStorage.setItem('accessToken', accessToken);
};

export const setRefreshToken = (refreshToken: string) => {
  localStorage.setItem('refreshToken', refreshToken);
};

export const setKakaoAccessToken = (kakaoAccessToken: string) => {
  localStorage.setItem('kakaoAccessToken', kakaoAccessToken);
};

export const setUuid = (uuid: string) => {
  localStorage.setItem('uuid', uuid);
};

export const setUserName = (userName: string) => {
  localStorage.setItem('userName', userName);
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

export const getUuid = () => {
  return localStorage.getItem('uuid');
};

export const getUserName = () => {
  return localStorage.getItem('userName');
};

export const removeAccessToken = () => {
  return localStorage.removeItem('AccessToken');
};

export const removeRefreshToken = () => {
  return localStorage.removeItem('kakaoRefreshToken');
};

export const removeKakaoAccessToken = () => {
  return localStorage.removeItem('kakaoAccessToken');
};

export const removeUuid = () => {
  return localStorage.removeItem('uuid');
};