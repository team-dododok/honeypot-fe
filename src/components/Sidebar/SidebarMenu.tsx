import React from 'react';
import styled from '@emotion/styled';
import { MENU } from '@/constants/menu';
import { theme } from '@/styles/theme';
import MenuSection from './MenuSection';

interface SidebarMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const SidebarMenu = ({ onClose, isOpen }: SidebarMenuProps) => {
  return (
    <SidebarOverlay isOpen={isOpen}>
      <SidebarContainer isOpen={isOpen}>
        <IconsWrapper>
          <IconWrapper onClick={onClose}>
            <img src="/assets/icons/menu.svg" alt="header-menu" />
          </IconWrapper>
          <IconWrapper>
            <img
              src="/assets/icons/notification.svg"
              alt="header-notification"
            />
          </IconWrapper>
        </IconsWrapper>
        <MenuWrapper>
          {MENU.map((menu) => (
            <MenuSection key={menu.id} menu={menu} onClose={onClose} />
          ))}
        </MenuWrapper>
      </SidebarContainer>
    </SidebarOverlay>
  );
};

export default SidebarMenu;

const SidebarOverlay = styled.div<{ isOpen: boolean }>`
  display: flex;
  justify-content: flex-end;
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  overflow-x: hidden;
  width: 100%;
  max-width: 480px;
  height: 100%;
  background: rgba(102, 98, 93, 0.6);
  backdrop-filter: blur(4px);
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  transition: opacity 0.3s ease;
  pointer-events: ${({ isOpen }) => (isOpen ? 'auto' : 'none')};
`;

const SidebarContainer = styled.div<{ isOpen: boolean }>`
  top: 0;
  right: 0;
  width: 70%;
  height: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  background-color: ${theme.colors.gray00};
  transform: translateX(${({ isOpen }) => (isOpen ? '0' : '100%')});
  transition: transform 0.5s ease;
`;

const IconsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 16px 26px;
`;

const IconWrapper = styled.div`
  cursor: pointer;
`;

const MenuWrapper = styled.div`
  padding: 26px 14px;
`;
