import { theme } from '@/styles/theme';
import styled from '@emotion/styled';
import React from 'react';

interface KakaoPreviewProps {
  receiver: string;
  sender: string;
  content: string;
}

const KakaoPreview = (props: KakaoPreviewProps) => {
  const { receiver, sender, content } = props;

  return (
    <KakaoPreviewBox>
      <Image src="/assets/images/compliment/kakao-example.svg" alt="stamp" />
      <PreviewContainer>
        <Team>
          <ProfileImage
            src="/assets/images/compliment/kakao-profile.svg"
            alt="stamp"
          />
          꿀단지
        </Team>
        <Divider />
        <Title>{`['${sender}'님으로부터 꿀(칭찬) 도착]`}</Title>
        <Content>{`TO. ${receiver}\n${content}`}</Content>
        <CheckButton>꿀(칭찬) 확인하기</CheckButton>
      </PreviewContainer>
    </KakaoPreviewBox>
  );
};

export default KakaoPreview;

const KakaoPreviewBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 9px;
  border-radius: 16px;
  border: ${theme.colors.gray05};
  background: ${theme.colors.gray00};
  box-shadow: 0px 0px 8px 0px rgba(201, 201, 201, 0.25);
  overflow: hidden;
`;

const Image = styled.img`
  width: 100%;
`;

const PreviewContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px 14px 12px 14px;
  gap: 9px;
`;

const Team = styled.div`
  display: flex;
  width: 253px;
  align-items: center;
  gap: 8px;
  color: ${theme.colors.black};
  ${theme.typography.subtitle4};
`;

const ProfileImage = styled.img`
  width: 28px;
  height: 28px;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: ${theme.colors.gray10};
`;

const Title = styled.div`
  color: ${theme.colors.gray90};
  ${theme.typography.subtitle4};
`;

const Content = styled.div`
  color: ${theme.colors.kakao};
  ${theme.typography.detail5};
  white-space: pre-wrap;

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
`;

const CheckButton = styled.div`
  width: 100%;
  height: 37px;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 4px;
  border: 0.7px solid ${theme.colors.gray20};
  background: ${theme.colors.gray05};
  color: ${theme.colors.gray90};
  ${theme.typography.body5};
  white-space: nowrap;
`;
