import ProcessModal from '@/components/Modal/ProcessModal';
import { useGroupMember } from '@/hooks/group/useGroupMember';
import { theme } from '@/styles/theme';
import styled from '@emotion/styled';
import React from 'react';

interface HoneyMoveCheckModalProps {
  isVisible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  selectedGroup: number | null;
  groupId: number;
  selectedCount: number;
}

const HoneyMoveCheckModal = (props: HoneyMoveCheckModalProps) => {
  const {
    isVisible,
    onClose,
    onConfirm,
    selectedGroup,
    groupId,
    selectedCount,
  } = props;

  const { data: groupData } = useGroupMember([groupId]);
  const { data: selectedGroupData } = useGroupMember([selectedGroup || 0]);

  const groupInfo = [
    ...(groupData?.groupMembersInfos || []),
    ...(selectedGroupData?.groupMembersInfos || []),
  ];

  if (!isVisible) return;
  return (
    <ProcessModal
      height="400px"
      title={`총 ${selectedCount}개의 꿀을 옮기시겠어요?`}
      description="선택한 그룹이 맞는지 다시 한번 확인해주세요!"
      onCancel={onClose}
      onConfirm={onConfirm}
      confirmText="확인"
      isVisible={isVisible}
    >
      <HoneyMoveCheckContainer>
        <HoneyGroupInfoContainer>
          {groupInfo?.map((group) => (
            <HoneyGroupInfo key={group.groupId}>
              <HoneypotImage src="/assets/images/group/move/honey-pot.svg" />
              <Info>
                {group.groupName}
                {group.groupMembers.length > 0 ? (
                  <Detail>
                    {group.groupMembers[0].name} 외{' '}
                    {group.groupMembers.length - 1}명
                  </Detail>
                ) : (
                  <Detail>0명</Detail>
                )}
              </Info>
            </HoneyGroupInfo>
          ))}
          <DotArrowImage src="/assets/images/group/move/dot-arrow.svg" />
        </HoneyGroupInfoContainer>
      </HoneyMoveCheckContainer>
    </ProcessModal>
  );
};

export default HoneyMoveCheckModal;

const HoneyMoveCheckContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const HoneyGroupInfoContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  gap: 36px;
  margin-top: 64px;
`;

const HoneyGroupInfo = styled.div`
  width: 115px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 18px;
  text-align: center;
`;

const HoneypotImage = styled.img``;

const Info = styled.div`
  height: 30px;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  color: ${theme.colors.gray80};
  ${theme.typography.subtitle2};
`;

const Detail = styled.div`
  color: ${theme.colors.gray50};
  ${theme.typography.body4};
`;

const DotArrowImage = styled.img`
  width: 48px;
  height: 24px;
  position: absolute;
  top: 60px;
`;
