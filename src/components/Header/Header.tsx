import React from 'react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header = ({ onMenuClick }: HeaderProps) => {
  const navigate = useNavigate();

  return (
    <HeaderContainer>
      <LogoWrapper onClick={() => navigate('/')}>
        <img
          src="/assets/images/logo-typo.svg"
          width={56}
          height={20}
          alt="header-logo"
          onClick={() => {
            navigate('/');
          }}
        />
      </LogoWrapper>
      <IconsWrapper>
        <IconWrapper>
          <img
            src="/assets/icons/profile.svg"
            alt="header-profile"
            onClick={() => {
              navigate('/profile');
            }}
          />
        </IconWrapper>
        <IconWrapper onClick={onMenuClick}>
          <img src="/assets/icons/menu.svg" alt="header-menu" />
        </IconWrapper>
      </IconsWrapper>
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 26px 16px 26px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100%;
`;

const LogoWrapper = styled.div`
  cursor: pointer;
`;

const IconsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const IconWrapper = styled.div`
  cursor: pointer;
`;
