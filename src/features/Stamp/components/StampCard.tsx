import { theme } from '@/styles/theme';
import styled from '@emotion/styled';
import React from 'react';

interface StampCardProps {
  imgUrl: string;
  stampName: string;
  count: number;
  totalCount: number;
}
const StampCard = (props: StampCardProps) => {
  const { imgUrl, stampName, count, totalCount } = props;

  return (
    <StampCardBox $isVisible={count !== 0}>
      <StampImage
        src={imgUrl || '/assets/images/stamp/img-stamp-example.svg'}
        width={58}
        height={58}
        alt={stampName}
      />
      <StampLabel>
        <StampName>{stampName}</StampName>
        {count}회 / {totalCount}회
      </StampLabel>
    </StampCardBox>
  );
};

export default StampCard;

const StampCardBox = styled.div<{ $isVisible: boolean }>`
  width: 90px;
  height: 136px;
  padding: 14px 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 6px;
  border-radius: 8px;
  border: 1px solid ${theme.colors.gray10};
  background: ${theme.colors.gray00};
  opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0.4)};
`;

const StampImage = styled.img`
  background: gray;
`;

const StampLabel = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: ${theme.colors.gray60};
  ${theme.typography.body5};
`;

const StampName = styled.div``;
