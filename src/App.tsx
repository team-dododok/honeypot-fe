import React from 'react';
import { ThemeProvider } from '@emotion/react';
import { theme } from './styles/theme';
import GlobalStyle from './styles/GlobalStyle';
import Router from './routes';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <h1>Initial Setting</h1>
      <Router />
    </ThemeProvider>
  );
}

export default App;
