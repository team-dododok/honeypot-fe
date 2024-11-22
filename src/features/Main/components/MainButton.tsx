import React from 'react';
import styled from '@emotion/styled';
import { theme } from '@/styles/theme';
import { useNavigate } from 'react-router-dom';

const MainButton = () => {
  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate('/compliment/send/target');
  };

  return (
    <Button onClick={handleButtonClick}>
      <p>칭찬의 꿀 보내기</p>
      <img src="/assets/icons/right-ward-arrow.svg" alt="Group" />
    </Button>
  );
};

export default MainButton;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  padding: 13px 16px;
  border-radius: 16px;
  border: 1px solid var(--Brand-Color-30, #fd8);
  background: ${theme.colors.gradient01};

  ${theme.typography.subtitle3};
  color: ${theme.colors.gray80};
`;
