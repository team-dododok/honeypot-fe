import React from 'react';

import { ThemeProvider } from '@emotion/react';
import type { Preview } from '@storybook/react';
import GlobalStyle from '../src/styles/GlobalStyle';
import { theme } from '../src/styles/theme';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export const decorators = [
  (Story) => (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Story />
    </ThemeProvider>
  ),
];

export default preview;
