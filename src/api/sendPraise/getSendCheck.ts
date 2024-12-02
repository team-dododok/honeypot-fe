import { authAxios as axios } from '../authAxios';

export const getSendCheck = async (praiseUuid: string) => {
  const response = await axios.get(`/api/send-praise/check`, {
    params: { praiseUuid },
  });
  return response.data.data;
};
