import React from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';

interface BackButtonProps {
  to: string;
  children?: React.ReactNode;
}

const StyledBackButton = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
`;

const BackButton: React.FC<BackButtonProps> = ({ to, children }) => {
  return (
    <StyledBackButton to={to}>
      {children || <img src="/assets/icons/back-arrow.svg" alt="back" />}
    </StyledBackButton>
  );
};

export default BackButton;
