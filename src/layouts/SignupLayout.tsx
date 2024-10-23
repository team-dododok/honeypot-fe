import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import styled from '@emotion/styled';
import { theme } from '@/styles/theme';
import BackButton from '@/components/Button/BackButton';

export interface OutletContext {
  setPreviousPath: (path: string) => void;
}

const SignupLayout: React.FC = () => {
  const [previousPath, setPreviousPath] = useState('');

  return (
    <Container>
      <Header>
        <BackButton to={previousPath} />
        <Title>회원가입</Title>
      </Header>
      <Content>
        <Outlet context={{ setPreviousPath }} />
      </Content>
    </Container>
  );
};

export default SignupLayout;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 26px;
  width: 100%;
  height: 100vh;
`;

const Header = styled.header`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 12px;
  width: 100%;
  margin-bottom: 20px;
`;

const Title = styled.p`
  color: ${theme.colors.gray80};
  ${theme.typography.body2};
`;

const Content = styled.main`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
