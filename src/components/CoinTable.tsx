import React, { useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  TableSortLabel,
  Paper 
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Area, AreaChart, ResponsiveContainer } from 'recharts';
import { Coin } from '../types/coin';
import { formatNumber } from '../utils/formatNumber';

// Özel styled TableSortLabel komponenti
const StyledTableSortLabel = styled(TableSortLabel)<{ ispositive?: string }>(({ theme, ispositive }) => ({
  color: ispositive === 'true' ? '#10B981' : ispositive === 'false' ? '#EF4444' : 'inherit',
  '&.MuiTableSortLabel-active': {
    color: ispositive === 'true' ? '#10B981' : ispositive === 'false' ? '#EF4444' : 'inherit',
  },
  '& .MuiTableSortLabel-icon': {
    color: ispositive === 'true' ? '#10B981 !important' : ispositive === 'false' ? '#EF4444 !important' : 'inherit',
  }
}));

interface CoinTableProps {
  coins: Coin[];
}

type SortField = 'market_cap' | 'current_price' | 'price_change_percentage_24h' | 'total_volume';
type SortDirection = 'asc' | 'desc';

export const CoinTable: React.FC<CoinTableProps> = ({ coins }) => {
  const [sortField, setSortField] = useState<SortField>('market_cap');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const sortedCoins = [...coins].sort((a, b) => {
    const multiplier = sortDirection === 'asc' ? 1 : -1;
    const valueA = a[sortField] ?? 0;
    const valueB = b[sortField] ?? 0;
    return (valueA - valueB) * multiplier;
  });

  const generateSparklineData = (coin: Coin) => {
    if (!coin.sparkline_in_7d?.price) return [];
    return coin.sparkline_in_7d.price.map((price) => ({
      value: price
    }));
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="coin table">
        <TableHead>
          <TableRow>
            <TableCell>Rank</TableCell>
            <TableCell>Name</TableCell>
            <TableCell align="right">
              <TableSortLabel
                active={sortField === 'current_price'}
                direction={sortField === 'current_price' ? sortDirection : 'asc'}
                onClick={() => handleSort('current_price')}
              >
                Price
              </TableSortLabel>
            </TableCell>
            <TableCell align="right">
              <TableSortLabel
                active={sortField === 'price_change_percentage_24h'}
                direction={sortField === 'price_change_percentage_24h' ? sortDirection : 'asc'}
                onClick={() => handleSort('price_change_percentage_24h')}
                ispositive={sortedCoins[0]?.price_change_percentage_24h >= 0 ? 'true' : 'false'}
              >
                24h %
              </TableSortLabel>
            </TableCell>
            <TableCell align="right">
              <TableSortLabel
                active={sortField === 'market_cap'}
                direction={sortField === 'market_cap' ? sortDirection : 'asc'}
                onClick={() => handleSort('market_cap')}
              >
                Market Cap
              </TableSortLabel>
            </TableCell>
            <TableCell align="right">
              <TableSortLabel
                active={sortField === 'total_volume'}
                direction={sortField === 'total_volume' ? sortDirection : 'asc'}
                onClick={() => handleSort('total_volume')}
              >
                Volume(24h)
              </TableSortLabel>
            </TableCell>
            <TableCell align="right">Last 7 Days</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedCoins.map((coin) => (
            <TableRow 
              key={coin.id}
              sx={{ 
                '&:hover': { 
                  backgroundColor: 'rgba(0, 0, 0, 0.04)' 
                }
              }}
            >
              <TableCell>{coin.market_cap_rank}</TableCell>
              <TableCell>
                <div className="flex items-center">
                  <img src={coin.image} alt={coin.name} className="w-6 h-6 mr-2" />
                  <span className="font-medium">{coin.name}</span>
                  <span className="ml-2 text-gray-500 uppercase">{coin.symbol}</span>
                </div>
              </TableCell>
              <TableCell align="right">${formatNumber(coin.current_price)}</TableCell>
              <TableCell 
                align="right"
                sx={{ 
                  color: coin.price_change_percentage_24h >= 0 ? '#10B981' : '#EF4444',
                  fontWeight: 'bold'
                }}
              >
                {coin.price_change_percentage_24h?.toFixed(2)}%
              </TableCell>
              <TableCell align="right">${formatNumber(coin.market_cap)}</TableCell>
              <TableCell align="right">${formatNumber(coin.total_volume)}</TableCell>
              <TableCell align="right" style={{ width: 120 }}>
                <ResponsiveContainer width="100%" height={40}>
                  <AreaChart data={generateSparklineData(coin)}>
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke={coin.price_change_percentage_24h >= 0 ? '#10B981' : '#EF4444'}
                      fill={coin.price_change_percentage_24h >= 0 ? '#10B98120' : '#EF444420'}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};