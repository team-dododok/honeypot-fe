import { authAxios as axios } from '../authAxios';
import { SendCheckData } from './types/SendPraise';

export const getSendCheck = async (praiseUuid: string): Promise<SendCheckData> => {
  const response = await axios.get(`/api/send-praise/check?praise-uuid${praiseUuid}`);
  return response.data.data;
};
