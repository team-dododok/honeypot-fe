import { keyframes } from '@emotion/react';

export const floatAnimation = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0);
  }
`;

export const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

export const marginFadeIn = keyframes`
  from {
    opacity: 0;
    margin-top: 5px;
  }
  to {
    opacity: 1;
    margin-top: 0;
  }
`;

export const marginFadeOut = keyframes`
  from {
    opacity: 1;
    margin-top: 0;
  }
  to {
    opacity: 0;
    margin-top: 5px;
  }
`;
