import { theme } from '@/styles/theme';
import styled from '@emotion/styled';
import React from 'react';
import { Group } from '../types/group';
import { useNavigate } from 'react-router-dom';

interface GroupBoxProps {
  group: Group;
}

const GroupBox = (prop: GroupBoxProps) => {
  const { group } = prop;
  const navigate = useNavigate();

  return (
    <Container>
      <div>
        <h1>{group.groupName} 그룹</h1>
        <p>
          {group.groupMembers.length > 2
            ? `${group.groupMembers.slice(0, 2).join(', ')} 외 ${
                group.groupMembers.length - 2
              }명`
            : group.groupMembers.join(', ')}
        </p>
      </div>
      <img
        src="/assets/icons/right-ward-arrow.svg"
        alt="groupedit"
        onClick={() => {
          navigate(`/group/${group.id}`);
        }}
      />
    </Container>
  );
};

export default GroupBox;

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px 22px;
  border-radius: 24px;
  border: 1px solid ${theme.colors.gray10};

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
