import React, { useMemo } from 'react';
import { Box, Typography } from '@mui/material';
import Treemap from './Treemap';
import { Coin } from '../types/coin';

interface TreemapContainerProps {
  coins: Coin[];
}

const TreemapContainer: React.FC<TreemapContainerProps> = ({ coins }) => {
  const treemapData = useMemo(() => {
    return coins
      .filter(coin => coin.market_cap > 0)
      .slice(0, 20)
      .map(coin => ({
        name: coin.symbol.toUpperCase(),
        size: coin.market_cap || 0,
        value: coin.price_change_percentage_24h || 0,
        color: (coin.price_change_percentage_24h || 0) >= 0 
          ? `rgba(0, 255, 0, ${Math.min(Math.abs(coin.price_change_percentage_24h || 0) / 30 + 0.2, 0.8)})` 
          : `rgba(255, 0, 0, ${Math.min(Math.abs(coin.price_change_percentage_24h || 0) / 30 + 0.2, 0.8)})`
      }))
      .sort((a, b) => b.size - a.size);
  }, [coins]);

  if (!treemapData.length) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <Typography>No data available</Typography>
      </Box>
    );
  }

  return <Treemap data={treemapData} />;
};

export default TreemapContainer; 