import React from 'react';
import Button from './Button';
import { theme } from '@/styles/theme';

interface SelectButtonProps {
  selected: boolean;
  onClick: () => void;
}

const SelectButton = (props: SelectButtonProps) => {
  const { selected, onClick } = props;

  return (
    <Button
      text={selected ? '취소' : '선택'}
      width="48px"
      height="32px"
      padding="0"
      border={`1px solid ${selected ? theme.colors.warning40 : theme.colors.gray30}`}
      borderRadius="70px"
      background={selected ? theme.colors.warning20 : theme.colors.gray00}
      color={selected ? theme.colors.warning90 : theme.colors.gray50}
      typography="body4"
      onClick={onClick}
    />
  );
};

export default SelectButton;
