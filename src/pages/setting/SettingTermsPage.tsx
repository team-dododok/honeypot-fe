import React, { useEffect } from 'react';
import { theme } from '@/styles/theme';
import styled from '@emotion/styled';
import { TERMS } from '@/constants/terms';
import { useSignUpStore } from '@/store/useSignupStore';
import Toggle from '@/components/Toggle/Toggle';
import { useServiceConsent } from '@/hooks/user/useServiceConsent';
import { usePatchServiceConsent } from '@/hooks/user/usePatchServiceConsent';

const SettingTermsPage = () => {
  const { isCheckedTerms, setIsCheckedTerm, setAllTerms } = useSignUpStore();
  const { data: serviceConsent } = useServiceConsent();
  const { mutate: serviceConsentMutate } = usePatchServiceConsent();

  useEffect(() => {
    if (serviceConsent) {
      setAllTerms({
        0: serviceConsent.serviceTerm,
        1: serviceConsent.personalInfo,
        2: serviceConsent.emailMarketing,
      });
    }
  }, [serviceConsent, setAllTerms]);

  const handleCheck = (id: 0 | 1 | 2) => {
    const key =
      id === 0 ? 'serviceTerm' : id === 1 ? 'personalInfo' : 'emailMarketing';

    const newValue = !isCheckedTerms[id];

    const updatedConsent = {
      [key]: newValue,
    };

    setIsCheckedTerm(id, newValue);
    serviceConsentMutate(updatedConsent);
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
              disabled={term.id === 0 || term.id === 1}
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
