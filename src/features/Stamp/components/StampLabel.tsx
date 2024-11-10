import { theme } from '@/styles/theme';
import styled from '@emotion/styled';
import React from 'react';

interface StampLabel {
  id: number;
  image: string; // S3 이미지
  stampName: string;
  selected: number | null;
  onClick: () => void;
}
const StampLabel = (props: StampLabel) => {
  const { id, image, stampName, selected, onClick } = props;

  const handleStampClick = () => {
    onClick();
  };
  return (
    <StampLabelBox $selected={id === selected} onClick={handleStampClick}>
      <StampImage
        src={image || '/assets/images/stamp/img-stamp-select.svg'}
        alt="stamp"
      />
      {stampName}
    </StampLabelBox>
  );
};

export default StampLabel;

const StampLabelBox = styled.button<{ $selected: boolean }>`
  width: auto;
  height: 54px;
  padding: 24px 4px;
  display: flex;
  align-items: center;
  gap: 10px;
  border-radius: 16px;
  background: ${theme.colors.gray05};
  color: ${({ $selected }) =>
    $selected ? theme.colors.brand60 : theme.colors.gray80};
  border: 1px solid
    ${({ $selected }) => ($selected ? theme.colors.brand60 : 'transparent')};
`;

const StampImage = styled.img`
  width: 41px;
  height: 41px;
  background-color: gray;
`;
