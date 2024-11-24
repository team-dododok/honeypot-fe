import React from 'react';
import CenterModal from '@/components/Modal/CenterModal';
import StampLabel from '@/features/Stamp/components/Stamp/StampLabel';
import styled from '@emotion/styled';
import { STAMP } from '../../constants/dummy/stamp';
import { useSendComplimentStore } from '@/store/useSendComplimentStore';

interface StampModalProps {
  showModal: boolean;
  onClose: () => void;
}

const StampModal = (props: StampModalProps) => {
  const { showModal, onClose } = props;
  const { honeyStampId, setHoneyStampId } = useSendComplimentStore();

  if (!showModal) return null;

  return (
    <CenterModal
      title="보내고 싶은 꿀도장을 선택하세요."
      confirmText="도장찍기"
      onConfirm={onClose}
      disabled={honeyStampId === null}
    >
      <GridContainer>
        {STAMP.map((item) => (
          <StampLabel
            key={item.id}
            id={item.id}
            image={item.image}
            stampName={item.stampName}
            selected={honeyStampId}
            onClick={() => {
              if (item.id === honeyStampId) {
                setHoneyStampId(null);
              } else {
                setHoneyStampId(item.id);
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
