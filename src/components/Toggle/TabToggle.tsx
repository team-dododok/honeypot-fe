import { theme } from '@/styles/theme';
import styled from '@emotion/styled';
import React from 'react';

export interface Tabs {
  id: number;
  tabName: string;
}

interface TabToggleProps {
  tabs: Tabs[];
  selected: number;
  onClick: (id: number) => void;
}

const TabToggle = (props: TabToggleProps) => {
  const { tabs, selected, onClick } = props;
  return (
    <TabToggleContainer>
      {tabs.map((item) => (
        <TabToggleButton
          key={item.id}
          $isSelected={selected === item.id}
          onClick={() => onClick(item.id)}
        >
          {item.tabName}
        </TabToggleButton>
      ))}
    </TabToggleContainer>
  );
};

export default TabToggle;

const TabToggleContainer = styled.div`
  width: 100%;
  height: 42px;
  padding: 4px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 8px;
  background: ${theme.colors.gray10};
`;

const TabToggleButton = styled.button<{ $isSelected: boolean }>`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  color: ${({ $isSelected }) =>
    $isSelected ? theme.colors.gray80 : theme.colors.gray30};
  background: ${({ $isSelected }) =>
    $isSelected ? theme.colors.gray00 : 'transparent'};
  ${theme.typography.body4};
`;
