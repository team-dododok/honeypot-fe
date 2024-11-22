import axios from '../basicAxios';
import { GroupResponse } from './interfaces/Group';

export const getGroup = async (): Promise<GroupResponse> => {
  const response = await axios.get(`/api/group`);
  return response.data;
};
