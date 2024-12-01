import ProcessModal from '@/components/Modal/ProcessModal';
import { theme } from '@/styles/theme';
import styled from '@emotion/styled';
import React, { useEffect } from 'react';

interface HoneyMoveCheckModalProps {
  isVisible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  selectedGroup: number | null;
  groupId: number;
  selectedCount: number;
}

// interface GroupInfo {
//   id: number;
//   groupName: string;
//   groupMemberCount: number;
//   groupMemberName: string;
// }

const HoneyMoveCheckModal = (props: HoneyMoveCheckModalProps) => {
  const {
    isVisible,
    onClose,
    onConfirm,
    selectedGroup,
    groupId,
    selectedCount,
  } = props;

  // const [groupInfo, setGroupInfo] = useState<GroupInfo[]>();
  // 더미데이터, 추후 서버로부터 반환되는 값으로 저장
  const groupInfo = [
    {
      id: groupId,
      groupName: '도도독',
      groupMemberCount: 8,
      groupMemberName: '박형준',
    },
    {
      id: selectedGroup,
      groupName: '도도독개발그루우우우우우웁웁웁',
      groupMemberCount: 5,
      groupMemberName: '박진우',
    },
  ];

  useEffect(() => {
    // 현재 그룹 정보 반환 (API)
    console.log(selectedGroup);
    // 이동 그룹 정보 반환 (API)
    console.log(groupId);
  }, []);

  if (!isVisible) return;
  return (
    <ProcessModal
      height="400px"
      title={`총 ${selectedCount}개의 꿀을 옮기시겠어요?`}
      description="선택한 그룹이 맞는지 다시 한번 확인해 주세요!"
      onCancel={onClose}
      onConfirm={onConfirm}
      confirmText="확인"
      isVisible={isVisible}
    >
      <HoneyMoveCheckContainer>
        <HoneyGroupInfoContainer>
          {groupInfo?.map((group) => (
            <HoneyGroupInfo key={group.id}>
              <HoneypotImage src="/assets/images/group/move/honey-pot.svg" />
              <Info>
                {group.groupName}
                <Detail>
                  {group.groupMemberName} 외 {group.groupMemberCount - 1}명
                </Detail>
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
