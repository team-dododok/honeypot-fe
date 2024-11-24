import { theme } from '@/styles/theme';
import styled from '@emotion/styled';
import React from 'react';

interface GroupListBox {
  id: number;
  currentId: number;
  groupName: string;
  selected: boolean;
  onClick: (id: number) => void;
}

const GroupListBox = (props: GroupListBox) => {
  const { id, currentId, groupName, selected, onClick } = props;

  const handleSelectedGroupBox = (id: number) => {
    if (id === currentId) return;
    if (id !== null) {
      onClick(id);
    }
  };

  return (
    <GroupListBoxContainer
      isAdd={id === -1}
      selected={selected}
      current={id === currentId}
      onClick={() => handleSelectedGroupBox(id)}
    >
      {groupName}
      {selected ? (
        <Selected>선택</Selected>
      ) : (
        id === currentId && <Selected>현재 그룹</Selected>
      )}
    </GroupListBoxContainer>
  );
};

export default GroupListBox;

const GroupListBoxContainer = styled.div<{
  isAdd: boolean;
  selected: boolean;
  current: boolean;
}>`
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
  background: ${({ selected, current, theme }) =>
    selected
      ? theme.colors.brand10
      : current
        ? theme.colors.gray10
        : theme.colors.gray05};
  color: ${({ selected, current, theme }) =>
    selected
      ? theme.colors.brand80
      : current
        ? theme.colors.gray50
        : theme.colors.gray80};
  ${theme.typography.body3};
  ${({ isAdd, selected, theme }) =>
    isAdd || selected ? theme.typography.subtitle2 : theme.typography.body3};
  cursor: pointer;
`;

const Selected = styled.div`
  ${theme.typography.body3};
`;
