import React from 'react';
import { Box, Typography } from '@mui/material';
import Treemap from './Treemap';
import { Coin } from '../types/coin';

interface TreemapContainerProps {
  coins: Coin[];
}

const TreemapContainer: React.FC<TreemapContainerProps> = ({ coins }) => {
  if (!coins.length) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <Typography>No data available</Typography>
      </Box>
    );
  }

  // İlk 20 coin'i göster
  const filteredCoins = coins
    .filter(coin => coin.market_cap > 0)
    .slice(0, 20);

  return <Treemap coins={filteredCoins} />;
};

export default TreemapContainer; 