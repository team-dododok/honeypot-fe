import React from 'react';
import CenterModal from '@/components/Modal/CenterModal';
import StampLabel from '@/features/Stamp/components/Stamp/StampLabel';
import styled from '@emotion/styled';
import { useSendComplimentStore } from '@/store/useSendComplimentStore';
import { useStampImage } from '@/hooks/stamp/useStampImage';

interface StampModalProps {
  showModal: boolean;
  onClose: () => void;
}

const StampModal = (props: StampModalProps) => {
  const { showModal, onClose } = props;
  const { honeyStampId, setHoneyStampId, setHoneyStampImage } =
    useSendComplimentStore();
  const { data } = useStampImage();
  if (!showModal) return null;

  const stampList = data?.stampDtos || [];

  return (
    <CenterModal
      title="보내고 싶은 꿀도장을 선택하세요."
      confirmText="도장찍기"
      onConfirm={onClose}
      disabled={honeyStampId === null}
    >
      <GridContainer>
        {stampList.map((item) => (
          <StampLabel
            key={item.id}
            id={item.id}
            image={item.imageUrl}
            stampName={item.stampName}
            selected={honeyStampId}
            onClick={() => {
              if (item.id === honeyStampId) {
                setHoneyStampId(null);
                setHoneyStampImage('');
              } else {
                setHoneyStampId(item.id);
                setHoneyStampImage(item.imageUrl);
              }
            }}
          />
        ))}
      </GridContainer>
    </CenterModal>
  );
};

export default StampModal;

const GridContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
`;
