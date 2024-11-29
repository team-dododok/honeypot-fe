import { authAxios as axios } from '../authAxios';

export const patchServiceConsent = async (updatedData: unknown) => {
  await axios.patch(`/api/member/service-consent`, updatedData);
};
