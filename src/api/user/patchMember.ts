import { authAxios as axios } from '../authAxios';

export const patchMember = async (updatedData: unknown) => {
  const response = await axios.patch(`/api/member`, updatedData);
  return response.data;
};
