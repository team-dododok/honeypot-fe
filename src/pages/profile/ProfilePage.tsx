import Profile from '@/features/Profile/components/Profile';
import styled from '@emotion/styled';
import React from 'react';

const ProfilePage = () => {
  return (
    <Container>
      <Profile />
    </Container>
  );
};

export default ProfilePage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
`;
