import React, { useRef, useState } from 'react';
import { Badge as BadgeType } from '../types/Badge';
import styled from '@emotion/styled';
import { theme } from '@/styles/theme';
import BadgeModal from './BadgeModal';
import { saveImageFromRef } from '@/utils/saveImage';

const Badge = (props: BadgeType) => {
  const { id, image, name, description, completedDate } = props;
  const [isBadgeModal, setIsBadgeModal] = useState<boolean>(false);
  const badgeBoxRef = useRef<HTMLDivElement>(null);

  const handleClickBadge = () => {
    setIsBadgeModal(!isBadgeModal);
  };

  const handleSaveBadge = async () => {
    if (badgeBoxRef.current) {
      saveImageFromRef(
        badgeBoxRef,
        `${name} 뱃지.png`,
        '308px',
        null,
        '16px',
        null,
        '16px'
      );
    }
  };

  return (
    <>
      <BadgeBox onClick={handleClickBadge}>
        <BadgeImage
          // src={completedDate ? image : '/assets/images/badge/badge.svg'}
          src={'/assets/images/badge/badge.svg'}
        />
        <BadgeInfo>
          {name}
          <Goal>{description}</Goal>
        </BadgeInfo>
      </BadgeBox>
      {isBadgeModal && (
        <BadgeModal
          id={id}
          name={name}
          image={image}
          description={description}
          completedDate={completedDate}
          onClose={handleClickBadge}
          onConfirm={handleSaveBadge}
          ref={badgeBoxRef}
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
