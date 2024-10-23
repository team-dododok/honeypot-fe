import React from 'react';
import { ThemeProvider } from '@emotion/react';
import { theme } from './styles/theme';
import GlobalStyle from './styles/GlobalStyle';
import Toast from './components/Toast/Toast';
import Router from './routes';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Toast />
      <Router />
    </ThemeProvider>
  );
}

export default App;
