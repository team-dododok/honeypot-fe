import axios from '../basicAxios';
import { PostReceivedPraise } from './interfaces/ReceivedPraise';

export const postReceivedPraise = async (
  receivedParise: PostReceivedPraise
) => {
  const response = await axios.post(`/api/receive-praise`, receivedParise);
  return response.data;
};
