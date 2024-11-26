import basicAxios from "../basicAxios";

export const getMemberProfileImage = async () => {
  const response = await basicAxios.get(`/api/member/profile_image`);
  return response.data;
};