import { authAxios as axios } from '../authAxios';
import { PostSendPraise } from './types/SendPraise';

export const postSendPraise = async (
  sendParise: PostSendPraise
) => {
  const response = await axios.post(`/api/send-praise`, sendParise);
  return response.data;
};
