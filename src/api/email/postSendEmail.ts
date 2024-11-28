import basicAxios from "../basicAxios";

export const postSendEmail = async (receiverMail: string) => {
  const response = await basicAxios.post(`/api/auth/send-mail`, receiverMail);
  return response.data;
};
