import styled from '@emotion/styled';
import React, { useState } from 'react';
import GroupBox from './GroupBox';
import GroupPagination from './GroupPagination';
import { GroupWithMembersInfo } from '@/api/group/types/Group';

interface GroupListProps {
  group: GroupWithMembersInfo[];
}

const GroupList = ({ group }: GroupListProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const groupsPerPage = 3;

  const startIndex = (currentPage - 1) * groupsPerPage;
  const currentGroups = group.slice(startIndex, startIndex + groupsPerPage);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <>
      <Container>
        {currentGroups.map((group) => (
          <GroupBox key={group.groupId} group={group} />
        ))}
      </Container>
      <GroupPagination
        currentPage={currentPage}
        totalGroups={Math.ceil(group.length / groupsPerPage)}
        onPageChange={handlePageChange}
        type="list"
      />
    </>
  );
};

export default GroupList;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  width: 100%;
  height: 100%;
`;
