import Button from '@/components/Button/Button';
import { BottomWrapper, CenterLayout } from '@/features/Signup';
import { theme } from '@/styles/theme';
import styled from '@emotion/styled';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const SignUpCompletePage = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/');
  };

  return (
    <CenterLayout>
      <Image src="/assets/images/signup/img-signup-01.svg" alt="team" />
      <Title>
        축하합니다!
        <br /> 회원가입이 완료되었어요.
      </Title>
      <BottomWrapper>
        <Button
          text="시작하기"
          variant="activate"
          onClick={handleButtonClick}
        />
      </BottomWrapper>
    </CenterLayout>
  );
};

export default SignUpCompletePage;

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
