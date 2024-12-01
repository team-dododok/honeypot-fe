import { GroupReceivePraiseInfo } from '@/api/receivedPraise/types/ReceivedPraise';
import { GroupSendPraiseInfo } from '@/api/sendPraise/types/SendPraise';
import Button from '@/components/Button/Button';
import { ToggleType } from '@/components/Toggle/DisplayToggle';
import { HoneyLetter } from '@/features/Compliment/types/HoneyLetter';
import HoneyView from '@/features/Stamp/components/Stamp/StampView/Honey/HoneyView';
import ListView from '@/features/Stamp/components/Stamp/StampView/List/ListView';
import { useGroupReceivedPraise } from '@/hooks/receivedPraise/useGroupReceivedPraise';
import { useGroupSendPraise } from '@/hooks/sendPraise/useGroupSendPraise';
import { theme } from '@/styles/theme';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React, { memo, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

interface GroupTabContainerProps {
  type: 'send' | 'receive' | null;
  displayType: ToggleType;
  isSelectMode: boolean;
  onSelectedChange: (count: number) => void;
}

const GroupTabContainer = memo((props: GroupTabContainerProps) => {
  const { type, displayType, isSelectMode, onSelectedChange } = props;

  const navigate = useNavigate();

  const { id } = useParams() || '0';
  const groupId = Number(id);
  const pageSize = 10;

  /* React Query 호출 */
  const queryHook =
    type === 'receive'
      ? useGroupReceivedPraise({
          groupId,
          size: pageSize,
          page: 0,
        })
      : type === 'send'
        ? useGroupSendPraise({
            groupId,
            size: pageSize,
            page: 0,
          })
        : null;

  const data = queryHook?.data;
  console.log('data', data);
  const fetchNextPage = queryHook?.fetchNextPage;
  const hasNextPage = queryHook?.hasNextPage;
  const isFetching = queryHook?.isFetching;

  /* 페이지 끝까지 데이터 가져오기 */
  useEffect(() => {
    if (hasNextPage && !isFetching) {
      fetchNextPage?.();
    }
  }, [hasNextPage, isFetching]);

  let letters: HoneyLetter[] = [];
  if (type === 'send') {
    letters = data
      ? data.pages.flatMap((page) =>
          (page as GroupSendPraiseInfo).sendPraiseInfos.map((praise) => ({
            id: praise.sendPraiseId,
            sender: praise.name,
            receiver: praise.name,
            content: praise.content,
            stampUrl: praise.stampUrl,
            date: praise.sendDate,
          }))
        )
      : [];
  } else if (type === 'receive') {
    letters = data
      ? data.pages.flatMap((page) =>
          (page as GroupReceivePraiseInfo).receivePraiseInfos.map((praise) => ({
            id: praise.receivedPraiseId,
            sender: praise.name,
            receiver: praise.name,
            content: praise.content,
            stampUrl: praise.stampUrl,
            date: praise.receiveDate,
          }))
        )
      : [];
  }

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
          onSelectedChange={onSelectedChange}
        />
      ) : (
        <ListView
          letters={letters}
          isSelectMode={isSelectMode}
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
