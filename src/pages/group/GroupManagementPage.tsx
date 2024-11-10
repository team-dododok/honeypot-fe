import ArrowButton from '@/components/Button/ArrowButton';
import Button from '@/components/Button/Button';
import { theme } from '@/styles/theme';
import styled from '@emotion/styled';
import React, { useState } from 'react';

const GroupManagementPage = () => {
  const [hasGroup, setHasGroup] = useState(true);

  return (
    <Container>
      {hasGroup ? (
        <GroupList>
          <Button text="새 그룹 생성하기" />
          <ButtonBox>
            <img src="/assets/icons/ic-move-20.svg" alt="move" />
            <img src="/assets/icons/icon-trash.svg" alt="trash" />
            <ArrowButton
              text="A그룹A그룹A그룹"
              direction="right"
              onClick={() => {}}
            />
          </ButtonBox>
        </GroupList>
      ) : (
        <>
          <img src="/assets/images/group/img-nonestamp.svg" alt="nonestamp" />
          <Text>
            <p>아직 그룹이 없어요.</p>
            <p>새 그룹을 생성해 볼까요?</p>
          </Text>
          <Button text="새 그룹 생성하기" />
        </>
      )}
    </Container>
  );
};

export default GroupManagementPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
  width: 100%;
  height: calc(100% - 164px);
`;

const Text = styled.div`
  color: ${theme.colors.gray80};
  ${theme.typography.body2};
  text-align: center;
`;

const GroupList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  width: 100%;
  text-align: center;

  h2 {
    color: ${theme.colors.primary};
    ${theme.typography.h4};
  }

  p {
    color: ${theme.colors.gray60};
    ${theme.typography.body1};
  }
`;

const ButtonBox = styled.div`
  width: 100%;
  display: flex;
  gap: 12px;
`;
