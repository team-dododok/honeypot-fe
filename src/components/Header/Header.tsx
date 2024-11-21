import React from 'react';
import styled from '@emotion/styled';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header = ({ onMenuClick }: HeaderProps) => {
  return (
    <HeaderContainer>
      <LogoWrapper>
        <img
          src="/assets/images/logo-typo.svg"
          width={56}
          height={20}
          alt="header-logo"
        />
      </LogoWrapper>
      <IconsWrapper>
        <IconWrapper onClick={onMenuClick}>
          <img src="/assets/icons/menu.svg" alt="header-menu" />
        </IconWrapper>
        <IconWrapper>
          <img src="/assets/icons/notification.svg" alt="header-notification" />
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
  padding: 20px;
  position: absolute;
  z-index: 1;
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
