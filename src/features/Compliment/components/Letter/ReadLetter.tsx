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
      <StampImage data={stampImage} />
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

const StampImage = styled.div<{ data: string }>`
  width: 48px;
  height: 55px;
  background-image: url(${(props) => props.data});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  cursor: pointer;

  position: absolute;
  bottom: 10px;
  right: 10px;
  z-index: 0;
`;
