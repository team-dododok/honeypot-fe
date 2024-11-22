import axios from '../basicAxios';

export const getMemberProfileImage = async () => {
  const response = await axios.get(`/api/member/profile_image`);
  return response.data;
};
