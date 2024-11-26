export type Member = {
  memberId: number;
  name: string;
  email: string;
  imageUrl: string;
  receivePraiseCount: number;
  sendPraiseCount: number;
  bestStamp: string;
};

export type ProfileImage = {
  profileImageUrl: {
    [key: string]: string;
  };
};
