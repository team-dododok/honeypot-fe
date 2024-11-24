export type BadgeResponse = {
  allBadgeInfos: Badge[];
};

type Badge = {
  name: string;
  description: string;
  imageUrl: string;
  completedDate: string;
};
