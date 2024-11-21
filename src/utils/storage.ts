export const setAccessToken = (accessToken: string) => {
  localStorage.setItem('accessToken', accessToken);
};

export const setRefreshToken = (accessToken: string) => {
  localStorage.setItem('refreshToken', accessToken);
};

export const getAccessToken = () => {
    return (localStorage.getItem('accessToken'));
};

export const getRefreshToken = () => {
    return localStorage.getItem('refreshToken');
};