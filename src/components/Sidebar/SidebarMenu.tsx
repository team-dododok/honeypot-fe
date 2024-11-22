import React from 'react';
import styled from '@emotion/styled';
import { MENU } from '@/constants/menu';
import { theme } from '@/styles/theme';
import MenuSection from './MenuSection';
import { useNavigate } from 'react-router-dom';

interface SidebarMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const SidebarMenu = ({ onClose, isOpen }: SidebarMenuProps) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <SidebarOverlay isOpen={isOpen}>
      <SidebarContainer isOpen={isOpen}>
        <div>
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
        </div>
        <BottomWrapper>
          <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
          <LinkWrapper>
            <a
              href="https://www.instagram.com/team.dododok/?hl=ko"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/assets/icons/instagram.svg" alt="인스타그램" />
            </a>
            <a
              href="https://marpple.shop/kr/ddd_bemypeer?fbclid=PAZXh0bgNhZW0CMTEAAab6etiRW2GCm-ePwNECgmbNWhwDLJ4U9G9dfPTliK0XTDaQtliCvQTYsXs_aem_KuLtEDU0IHPS-udw_g0htA"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/assets/icons/shop.svg" alt="마플샵" />
            </a>
          </LinkWrapper>
        </BottomWrapper>
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
  z-index: 100;
`;

const SidebarContainer = styled.div<{ isOpen: boolean }>`
  top: 0;
  right: 0;
  width: 70%;
  height: 100%;
  padding: 16px 26px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: ${theme.colors.gray00};
  transform: translateX(${({ isOpen }) => (isOpen ? '0' : '100%')});
  transition: transform 0.5s ease;
`;

const IconsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 20px;
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  cursor: pointer;
`;

const ProfileImage = styled.img`
  border-radius: 9px;
`;
const MenuWrapper = styled.div`
  padding-top: 20px;
`;

const BottomWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
`;

const LogoutButton = styled.button`
  text-align: left;
  color: ${theme.colors.gray50};
  ${theme.typography.body5}
`;

const LinkWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 9px;
`;
