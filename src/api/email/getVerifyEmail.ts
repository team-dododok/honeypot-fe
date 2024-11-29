import basicAxios from '../basicAxios';

export const getVerifyEmail = async (email: string, code: string) => {
  const response = await basicAxios.get(
    `/api/auth/check-mail?receiverMail=${email}&verificationNumber=${code}`,
    {}
  );
  return response.data;
};
