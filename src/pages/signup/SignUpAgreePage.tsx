import React, { useEffect, useState } from 'react';
import { theme } from '@/styles/theme';
import styled from '@emotion/styled';
import Button from '@/components/Button/Button';
import { useLocation, useNavigate } from 'react-router-dom';
import Check from '@/components/Check/Check';
import { TERMS } from '@/constants/terms';
import { BottomWrapper, CommonLayout, Label } from '@/features/Signup';
import WarningModal from '@/components/Modal/WarningModal';
import { history } from '@/utils/history';

const SignUpAgreePage = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [isCheckedAll, setIsCheckedAll] = useState<boolean>(false);
  const [isCheckedTerms, setIsCheckedTerms] = useState({
    0: false,
    1: false,
    2: false,
  });
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    const unlistenHistoryEvent = history.listen(({ action }) => {
      if (action !== 'POP') return;
      setShowModal(true);
      history.push(pathname);
    });
    return unlistenHistoryEvent;
  }, []);

  const handleCheckAll = () => {
    const newCheckedState = !isCheckedAll;
    setIsCheckedAll(newCheckedState);
    setIsCheckedTerms({
      0: newCheckedState,
      1: newCheckedState,
      2: newCheckedState,
    });
  };

  const handleCheck = (id: 0 | 1 | 2) => {
    setIsCheckedTerms((prev) => {
      const newState = { ...prev, [id]: !prev[id] };
      setIsCheckedAll(newState[0] && newState[1] && newState[2]);
      return newState;
    });
  };

  const isNextButtonActive = isCheckedTerms[0] && isCheckedTerms[1];

  const handleButtonClick = () => {
    if (isNextButtonActive) {
      navigate('/signup/name');
    }
  };

  return (
    <CommonLayout>
      <Label marginTop="46px" marginBottom="62px">
        ‘꿀단지’를 이용하기 위해서는
        <br />
        서비스 이용 약관에 대한
        <br />
        동의가 필요해요.
      </Label>
      <TermsList>
        <Check
          variant="circle"
          label="약관 전체 동의"
          isChecked={isCheckedAll}
          onChange={handleCheckAll}
        />
        <Divider />
        {TERMS.map((term) => (
          <CheckContainer key={term.id}>
            <Check
              variant="default"
              label={term.title}
              isChecked={isCheckedTerms[term.id as 0 | 1 | 2]}
              onChange={() => handleCheck(term.id as 0 | 1 | 2)}
            />
            <button
              onClick={() => {
                alert(term.content);
              }}
            >
              <img src="/assets/icons/more.svg" />
            </button>
          </CheckContainer>
        ))}
      </TermsList>
      <BottomWrapper>
        <Button
          text="다음"
          variant="activate"
          onClick={handleButtonClick}
          disabled={!isNextButtonActive}
        />
      </BottomWrapper>
      {showModal && (
        <WarningModal
          title="해당 페이지를 나가시겠어요?"
          description="지금 나가면 작성한 내용은 저장되지 않아요."
          cancelText="나가기"
          confirmText="계속 작성하기"
          onCancel={() => {
            setShowModal(false);
            navigate('/login');
          }}
          onConfirm={() => {
            setShowModal(false);
          }}
        />
      )}
    </CommonLayout>
  );
};

export default SignUpAgreePage;

const TermsList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: ${theme.colors.gray10};
`;

const CheckContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
