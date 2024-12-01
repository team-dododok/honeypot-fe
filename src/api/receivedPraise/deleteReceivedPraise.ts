import { authAxios as axios } from '../authAxios';

export const deleteReceivedPraise = async (ids: number[]) => {
  const response = await axios.delete(
    `/api/receive-praise?id=${ids.map(String).join(',')}`
  );
  return response.data;
};
