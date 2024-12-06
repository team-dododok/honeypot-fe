import { sendStatusType } from '@/api/sendPraise/types/SendPraise';
import Button from '@/components/Button/Button';
import ComplimentLetter from '@/features/Compliment/components/Letter/ComplimentLetter';
import GroupModal from '@/features/Group/components/Modal/GroupModal';
import KakaoButton from '@/features/Login/components/KakaoButton';
import { KAKAO_AUTH_URL } from '@/features/Login/services/oauth';
import { usePostReceivedPraise } from '@/hooks/receivedPraise/usePostReceivedPraise';
import { useUuidReceivedPraise } from '@/hooks/receivedPraise/useUuidReceivedPraise';
import { theme } from '@/styles/theme';
import { getAccessToken, setUuid } from '@/utils/storage';
import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const ComplimentDetailPage = () => {
  const navigate = useNavigate();
  const { id: uuid } = useParams();
  const urlParams = new URLSearchParams(location.search);
  const name = urlParams.get('name');
  const [groupId, setGroupId] = useState<number | null>(null);
  const [sendStatus, setSendStatus] = useState<sendStatusType | null>(null);

  const [showGroupModal, setShowGroupModal] = useState<boolean>(false);
  const [selectedGroup, setSelectedGroup] = useState<number | null>(null);

  const { data } = useUuidReceivedPraise({ uuid: uuid! });
  const { mutate: savePraise } = usePostReceivedPraise();

  useEffect(() => {
    if (data?.groupId) {
      setGroupId(data?.groupId);
      if (data?.sendStatus) {
        setSendStatus(data.sendStatus);
      }
    }
  }, [data]);

  const handleLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
    setUuid(uuid!);
  };

  const handleClickButton = () => {
    if (groupId !== -1) {
      /* 이미 저장된 칭찬일 경우, 해당 그룹으로 이동 */
      // navigate(`/group/${groupId}`);

      /* 전시회 임시 수정: 무조건 메인으로 이동 */
      navigate('/');
    } else {
      /* 아직 저장되지 않았을 경우, 저장을 위한 그룹 선택 모달 띄우기 */
      setShowGroupModal(true);
    }
  };

  const handleSelectedGroup = (_groupName: string, selectedGroupId: number) => {
    setShowGroupModal(false);

    savePraise(
      { praiseUuid: uuid!, groupId: selectedGroupId },
      {
        onSuccess: () => {
          // navigate(`/group/${selectedGroupId}`, { state: { showToast: true } });

          /* 전시회 임시 수정: 무조건 메인으로 이동 */
          navigate('/', { state: { showToast: true } });
        },
      }
    );
  };

  return (
    <>
      <CenterLayout>
        <Content>
          <Title>
            {name ? (
              <HelloText>반가워요, {name} 님!</HelloText>
            ) : (
              <LogoImage
                src="/assets/images/logo-typo.svg"
                width={68}
                height={24}
                alt="꿀단지"
                onClick={() => {
                  navigate('/');
                }}
              />
            )}
            <Text>
              <Strong>{data?.senderName}</Strong>님이{' '}
              <Strong>{data?.receiverName}</Strong>
              님에게 보낸 꿀이에요!
              <br />
              꿀단지에서 팀원들과 꿀 같은 칭찬을 주고받아볼까요?
            </Text>
          </Title>
          <ComplimentLetter
            receiver={data?.receiverName || ''}
            sender={data?.senderName || ''}
            content={data?.content || ''}
            groupName={data?.groupName || ''}
            honeyStampImage={data?.imageUrl || ''}
          ></ComplimentLetter>
          <ButtonWrapper>
            {sendStatus === 'MYSELF' ? (
              <Message>내가 보낸 꿀이에요</Message>
            ) : sendStatus === 'GROUP' ? (
              <Message>그룹 채팅방에 보낸 꿀이에요</Message>
            ) : (
              groupId !== null &&
              groupId !== -1 && <Message>이미 저장한 꿀이에요</Message>
            )}
            {!getAccessToken() && groupId === -1 && !name ? (
              <KakaoButton
                text="카카오 로그인하고 꿀 저장하기"
                onClick={handleLogin}
              />
            ) : (
              <Button
                text={
                  name
                    ? '아까 받은 꿀 저장하러 가기'
                    : groupId !== -1
                      ? '나의 꿀단지로 이동하기'
                      : '받은 꿀 저장하기'
                }
                onClick={handleClickButton}
                disabled={sendStatus === 'MYSELF'}
              />
            )}
          </ButtonWrapper>
        </Content>
      </CenterLayout>
      {showGroupModal && (
        <GroupModal
          isVisible={showGroupModal}
          placeholder="꿀을 저장할 그룹 이름을 작성해주세요"
          onClose={() => setShowGroupModal(false)}
          onConfirm={handleSelectedGroup}
          selectedGroup={selectedGroup}
          setSelectedGroup={setSelectedGroup}
        />
      )}
    </>
  );
};

export default ComplimentDetailPage;

const CenterLayout = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  box-sizing: border-box;
  overflow-y: scroll;
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
`;

const LogoImage = styled.img`
  cursor: pointer;
`;

const Title = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
`;

const HelloText = styled.div`
  color: ${theme.colors.gray80};
  ${theme.typography.subtitle1}
`;

const Text = styled.div`
  color: ${theme.colors.gray80};
  ${theme.typography.body3};
  text-align: center;
  margin-bottom: 16px;
`;

const Strong = styled.span`
  ${theme.typography.subtitle2};
`;

const Message = styled.div`
  color: ${theme.colors.gray60};
  ${theme.typography.body3};
  text-align: center;
  margin-bottom: 8px;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  max-width: 480px;
`;
