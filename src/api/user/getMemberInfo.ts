import basicAxios from '../basicAxios';
import { Member } from './types/Member';

export const getMemberInfo = async (): Promise<Member> => {
  const response = await basicAxios.get(`/api/member/info`);
  return response.data.data;
};
