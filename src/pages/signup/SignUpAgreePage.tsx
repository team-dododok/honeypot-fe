import React, { useEffect, useState } from 'react';
import { theme } from '@/styles/theme';
import styled from '@emotion/styled';
import Button from '@/components/Button/Button';
import { useNavigate, useOutletContext } from 'react-router-dom';
import Check from '@/components/Check/Check';
import { TERMS } from '@/constants/terms';
import { OutletContext } from '@/layouts/SignupLayout';
import { BottomWrapper, CommonLayout, Label } from '@/features/Signup';

const SignUpAgreePage = () => {
  const navigate = useNavigate();
  const { setPreviousPath } = useOutletContext<OutletContext>();
  const [isCheckedAll, setIsCheckedAll] = useState<boolean>(false);
  const [isCheckedTerms, setIsCheckedTerms] = useState({
    0: false,
    1: false,
    2: false,
  });

  useEffect(() => {
    setPreviousPath('/login');
  }, [setPreviousPath]);

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
