import React, { useState } from 'react';
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import { Coin } from '../types/coin';
import { formatNumber } from '../utils/formatNumber';

type SortField = 'market_cap' | 'current_price' | 'price_change_percentage_24h' | 'total_volume';
type SortDirection = 'asc' | 'desc';

interface CoinTableProps {
  coins: Coin[];
}

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

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return <ArrowUpDown className="w-4 h-4 opacity-50" />;
    return sortDirection === 'asc' ? 
      <ArrowUp className="w-4 h-4 text-cyberpunk-purple" /> : 
      <ArrowDown className="w-4 h-4 text-cyberpunk-purple" />;
  };

  const formatPriceChange = (value: number | null | undefined): string => {
    if (value == null) return 'N/A';
    return `${value.toFixed(2)}%`;
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead className="text-xs uppercase bg-cyberpunk-darker/50">
          <tr>
            <th className="px-6 py-4">#</th>
            <th className="px-6 py-4">Name</th>
            <th className="px-6 py-4 cursor-pointer hover:text-cyberpunk-purple transition-colors" 
                onClick={() => handleSort('current_price')}>
              <div className="flex items-center gap-1">
                Price
                <SortIcon field="current_price" />
              </div>
            </th>
            <th className="px-6 py-4 cursor-pointer hover:text-cyberpunk-purple transition-colors" 
                onClick={() => handleSort('price_change_percentage_24h')}>
              <div className="flex items-center gap-1">
                24h %
                <SortIcon field="price_change_percentage_24h" />
              </div>
            </th>
            <th className="px-6 py-4 cursor-pointer hover:text-cyberpunk-purple transition-colors" 
                onClick={() => handleSort('market_cap')}>
              <div className="flex items-center gap-1">
                Market Cap
                <SortIcon field="market_cap" />
              </div>
            </th>
            <th className="px-6 py-4 cursor-pointer hover:text-cyberpunk-purple transition-colors" 
                onClick={() => handleSort('total_volume')}>
              <div className="flex items-center gap-1">
                Volume(24h)
                <SortIcon field="total_volume" />
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedCoins.map((coin, index) => (
            <tr key={coin.id} 
                className="border-b border-purple-900/20 hover:bg-cyberpunk-darker/30 transition-colors">
              <td className="px-6 py-4 font-medium text-purple-300">{index + 1}</td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <img src={coin.image} alt={coin.name} className="w-6 h-6" />
                  <div>
                    <div className="font-medium text-purple-100">{coin.name}</div>
                    <div className="text-xs text-purple-400 uppercase">{coin.symbol}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 text-purple-100">
                ${formatNumber(coin.current_price ?? 0)}
              </td>
              <td className={`px-6 py-4 ${
                (coin.price_change_percentage_24h ?? 0) >= 0 
                  ? 'text-green-400' 
                  : 'text-red-400'
              }`}>
                {formatPriceChange(coin.price_change_percentage_24h)}
              </td>
              <td className="px-6 py-4 text-purple-100">
                ${formatNumber(coin.market_cap ?? 0)}
              </td>
              <td className="px-6 py-4 text-purple-100">
                ${formatNumber(coin.total_volume ?? 0)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};