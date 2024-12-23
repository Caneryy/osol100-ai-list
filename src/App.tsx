import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import IndexPage from './pages/index';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <IndexPage />
    </ThemeProvider>
  );
}

export default App;