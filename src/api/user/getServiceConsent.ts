import { authAxios as axios } from '../authAxios';
import { ServiceConsent } from './types/Service';

export const getServiceConsent = async (): Promise<ServiceConsent> => {
  const response = await axios.get(`/api/member/service-consent`);
  return response.data.data;
};
