import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import IndexPage from './pages/index';
import { Marquee } from './components/Marquee';
import { Header } from './components/Header';
import { useCoins } from './hooks/useCoins';

function App() {
  const { data: coins, isLoading, error } = useCoins();
  
  return (
    <div className="min-h-screen bg-gray-800 text-white">
      {!isLoading && !error && coins && <Marquee coins={coins} />}
      <Header />
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <IndexPage />
      </ThemeProvider>
    </div>
  );
}

export default App;