import React, { useState } from 'react';
import { Badge as BadgeType } from '../types/Badge';
import styled from '@emotion/styled';
import { theme } from '@/styles/theme';
import BadgeModal from './BadgeModal';

const Badge = (props: BadgeType) => {
  const { id, image, name, goal, isObtain, date } = props;
  const [isBadgeModal, setIsBadgeModal] = useState<boolean>(false);

  const handleClickBadge = () => {
    setIsBadgeModal(!isBadgeModal);
  };

  const handleSaveBadge = () => {
    // 배지 저장하기
  };

  return (
    <>
      <BadgeBox onClick={handleClickBadge}>
        <BadgeImage src={image || '/assets/images/badge/badge.svg'} />
        <BadgeInfo>
          {name}
          <Goal>{goal}</Goal>
        </BadgeInfo>
      </BadgeBox>
      {isBadgeModal && (
        <BadgeModal
          id={id}
          name={name}
          image={image}
          goal={goal}
          isObtain={isObtain}
          date={date}
          onClose={handleClickBadge}
          onConfirm={handleSaveBadge}
        />
      )}
    </>
  );
};

export default Badge;

const BadgeBox = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

const BadgeImage = styled.img`
  width: 80px;
  height: 80px;
`;

const BadgeInfo = styled.div`
  display: flex;
  flex-direction: column;
  color: ${theme.colors.gray80};
  ${theme.typography.body4}
  text-align: center;
  white-space: nowrap;
`;

const Goal = styled.div`
  ${theme.typography.detail5}
`;
