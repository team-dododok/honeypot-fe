import { theme } from '@/styles/theme';
import styled from '@emotion/styled';
import React from 'react';

interface GroupPaginationProps {
  currentPage: number;
  totalGroups: number;
  onPageChange: (newPage: number) => void;
  type?: 'group' | 'list';
}

const GroupPagination = (props: GroupPaginationProps) => {
  const { currentPage, totalGroups, onPageChange, type = 'group' } = props;

  return (
    <Container>
      <img
        src="/assets/icons/fill-up-ward-arrow.svg"
        alt="left"
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
      />
      {type === 'group' ? (
        <p>
          <span>{currentPage}번째 그룹</span> / {totalGroups}
        </p>
      ) : (
        <p>
          <span>{currentPage}</span> / {totalGroups}
        </p>
      )}
      <img
        src="/assets/icons/fill-up-ward-arrow-1.svg"
        alt="right"
        onClick={() => onPageChange(Math.min(totalGroups, currentPage + 1))}
      />
    </Container>
  );
};

export default GroupPagination;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0;

  ${theme.typography.detail4};
  color: ${theme.colors.gray50};
  span {
    ${theme.typography.subtitle3};
  }

  img {
    cursor: pointer;
    user-select: none;
  }
`;
