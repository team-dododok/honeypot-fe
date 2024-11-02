import styled from '@emotion/styled';
import { theme } from '@/styles/theme';

interface LabelProps {
  marginTop?: string;
  marginBottom?: string;
  typography?: keyof typeof theme.typography;
}

const CommonLayout = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const ProgressBarWrapper = styled.div<{ marginBottom?: string }>`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: ${(props) => props.marginBottom || '28px'};
`;

const CenterLayout = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const Label = styled.div<LabelProps>`
  width: 100%;
  text-align: left;
  color: ${theme.colors.gray90};
  ${(props) => theme.typography[props.typography || 'body1']};
  margin-top: ${(props) => props.marginTop || '0'};
  margin-bottom: ${(props) => props.marginBottom || '0'};
`;

const BottomWrapper = styled.div`
  width: 100%;
  max-width: 480px;
  display: flex;
  align-items: center;
  gap: 16px;
  position: fixed;
  bottom: 13px;
  left: 50%;
  transform: translateX(-50%);
  padding: 0 25px;
`;

export {
  CommonLayout,
  ProgressBarWrapper,
  CenterLayout,
  Container,
  Label,
  BottomWrapper,
};
