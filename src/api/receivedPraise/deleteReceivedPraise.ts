import axios from '../authAxios';

export const deleteReceivedPraise = async () => {
  const response = await axios.delete(`/api/receive-praise`);
  return response.data;
};
