import { theme } from '@/styles/theme';
import styled from '@emotion/styled';
import React from 'react';

export type DisplayType = 'group' | 'stamp';
export type ToggleType = 'card' | 'list' | 'honey';

interface DisplayToggleProps {
  displayType: DisplayType;
  selected: ToggleType;
  disabled?: boolean;
  onClick: (type: ToggleType) => void;
}

const iconTypes: Record<DisplayType, [ToggleType, ToggleType]> = {
  group: ['card', 'list'],
  stamp: ['honey', 'list'],
};

const DisplayToggle = (props: DisplayToggleProps) => {
  const { displayType, selected, disabled, onClick } = props;

  const getIconPath = (type: ToggleType) =>
    `/assets/icons/toggle/${displayType}/toggle-${displayType}-${type}${disabled ? '-disabled' : selected === type ? '-selected' : ''}.svg`;

  return (
    <DisplayToggleContainer>
      {iconTypes[displayType].map((type, index) => (
        <>
          <DisplayToggleButton
            key={type}
            onClick={() => !disabled && onClick(type)}
          >
            <img src={getIconPath(type)} width={36} height={36} alt="toggle" />
          </DisplayToggleButton>
          {index === 0 && <Bar />}
        </>
      ))}
    </DisplayToggleContainer>
  );
};

export default DisplayToggle;

const DisplayToggleContainer = styled.div`
  width: 92px;
  display: flex;
  padding: 2px 6px;
  justify-content: center;
  align-items: center;
  gap: 4px;
  border-radius: 16px;
  border: 1px solid ${theme.colors.gray10};
`;

const DisplayToggleButton = styled.button`
  width: 36px;
  height: 36px;
`;

const Bar = styled.div`
  width: 1px;
  height: 21px;
  background: ${theme.colors.gray10};
`;
