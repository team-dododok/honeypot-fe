import Button from '@/components/Button/Button';
import { theme } from '@/styles/theme';
import styled from '@emotion/styled';
import React from 'react';

const GroupManagementPage = () => {
  return (
    <Container>
      <img src="/assets/images/group/img-nonestamp.svg" alt="nonestamp" />
      <Text>
        <p>아직 그룹이 없어요.</p>
        <p>새 그룹을 생성해 볼까요?</p>
      </Text>
      <Button text="새 그룹 생성하기" />
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
