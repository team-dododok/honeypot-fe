import useAnimation from '@/hooks/useAnimation';
import { theme } from '@/styles/theme';
import { MenuItem } from '@/types/constants/MenuItem';
import styled from '@emotion/styled';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface MenuSectionProps {
  menu: MenuItem;
  onClose: () => void;
}

const MenuSection = ({ menu, onClose }: MenuSectionProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const useAnimatedMenu = useAnimation;
  const { isVisible } = useAnimatedMenu(isOpen, 100);

  const handleMenuClick = () => {
    setIsOpen((prev) => !prev);
  };

  const hadleMenuClose = () => {
    onClose();
  };

  return (
    <MenuSectionWrapper>
      <MenuTitle onClick={handleMenuClick}>{menu.title}</MenuTitle>
      <SubMenu isOpen={isOpen} isVisible={isVisible}>
        {isVisible &&
          menu.tab.map((subMenu) => (
            <SubMenuLink
              key={subMenu.id}
              to={subMenu.path}
              current={
                window.location.pathname === subMenu.path ? 'true' : 'false'
              }
              onClick={hadleMenuClose}
            >
              {subMenu.subTitle}
            </SubMenuLink>
          ))}
      </SubMenu>
    </MenuSectionWrapper>
  );
};

export default MenuSection;

const MenuSectionWrapper = styled.div`
  margin-bottom: 13px;
`;

const MenuTitle = styled.h5`
  font-size: ${({ theme }) => theme.typography.subtitle2};
  margin-left: 12px;
  margin-bottom: 5px;
  cursor: pointer;
`;

const SubMenu = styled.div<{ isOpen: boolean; isVisible: boolean }>`
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
