import { authAxios as axios } from '../authAxios';
import { BadgeResponse } from './types/Badge';

export const getBadge = async (): Promise<BadgeResponse> => {
  const response = await axios.get(`/api/badge`);
  return response.data;
};
