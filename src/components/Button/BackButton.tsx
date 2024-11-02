import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';

interface BackButtonProps {
  to?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
  children?: React.ReactNode;
}

const BackButton: React.FC<BackButtonProps> = ({ to, onClick, children }) => {
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (onClick) {
      onClick(e);
    } else if (!to) {
      e.preventDefault();
      navigate(-1);
    }
  };

  return (
    <StyledBackButton to={to || '#'} onClick={handleClick}>
      {children || <img src="/assets/icons/back-arrow.svg" alt="back" />}
    </StyledBackButton>
  );
};

export default BackButton;

const StyledBackButton = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
`;
