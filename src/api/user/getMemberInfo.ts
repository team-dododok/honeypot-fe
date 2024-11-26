import { authAxios as axios } from '../authAxios';
import { Member } from './types/Member';

export const getMemberInfo = async (): Promise<Member> => {
  const response = await axios.get(`/api/member/info`);
  return response.data.data;
};
