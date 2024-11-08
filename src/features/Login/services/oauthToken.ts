const REDIRECT_URL = import.meta.env.VITE_APP_REDIRECT_URL;
const REST_API_KEY = import.meta.env.VITE_APP_REST_API_KEY;
const CLIENT_SECRET = import.meta.env.VITE_APP_CLIENT_SECRET_CODE;

export const getKakaoAccessTokenUrl = (code:string|null) =>
  `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${REST_API_KEY}&client_secret=${CLIENT_SECRET}&redirect_uri=${REDIRECT_URL}&code=${code}`;