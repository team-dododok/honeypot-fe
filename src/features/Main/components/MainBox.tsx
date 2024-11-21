import { theme } from '@/styles/theme';
import styled from '@emotion/styled';
import React, { useState } from 'react';
import MainButton from './MainButton';

const MainBox = () => {
  // TODO: user 이름 연동
  const [name] = useState('도도독사우루스');

  return (
    <Container>
      <MainLeft>
        <div>
          <h1>{name}님,</h1>
          <h2>팀원들에게 꿀을 보내보세요!</h2>
        </div>
        <MainButton />
      </MainLeft>
      <img src="/assets/images/main/Group.svg" alt="Group" />
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
  margin: 20px;
`;

const MainLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;

  h1 {
    ${theme.typography.subtitle2};
  }
  h2 {
    ${theme.typography.body4};
    color: ${theme.colors.gray80};
  }
`;
