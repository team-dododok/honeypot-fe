import React from 'react';
import { theme } from '@/styles/theme';
import styled from '@emotion/styled';
import { TERMS } from '@/constants/terms';
import { useSignUpStore } from '@/store/useSignupStore';
import Toggle from '@/components/Toggle/Toggle';

const SettingTermsPage: React.FC = () => {
  // 추후 서버에서 상태 가져오기
  const { isCheckedTerms, setIsCheckedTerm } = useSignUpStore();

  const handleCheck = (id: 0 | 1 | 2) => {
    setIsCheckedTerm(id, !isCheckedTerms[id]);
  };

  return (
    <>
      <Divider />
      <TermsList>
        {TERMS.map((term) => (
          <TermsContainer key={term.id}>
            <TermsText>
              <Title>{term.title}</Title>
              <DetailButton
                onClick={() => {
                  window.open(term.url, '_blank');
                }}
              >
                자세히 보기{' '}
                <img
                  src="/assets/icons/more-black.svg"
                  width={16}
                  height={16}
                />
              </DetailButton>
            </TermsText>
            <Toggle
              isChecked={isCheckedTerms[term.id as 0 | 1 | 2]}
              onChange={() => handleCheck(term.id as 0 | 1 | 2)}
            />
          </TermsContainer>
        ))}
      </TermsList>
    </>
  );
};

export default SettingTermsPage;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: ${theme.colors.gray10};
  margin-bottom: 20px;
`;

const TermsList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 28px;
`;

const TermsContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TermsText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 4px;
`;

const Title = styled.div`
  color: ${theme.colors.gray90};
  ${theme.typography.subtitle2};
  white-space: nowrap;
`;

const DetailButton = styled.button`
  display: flex;
  align-items: center;
  gap: 4px;
  ${theme.typography.body5};
`;
