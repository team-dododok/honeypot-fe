import basicAxios from '../basicAxios';
import { ProfileImage } from './types/Member';

export const getMemberProfileImage = async (): Promise<ProfileImage> => {
  const response = await basicAxios.get(`/api/member/profile-image`);
  return response.data.data;
};
