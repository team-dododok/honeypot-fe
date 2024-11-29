import { authAxios as axios } from '../authAxios';
import { PatchGroupOrder } from './types/Group';

export const patchGroupOrder = async ({ groupOrderList }: PatchGroupOrder) => {
  const response = await axios.patch(`/api/group/order`, {
    groupOrderList,
  });
  return response.data;
};
