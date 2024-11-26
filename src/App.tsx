import React from 'react';
import { ThemeProvider } from '@emotion/react';
import { theme } from './styles/theme';
import GlobalStyle from './styles/GlobalStyle';
import Toast from './components/Toast/Toast';
import Router from './routes';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './api/queryClient';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <GlobalStyle />
        <Toast />
        <Router />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
