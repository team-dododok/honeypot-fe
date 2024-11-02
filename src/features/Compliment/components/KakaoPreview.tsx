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
      <Image src="/assets/images/stamp/img-stamp-select.svg" alt="stamp" />
      <PreviewContainer>
        <Team>꿀단지</Team>
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
  height: 161px;
  background-color: gray;
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
  color: ${theme.colors.gray50};
  ${theme.typography.detail5};
`;

const CheckButton = styled.div`
  width: 100%;
  height: 37px;
  padding: 10px 85px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 4px;
  border: 0.7px solid ${theme.colors.gray20};
  background: ${theme.colors.gray05};
  color: ${theme.colors.gray90};
  ${theme.typography.body5};
`;
