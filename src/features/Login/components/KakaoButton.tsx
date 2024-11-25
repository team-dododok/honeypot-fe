import Button from '@/components/Button/Button';
import React from 'react';
import { KAKAO_AUTH_URL } from '../services/oauth';

interface KakaoButtonProps {
  text?: string;
  onClick?: () => void;
}

const KakaoButton = (props: KakaoButtonProps) => {
  const { text = '카카오톡으로 로그인', onClick } = props;

  const handleButtonClick = () => {
    if (onClick) {
      onClick();
    } else {
      window.location.href = KAKAO_AUTH_URL;
    }
  };

  return (
    <Button
      text={text}
      icon={<img src="/assets/icons/kakao.svg" alt="kakao" />}
      background="#FEE500"
      color="#4A4642"
      onClick={handleButtonClick}
    />
  );
};

export default KakaoButton;
