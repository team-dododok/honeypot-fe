import React from 'react';
import CenterModal from '@/components/Modal/CenterModal';
import StampLabel from '@/features/Stamp/components/StampLabel';
import { STAMP } from '@/features/Stamp/constants/stamp';
import styled from '@emotion/styled';

interface StampModalProps {
  showModal: boolean;
  onClose: () => void;
  stampType: number | null;
  setStampType: (type: number | null) => void;
}

const StampModal = (props: StampModalProps) => {
  const { showModal, onClose, stampType, setStampType } = props;

  if (!showModal) return null;

  return (
    <CenterModal
      title="보내고 싶은 꿀도장을 선택하세요."
      confirmText="도장찍기"
      onConfirm={onClose}
      disabled={stampType === null}
    >
      <GridContainer>
        {STAMP.map((item) => (
          <StampLabel
            key={item.id}
            id={item.id}
            image={item.image}
            stampName={item.stampName}
            selected={stampType}
            onClick={() => {
              if (item.id === stampType) {
                setStampType(null);
              } else {
                setStampType(item.id);
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
