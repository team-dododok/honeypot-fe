import { theme } from '@/styles/theme';
import styled from '@emotion/styled';
import React, { useState } from 'react';
import HoneyCard from './HoneyCard';
import Button from '@/components/Button/Button';
import GroupPagination from './GroupPagination';
import { useNavigate } from 'react-router-dom';
import { GroupWithMembersInfo } from '@/api/group/types/Group';

interface HoneyGroupProps {
  group: GroupWithMembersInfo[];
}

const HoneyGroup = ({ group }: HoneyGroupProps) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const totalGroups = group.length || 0;
  const currentGroup = group[currentPage - 1];

  const displayedMembers =
    currentGroup.groupMembers.length > 2
      ? `${currentGroup.groupMembers.slice(0, 2).join(', ')} 외 ${
          currentGroup.groupMembers.length - 2
        }명`
      : currentGroup.groupMembers.join(', ');

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <>
      <Container>
        <Header>
          <div>
            <h1>{currentGroup.groupName} 그룹</h1>
            <p>{displayedMembers}</p>
          </div>
          <img
            src="/assets/icons/right-ward-arrow.svg"
            alt="groupedit"
            onClick={() => {
              navigate(`/group/${currentGroup.groupId}`);
            }}
          />
        </Header>
        <CardBox>
          <HoneyCard type={true} count={currentGroup.receiveCount} />
          <HoneyCard type={false} count={currentGroup.sendCount} />
        </CardBox>
        <Button
          text="이 그룹에 꿀 보내기"
          onClick={() => {
            navigate(`/compliment/send/target`);
          }}
        />
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
  gap: 24px;
  width: 100%;
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
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
`;
