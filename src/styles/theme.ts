import { Theme } from '@emotion/react';

const colors = {
  brand05: '#FFF7E5',
  brand10: '#FFEEC6',
  brand30: '#FFDD88',
  brand50: '#FFD15E',
  brand60: '#FBC133',
  brand80: '#E4A202',
  brand90: '#805A00',

  sub05: '#D7E9E6',
  sub10: '#8EB5AD',
  sub30: '#57998C',
  sub50: '#4E857A',
  sub60: '#41766C',
  sub80: '#46605B',
  sub90: '#36504B',

  gray00: '#FFFFFF',
  gray05: '#FBFAF9',
  gray10: '#EEEEEE',
  gray30: '#CFCECD',
  gray50: '#8E8B89',
  gray60: '#66625D',
  gray80: '#4A4642',
  gray90: '#2E2C29',

  error20: '#E8A19D',
  error40: '#E0817C',
  error60: '#D9635D',
  error90: '#CB3830',

  warning20: '#FFE8D8',
  warning40: '#FECCA8',
  warning60: '#FEB682',
  warning90: '#FF974C',

  success20: '#DAE2FF',
  success40: '#B5C5FE',
  success60: '#8BA4FE',
  success90: '#5378FB',
} as const;

interface Font {
  weight: number;
  size: number;
}

const FONT = ({
  weight,
  size,
}: Font): {
  fontFamily: string;
  fontStyle: string;
  fontWeight: number;
  fontSize: string;
  lineHeight: string;
} => {
  return {
    fontFamily: 'Pretendard',
    fontStyle: 'normal',
    fontWeight: weight,
    fontSize: `${size}px`,
    lineHeight: `${size * 1.6}px`,
  };
};

const typography = {
  heading1: FONT({ weight: 700, size: 32 }),
  heading2: FONT({ weight: 700, size: 28 }),
  heading3: FONT({ weight: 700, size: 24 }),
  
  subtitle1: FONT({ weight: 700, size: 20 }),
  subtitle2: FONT({ weight: 700, size: 16 }),
  subtitle3: FONT({ weight: 700, size: 14 }),
  subtitle4: FONT({ weight: 700, size: 12 }),
  
  body1: FONT({ weight: 500, size: 24 }),
  body2: FONT({ weight: 500, size: 20 }),
  body3: FONT({ weight: 500, size: 16 }),
  body4: FONT({ weight: 500, size: 14 }),
  body5: FONT({ weight: 500, size: 12 }),

  detail1: FONT({ weight: 400, size: 24 }),
  detail2: FONT({ weight: 400, size: 20 }),
  detail3: FONT({ weight: 400, size: 16 }),
  detail4: FONT({ weight: 400, size: 14 }),
  detail5: FONT({ weight: 400, size: 12 }),
};

export type ColorsTypes = typeof colors;
export type TypoGraphysTypes = typeof typography;

export const theme: Theme = {
  colors,
  typography,
};
