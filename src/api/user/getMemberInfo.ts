import { authAxios as axios } from '../authAxios';

export const getMemberInfo = async () => {
  const response = await axios.get(`/api/member/info`);
  return response.data;
};
