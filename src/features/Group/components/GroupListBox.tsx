import { theme } from '@/styles/theme';
import styled from '@emotion/styled';
import React from 'react';

interface GroupListBox {
  id: number;
  groupName: string;
  selected: boolean;
  onClick: (id: number) => void;
}

const GroupListBox = (props: GroupListBox) => {
  const { id, groupName, selected, onClick } = props;

  const handleSelectedGroupBox = (id: number) => {
    if (id) {
      onClick(id);
    }
  };

  return (
    <GroupListBoxContainer
      selected={selected}
      onClick={() => handleSelectedGroupBox(id)}
    >
      {groupName}
      {selected && <Selected>선택</Selected>}
    </GroupListBoxContainer>
  );
};

export default GroupListBox;

const GroupListBoxContainer = styled.div<{ selected: boolean }>`
  width: 100%;
  height: 50px;
  padding: 12px 22px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 16px;
  border: 1px solid
    ${({ selected, theme }) =>
      selected ? theme.colors.brand60 : theme.colors.gray10};
  background: ${({ selected, theme }) =>
    selected ? theme.colors.brand10 : theme.colors.gray05};
  color: ${({ selected, theme }) =>
    selected ? theme.colors.brand80 : theme.colors.gray80};
  ${theme.typography.body3};
  ${({ selected, theme }) =>
    selected ? theme.typography.subtitle2 : theme.typography.body3};
`;

const Selected = styled.div`
  ${theme.typography.body3};
`;
