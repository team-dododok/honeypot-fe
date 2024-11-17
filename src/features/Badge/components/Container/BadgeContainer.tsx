import styled from '@emotion/styled';
import React from 'react';
import { BADGES } from '../../constants/badge';
import Badge from '../Badge';

const BadgeContainer = () => {
  return (
    <BadgeGrid>
      {BADGES.map((item) => (
        <Badge
          key={item.id}
          id={item.id}
          name={item.name}
          image={item.image || ''}
          goal={item.goal}
          isObtain={item.isObtain}
          date={item.date}
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
  column-gap: 28px;
`;
