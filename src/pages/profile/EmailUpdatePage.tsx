import Button from '@/components/Button/Button';
import Input from '@/components/Input/Input';
import { theme } from '@/styles/theme';
import styled from '@emotion/styled';
import React, { useState } from 'react';

const EmailUpdatePage = () => {
  const [inputValue, setInputValue] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    if (validateEmail(value)) {
      setIsEmailValid(true);
      setErrorMessage('');
    } else {
      setIsEmailValid(false);
      setErrorMessage('올바른 이메일 형식으로 입력해주세요.');
    }
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <Container>
      <Text>이메일 주소를 입력해주세요.</Text>
      <InputContainer>
        <InputBox>
          <StyledInput
            width="100%"
            placeholder="*****@***.***"
            clear={false}
            value={inputValue}
            onChange={handleInput}
          />
          <StyledButton
            text="인증번호"
            variant={isEmailValid ? 'activate' : 'default'}
            disabled={!isEmailValid}
          />
        </InputBox>
        {errorMessage && <ErrorText>{errorMessage}</ErrorText>}
      </InputContainer>
    </Container>
  );
};

export default EmailUpdatePage;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const Text = styled.h1`
  ${theme.typography.body1};
  color: ${theme.colors.gray90};
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const InputBox = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  width: 100%;
`;

const StyledInput = styled(Input)`
  width: 70%;
`;

const StyledButton = styled(Button)`
  width: 30%;
`;

const ErrorText = styled.p`
  color: ${theme.colors.error60};
  ${theme.typography.body3};
  margin: 0;
`;
