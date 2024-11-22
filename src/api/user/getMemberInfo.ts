import axios from '../basicAxios';

export const getMemberInfo = async () => {
  const response = await axios.get(`/api/member/info`);
  return response.data;
};
