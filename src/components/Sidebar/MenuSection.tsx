import useAnimation from '@/hooks/useAnimation';
import { theme } from '@/styles/theme';
import { MenuItem } from '@/types/constants/MenuItem';
import styled from '@emotion/styled';
import React from 'react';
import { Link } from 'react-router-dom';

interface MenuSectionProps {
  menu: MenuItem;
  isOpen: boolean;
  onMenuClick: () => void;
  onClose: () => void;
}

const MenuSection = ({
  menu,
  isOpen,
  onMenuClick,
  onClose,
}: MenuSectionProps) => {
  const useAnimatedMenu = useAnimation;
  const { isVisible } = useAnimatedMenu(isOpen, 200);

  return (
    <MenuSectionWrapper>
      <MenuTitle onClick={onMenuClick}>{menu.title}</MenuTitle>
      {menu.tab && (
        <SubMenu isOpen={isOpen}>
          {isVisible &&
            menu.tab.map((subMenu) => (
              <SubMenuLink
                key={subMenu.id}
                to={subMenu.path}
                current={
                  window.location.pathname === subMenu.path ? 'true' : 'false'
                }
                onClick={onClose}
              >
                {subMenu.subTitle}
              </SubMenuLink>
            ))}
        </SubMenu>
      )}
    </MenuSectionWrapper>
  );
};

export default MenuSection;

const MenuSectionWrapper = styled.div`
  margin-bottom: 13px;
`;

const MenuTitle = styled.h5`
  color: ${theme.colors.gray80};
  ${({ theme }) => theme.typography.subtitle2};
  margin-bottom: 5px;
  cursor: pointer;
`;

const SubMenu = styled.div<{ isOpen: boolean }>`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 7px 34px;
  box-sizing: border-box;
  border-radius: 16px;
  background: ${theme.colors.gray10};

  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  transition: opacity 0.4s ease;
`;

const SubMenuLink = styled(Link)<{ current: string }>`
  ${theme.typography.body3};
  color: ${({ theme, current }) =>
    current === 'true' ? theme.colors.gray90 : theme.colors.gray80};
`;
