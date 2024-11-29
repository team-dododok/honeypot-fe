import styled from '@emotion/styled';
import React from 'react';
import Badge from '../Badge';
import { useBadge } from '@/hooks/badge/useBadge';

const BadgeContainer = () => {
  const { data: badgeData } = useBadge();

  const badgeList = badgeData?.allBadgeInfos || [];

  return (
    <BadgeGrid>
      {badgeList.map((item, index) => (
        <Badge
          key={index}
          id={index}
          name={item.name}
          image={item.imageUrl || ''}
          description={item.description}
          completedDate={item.completedDate}
        />
      ))}
    </BadgeGrid>
  );
};

export default BadgeContainer;

const BadgeGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  row-gap: 24px;
  column-gap: 10px;
`;
