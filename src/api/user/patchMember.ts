import axios from '../authAxios';

export const patchMember = async () => {
  const response = await axios.patch(`/api/member`);
  return response.data;
};
