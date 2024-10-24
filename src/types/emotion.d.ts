import "@emotion/react";

type Colors = keyof typeof colors;
type Typography = keyof typeof typography;

declare module "@emotion/react" {
  export interface Theme {
    colors: {
      [key in colors]: string;
    };
    typography: {
      [key in typography]: {
        fontFamily: string;
        fontStyle: string;
        fontWeight: number;
        fontSize: string;
        lineHeight: string;
      };
    };
  }
}