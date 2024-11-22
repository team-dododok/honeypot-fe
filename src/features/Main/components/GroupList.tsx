import styled from '@emotion/styled';
import React, { useState } from 'react';
import { GROUP_LIST } from '../constants/GroupList';
import GroupBox from './GroupBox';
import GroupPagination from './GroupPagination';

const GroupList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const groupsPerPage = 3;

  const startIndex = (currentPage - 1) * groupsPerPage;
  const currentGroups = GROUP_LIST.slice(
    startIndex,
    startIndex + groupsPerPage
  );

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <>
      <Container>
        {currentGroups.map((group) => (
          <GroupBox key={group.id} group={group} />
        ))}
      </Container>
      <GroupPagination
        currentPage={currentPage}
        totalGroups={Math.ceil(GROUP_LIST.length / groupsPerPage)}
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
  height: 100%;
`;
