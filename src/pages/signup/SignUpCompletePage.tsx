import Button from '@/components/Button/Button';
import { BottomWrapper, CenterLayout } from '@/layouts/FormLayoutStyles';
import { useSignUpStore } from '@/store/useSignupStore';
import { theme } from '@/styles/theme';
import styled from '@emotion/styled';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const SignUpCompletePage = () => {
  const navigate = useNavigate();
  const { name, clearState } = useSignUpStore();

  const handleButtonClick = () => {
    clearState();
    navigate('/');
  };

  return (
    <CenterLayout>
      <Title>{`반가워요${name && `, '${name}'님`}!`}</Title>
      <Image data="/assets/images/signup/signup.svg" />
      <Text>
        꿀단지에서 팀원들과 칭찬을 주고받으며
        <br />
        서로를 응원하러 가볼까요?
      </Text>
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
  color: ${theme.colors.gray90};
  ${theme.typography.heading3};
`;

const Image = styled.object`
  width: 100%;
  margin-bottom: 48px;
`;

const Text = styled.p`
  text-align: center;
  color: ${theme.colors.gray90};
  ${theme.typography.body3};
  margin-bottom: 70px;
`;
