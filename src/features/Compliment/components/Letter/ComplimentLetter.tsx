import { theme } from '@/styles/theme';
import styled from '@emotion/styled';
import React from 'react';
import Letter from './Letter';
import { css } from '@emotion/react';

interface ComplimentLetterProps {
  receiver: string;
  sender: string;
  content: string;
  groupName: string;
  honeyStampImage: string;
  onClick?: () => void;
  readOnly?: boolean;
}

const ComplimentLetter = (props: ComplimentLetterProps) => {
  const {
    receiver,
    sender,
    content,
    groupName,
    honeyStampImage,
    onClick,
    readOnly = true,
  } = props;

  return (
    <Container $readOnly={readOnly}>
      <Stamp onClick={onClick}>
        <Image
          src={honeyStampImage || '/assets/images/stamp/stamp-select.svg'}
          alt="꿀도장"
        />
      </Stamp>
      <ProjectLabel>
        {groupName || <Span>{'그룹명을 찾을 수 없어요.'}</Span>}
      </ProjectLabel>
      <Letter
        receiver={receiver}
        sender={sender}
        content={content}
        lineColor={readOnly ? theme.colors.gray05 : theme.colors.gray10}
        totalLength={180}
        readOnly={readOnly}
      />
    </Container>
  );
};

export default ComplimentLetter;

const Container = styled.div<{ $readOnly: boolean }>`
  width: 100%;
  padding: 8px 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 4px;
  border-radius: 16px;
  background: ${theme.colors.gray00};
  ${({ $readOnly }) =>
    $readOnly &&
    css`
      border: 1px solid ${theme.colors.brand10};
    `}
`;

const Stamp = styled.button`
  width: 137px;
  height: 137px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Image = styled.img`
  width: 137px;
  height: 137px;
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

const Span = styled.div`
  color: ${theme.colors.gray50};
  ${theme.typography.body4}
`;
