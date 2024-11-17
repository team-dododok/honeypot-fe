import { theme } from '@/styles/theme';
import styled from '@emotion/styled';
import React from 'react';

interface ReadLetterProps {
  content: string;
  stampImage: string;
}

const ReadLetter = (props: ReadLetterProps) => {
  const { content, stampImage } = props;

  return (
    <Container>
      <Content>{content}</Content>
      <StampImage
        src={stampImage || '/assets/images/stamp/img-stamp-example.svg'}
        width={55}
        height={55}
        alt="꿀도장"
      />
    </Container>
  );
};

export default ReadLetter;

const Container = styled.div`
  width: 100%;
  height: auto;
  min-height: 80px;
  padding: 12px;
  border-radius: 16px;
  background: ${theme.colors.gray05};
  color: ${theme.colors.gray80};
  ${theme.typography.body5};
  position: relative;
`;

const Content = styled.div`
  position: relative;
  z-index: 5;
`;

const StampImage = styled.img`
  position: absolute;
  bottom: 16px;
  right: 16px;
  background: gray;
  z-index: 0;
`;
