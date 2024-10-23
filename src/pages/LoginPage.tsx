import styled from '@emotion/styled';
import Button from '@/components/Button/Button';
import React from 'react';
import { theme } from '@/styles/theme';
import { floatAnimation } from '@/styles/Animation';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/signup/agree');
  };

  return (
    <PageContainer>
      <Logo src="/assets/images/logo-typo.svg" alt="logo" />
      <Title>
        함께한 팀원들에게 따뜻한 칭찬을 전하며
        <br /> 서로 응원해보는 건 어떠세요?
      </Title>
      <Image src="/assets/images/login/img-login-01.svg" alt="team" />
      <BottomWrapper>
        <Bubble>⚡️ 3초만에 가입하고 칭찬 보내기 ⚡️</Bubble>
        <Button
          text="카카오톡으로 로그인"
          icon={<img src="/assets/icons/kakao.svg" alt="kakao" />}
          background="#FEE500"
          color="#4A4642"
          onClick={handleButtonClick}
        />
      </BottomWrapper>
    </PageContainer>
  );
};

export default LoginPage;

const PageContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  color: ${theme.colors.gray80};
`;

const Logo = styled.img`
  height: 60px;
  margin-top: 60px;
  margin-bottom: 20px;
  width: 150px;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 56px;
  ${theme.typography.body3};
`;

const Image = styled.img`
  width: 100%;
  height: 280px;
  margin-bottom: 48px;
  width: 100%;
  max-width: 300px;
  background-color: gray;
`;

const BottomWrapper = styled.div`
  width: 100%;
  max-width: 360px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  bottom: 22px;
  left: 50%;
  transform: translateX(-50%);
  padding: 0 25px;
`;

const Bubble = styled.div`
  background-color: ${theme.colors.gray00};
  border-radius: 24px;
  border: 1px solid ${theme.colors.warning90};
  padding: 9px 16px;
  margin-bottom: 12px;
  display: inline-block;
  animation: ${floatAnimation} 2s ease-in-out infinite;
  position: relative;
  ${theme.typography.body5};

  &:before {
    border-top: 3px solid transparent;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-bottom: 9px solid ${theme.colors.warning90};
    content: '';
    position: absolute;
    bottom: -12px;
    left: 50%;
    transform: translateX(-50%) rotate(-180deg);
    z-index: 0;
    border-radius: 0 0 0 2px;
  }

  &:after {
    border-top: 0 solid transparent;
    border-left: 5.5px solid transparent;
    border-right: 5.5px solid transparent;
    border-bottom: 8px solid ${theme.colors.gray00};
    content: '';
    position: absolute;
    bottom: -6.5px;
    left: 50%;
    transform: translateX(-50%) rotate(-180deg);
    z-index: 100;
  }
`;
