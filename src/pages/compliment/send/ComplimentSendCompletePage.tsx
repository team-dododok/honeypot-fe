import Button from '@/components/Button/Button';
import { BottomWrapper, CenterLayout } from '@/layouts/FormLayoutStyles';
import { theme } from '@/styles/theme';
import styled from '@emotion/styled';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const ComplimentSendCompletePage = () => {
  const navigate = useNavigate();
  const receiver = '도도독사우르스'; // 나중에 수정

  const handleButtonClick = () => {
    navigate('/');
  };

  return (
    <CenterLayout>
      <Image src="/assets/images/signup/img-signup-01.svg" alt="team" />
      <Title>
        `{receiver}`님에게
        <br /> 칭찬이 전달되었어요!
      </Title>
      <BottomWrapper>
        <Button text="확인" variant="activate" onClick={handleButtonClick} />
      </BottomWrapper>
    </CenterLayout>
  );
};

export default ComplimentSendCompletePage;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 56px;
  color: ${theme.colors.gray80};
  ${theme.typography.body1};
`;

const Image = styled.img`
  width: 100%;
  height: 280px;
  margin-bottom: 48px;
  width: 100%;
  max-width: 300px;
  background-color: gray;
`;
