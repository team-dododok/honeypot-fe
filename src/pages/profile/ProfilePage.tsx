import Profile from '@/features/Profile/components/Profile';
import { theme } from '@/styles/theme';
import styled from '@emotion/styled';
import React from 'react';

const ProfilePage = () => {
  return (
    <Container>
      <Title>마이페이지</Title>
      <Profile />
    </Container>
  );
};

export default ProfilePage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Title = styled.h1`
  ${theme.typography.body2};
  color: ${theme.colors.gray80};
`;
