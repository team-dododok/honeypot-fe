import DisplayToggle, { ToggleType } from '@/components/Toggle/DisplayToggle';
import { theme } from '@/styles/theme';
import styled from '@emotion/styled';
import React, { useState } from 'react';
import HonyeBlank from './HoneyBlank';

const MainBottomSheet = () => {
  // TODO : 꿀단지 개수 연동
  const [count] = useState(0);
  const [selectedGroupToggle, setSelectedGroupToggle] =
    useState<ToggleType>('card');

  return (
    <Container>
      <Header>
        <Title>
          나의 꿀단지 ({count})
          <img src="/assets/images/main/ic-groupedit.svg" alt="groupedit" />
        </Title>
        <DisplayToggle
          displayType="group"
          selected={selectedGroupToggle}
          disabled={false}
          onClick={(type) => setSelectedGroupToggle(type)}
        />
      </Header>
      {count === 0 && <HonyeBlank />}
    </Container>
  );
};

export default MainBottomSheet;

const Container = styled.div`
  display: flex;
  flex-direction: column;

  width: calc(100% + 40px);
  height: calc(100vh - 60px - 12px - 20px);
  padding: 15px 26px;
  border-radius: 24px 24px 0px 0px;
  margin: 0 -20px;
  background: ${theme.colors.gray00};
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h1`
  ${theme.typography.subtitle1};
  color: ${theme.colors.gray80};

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;

  img {
    cursor: pointer;
  }
`;
