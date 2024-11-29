import { theme } from '@/styles/theme';
import styled from '@emotion/styled';
import React from 'react';
import MainButton from './MainButton';
import { useMemberInfo } from '@/hooks/user/useMemberInfo';

const MainBox = () => {
  const { data: member } = useMemberInfo();

  return (
    <Container>
      <MainLeft>
        <div>
          <h1>{member && member.name} 님,</h1>
          <h2>팀원들에게 꿀을 보내보세요!</h2>
        </div>
        <MainButton />
      </MainLeft>
      <MainImage src="/assets/images/main/smile-bongbong.png" alt="Group" />
    </Container>
  );
};

export default MainBox;

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${theme.colors.gradient02_1};
  border-radius: 24px;
  box-shadow: 0px 0px 8px 0px rgba(201, 201, 201, 0.25);
  padding: 20px 24px;
  margin-bottom: 12px;
  position: relative;
  overflow: hidden;
`;

const MainLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  z-index: 5;

  h1 {
    ${theme.typography.subtitle2};
  }
  h2 {
    ${theme.typography.body4};
    color: ${theme.colors.gray80};
    white-space: nowrap;
  }
`;

const MainImage = styled.img`
  width: 116px;
  height: 150px;
  position: absolute;
  bottom: -20px;
  right: -10px;
  transform: rotate(-8deg);
  z-index: 1;
`;
