import Button from '@/components/Button/Button';
import { ToggleType } from '@/components/Toggle/DisplayToggle';
import { HoneyLetter } from '@/features/Compliment/types/HoneyLetter';
import HoneyView from '@/features/Stamp/components/Stamp/StampView/Honey/HoneyView';
import ListView from '@/features/Stamp/components/Stamp/StampView/List/ListView';
import { theme } from '@/styles/theme';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React, { memo } from 'react';
import { useNavigate } from 'react-router-dom';

interface GroupTabContainerProps {
  displayType: ToggleType;
  isSelectMode: boolean;
  selectedIds: number[];
  onSelectedChange: (selectedIds: number[]) => void;
  letters: HoneyLetter[];
}

const GroupTabContainer = memo((props: GroupTabContainerProps) => {
  const { displayType, isSelectMode, selectedIds, onSelectedChange, letters } =
    props;

  const navigate = useNavigate();

  const handleWriteCompliment = () => {
    // 칭찬 작성하기 페이지 이동
    navigate('/compliment/send/target');
  };

  return (
    <Container $isStamp={letters.length === 0}>
      {letters.length === 0 ? (
        <NoStamp>
          <img src="/assets/images/group/stamp/none-stamp.svg" />
          <div>아직 받은 꿀도장이 없어요.</div>
          <Button
            text="친구에게 꿀 보내기"
            variant="normal"
            onClick={handleWriteCompliment}
          />
        </NoStamp>
      ) : displayType === 'honey' ? (
        <HoneyView
          letters={letters}
          isSelectMode={isSelectMode}
          selectedIds={selectedIds}
          onSelectedChange={onSelectedChange}
        />
      ) : (
        <ListView
          letters={letters}
          isSelectMode={isSelectMode}
          selectedIds={selectedIds}
          onSelectedChange={onSelectedChange}
        />
      )}
    </Container>
  );
});

GroupTabContainer.displayName = 'GroupTabContainer';

export default GroupTabContainer;

const Container = styled.div<{ $isStamp: boolean }>`
  width: 100%;
  margin-top: 18px;
  ${({ $isStamp }) =>
    $isStamp &&
    css`
      margin-top: 100px;
      padding: 0 19px;
    `}
`;

const NoStamp = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
  color: ${theme.colors.gray60};
  ${theme.typography.body2}
`;
