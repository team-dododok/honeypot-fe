import axios from '../authAxios';
import { PostReceivedPraise } from './types/ReceivedPraise';

export const postReceivedPraise = async (
  receivedParise: PostReceivedPraise
) => {
  const response = await axios.post(`/api/receive-praise`, receivedParise);
  return response.data;
};
