import { getBadge } from '@/api/badge/getBadge';
import { useQuery } from '@tanstack/react-query';

export const useBadge = () => {
  return useQuery(['badge'], getBadge);
};
