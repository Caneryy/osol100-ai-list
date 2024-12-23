import React from 'react';
import { Box, Container, Typography, Paper, CircularProgress } from '@mui/material';
import { QueryClient, QueryClientProvider } from 'react-query';
import { CoinTable } from '../components/CoinTable';
import TreemapContainer from '../components/HeatmapContainer';
import { useCoinsData } from '../hooks/useCoinsData';

// Create a client
const queryClient = new QueryClient();

const MainContent = () => {
  const { data: coins, isLoading, error } = useCoinsData();

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" my={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" my={4} color="error.main">
        <Typography>Error loading data. Please try again later.</Typography>
      </Box>
    );
  }

  return (
    <>
      {/* Heatmap Section */}
      <Paper 
        elevation={3} 
        sx={{ 
          p: 3, 
          mb: 4, 
          bgcolor: 'background.paper',
          borderRadius: 2
        }}
      >
        <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
          Market Overview
        </Typography>
        <TreemapContainer coins={coins || []} />
      </Paper>

      {/* Coin List Section */}
      <Paper 
        elevation={3} 
        sx={{ 
          p: 3, 
          mb: 4, 
          bgcolor: 'background.paper',
          borderRadius: 2
        }}
      >
        <Typography variant="h5" gutterBottom>
          AI Coins List
        </Typography>
        <CoinTable coins={coins || []} />
      </Paper>
    </>
  );
};

const IndexPage = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Container maxWidth="xl">
        {/* Header */}
        <Box sx={{ my: 4 }}>
        
        </Box>

        <MainContent />

        {/* Footer */}
        <Box sx={{ py: 3, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            Data provided by CoinGecko API
          </Typography>
        </Box>
      </Container>
    </QueryClientProvider>
  );
};

export default IndexPage; 