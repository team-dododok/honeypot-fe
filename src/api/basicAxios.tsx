import axios from 'axios';

const basicAxios = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  },
});
export default basicAxios;
