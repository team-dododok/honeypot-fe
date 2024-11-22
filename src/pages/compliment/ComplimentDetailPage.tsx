import Button from '@/components/Button/Button';
import ComplimentLetter from '@/features/Compliment/components/Letter/ComplimentLetter';
import KakaoButton from '@/features/Login/components/KakaoButton';
import { theme } from '@/styles/theme';
import { getAccessToken } from '@/utils/storage';
import styled from '@emotion/styled';
import React, { useState } from 'react';

const ComplimentDetailPage = () => {
  const [sender] = useState('박형준');
  const [receiver] = useState('오진영');
  const content =
    "Baby got passion, ambition 난 보란 듯이Look at that 온몸으로 느끼는 내 몸짓 Baby got Drip, drip, drip, drip, drip, drip, drip Baby got Drip, drip, drip, drip, drip, drip, drip Let 'em out";
  const stampType = 0;
  const saved = false; // 이미 저장된 편지인지 여부
  const accessToken = getAccessToken();

  return (
    <CenterLayout>
      <Content>
        <Title>
          <img
            src="/assets/images/logo-typo.svg"
            width={68}
            height={24}
            alt="꿀단지"
          />
          <Text>
            <Strong>{sender}</Strong>님이 <Strong>{receiver}</Strong>
            님에게 보낸 꿀이에요!
            <br />
            꿀단지에서 팀원들과 꿀 같은 칭찬을 주고받아볼까요?
          </Text>
        </Title>
        <ComplimentLetter
          stampType={stampType}
          receiver={receiver}
          sender={sender}
          content={content}
        >
          <ProjectLabel>꿀단지 프로젝트</ProjectLabel>
        </ComplimentLetter>
      </Content>
      {saved && <Message>이미 저장된 꿀이에요</Message>}
      <ButtonWrapper>
        {accessToken ? (
          <Button
            text={saved ? '나의 꿀단지로 이동하기' : '받은 꿀 저장하기'}
          />
        ) : (
          <KakaoButton text="카카오 로그인하고 꿀 저장하기" />
        )}
      </ButtonWrapper>
    </CenterLayout>
  );
};

export default ComplimentDetailPage;

const CenterLayout = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  position: relative;
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 20px;
`;

const Title = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
`;

const ProjectLabel = styled.div`
  width: 100%;
  display: flex;
  padding: 8px 0px;
  border-radius: 12px;
  background: ${theme.colors.brand05};
  color: ${theme.colors.gray80};
  ${theme.typography.subtitle3}
  text-align: center;
  justify-content: center;
`;

const Text = styled.div`
  color: ${theme.colors.gray80};
  ${theme.typography.body3};
  text-align: center;
  margin-bottom: 16px;
`;

const Strong = styled.span`
  ${theme.typography.subtitle2};
`;

const Message = styled.div`
  color: ${theme.colors.gray60};
  ${theme.typography.body3};
  text-align: center;
`;
const ButtonWrapper = styled.div`
  width: 100%;
  max-width: 480px;
`;
