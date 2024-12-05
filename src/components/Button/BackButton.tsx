import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';

interface BackButtonProps {
  to?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
  children?: React.ReactNode;
}

const BackButton: React.FC<BackButtonProps> = ({ to, children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const double = location.state?.double;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (to) {
      navigate(to);
    } else {
      e.preventDefault();
      if (double) {
        navigate(-2);
      } else {
        navigate(-1);
      }
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
