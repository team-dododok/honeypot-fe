import { theme } from '@/styles/theme';
import styled from '@emotion/styled';
import React, { useState } from 'react';
import HoneyCard from './HoneyCard';
import Button from '@/components/Button/Button';
import GroupPagination from './GroupPagination';
import { GROUP_LIST } from '../constants/GroupList';

const HoneyGroup = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalGroups = GROUP_LIST.length;

  const currentGroup = GROUP_LIST[currentPage - 1];

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const displayedMembers =
    currentGroup.groupMembers.length > 2
      ? `${currentGroup.groupMembers.slice(0, 2).join(', ')} 외 ${
          currentGroup.groupMembers.length - 2
        }명`
      : currentGroup.groupMembers.join(', ');

  return (
    <>
      <Container>
        <Header>
          <div>
            <h1>{currentGroup.groupName} 그룹</h1>
            <p>{displayedMembers}</p>
          </div>
          <img
            src="/assets/images/main/icn-rightwardarrow-16-varient.svg"
            alt="groupedit"
          />
        </Header>
        <CardBox>
          <HoneyCard type={true} count={currentGroup.receivedHoney} />
          <HoneyCard type={false} count={currentGroup.sentHoney} />
        </CardBox>
        <Button text="이 그룹에 꿀 보내기" />
      </Container>
      <GroupPagination
        currentPage={currentPage}
        totalGroups={totalGroups}
        onPageChange={handlePageChange}
        type="group"
      />
    </>
  );
};

export default HoneyGroup;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;

  wdith: 100%;
  height: 100%;

  padding: 16px 22px;
  border-radius: 24px;
  border: 1px solid ${(props) => props.theme.colors.gray10};
  background: ${(props) => props.theme.colors.gray05};
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;

  h1 {
    ${theme.typography.subtitle1};
    color: ${theme.colors.gray80};
  }
  p {
    ${theme.typography.body4};
    color: ${theme.colors.gray50};
  }
  img {
    cursor: pointer;
  }
`;

const CardBox = styled.div`
  display: flex;
  gap: 12px;
  width: 100%;
`;
