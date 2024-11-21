import CloseModal from '@/components/Modal/CloseModal';
import React, { forwardRef } from 'react';
import { BadgeModal as BadgeModalType } from '../types/Badge';
import styled from '@emotion/styled';
import { theme } from '@/styles/theme';
import { formatDateToKorean } from '@/utils/format';

const BadgeModal = forwardRef<HTMLDivElement, BadgeModalType>((props, ref) => {
  const { name, image, goal, isObtain, date, onClose, onConfirm } = props;

  return (
    <CloseModal
      height={isObtain ? '400px' : '330px'}
      gap={isObtain ? '8px' : '0px'}
      confirmText={isObtain ? '저장' : ''}
      buttonIcon={<img src="/assets/icons/download.svg" alt="저장" />}
      onConfirm={onConfirm}
      onClose={onClose}
    >
      <BadgeBox ref={ref}>
        <Date>
          {isObtain && date ? `${formatDateToKorean(date)} 획득` : '미획득'}
        </Date>
        <BadgeImage src={image || '/assets/images/badge/img-badge.svg'} />
        <BadgeInfo>
          {name}
          <Goal>{goal}</Goal>
        </BadgeInfo>
      </BadgeBox>
    </CloseModal>
  );
});

BadgeModal.displayName = 'BadgeModal';
export default BadgeModal;

const BadgeBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 16px;
  gap: 16px;
`;

const Date = styled.div`
  color: ${theme.colors.gray50};
  ${theme.typography.detail3}
`;

const BadgeImage = styled.img`
  width: 140px;
  height: 140px;
`;

const BadgeInfo = styled.div`
  display: flex;
  flex-direction: column;
  color: ${theme.colors.gray80};
  ${theme.typography.body1}
  text-align: center;
  white-space: nowrap;
`;

const Goal = styled.div`
  ${theme.typography.detail4}
`;
