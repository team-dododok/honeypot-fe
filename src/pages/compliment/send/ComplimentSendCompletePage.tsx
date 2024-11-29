import Button from '@/components/Button/Button';
import { BottomWrapper } from '@/layouts/FormLayoutStyles';
import { theme } from '@/styles/theme';
import styled from '@emotion/styled';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const ComplimentSendCompletePage = () => {
  const navigate = useNavigate();
  const receiver = '도도독사우르스';

  const handleButtonClick = () => {
    navigate('/');
  };

  return (
    <CenterLayout>
      <Image data="/assets/images/compliment/bongbong-complete.svg" />
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

const CenterLayout = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 56px;
  color: ${theme.colors.gray80};
  ${theme.typography.body1};
`;

const Image = styled.object`
  width: 100%;
  margin-bottom: 48px;
`;
