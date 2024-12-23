import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Coin } from '../types/coin';
import { formatNumber } from '../utils/formatNumber';

interface CoinCardProps {
  coin: Coin;
}

export const CoinCard: React.FC<CoinCardProps> = ({ coin }) => {
  const isPositive = coin.price_change_percentage_24h > 0;

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-4 flex flex-col">
      <div className="flex items-center gap-3 mb-3">
        <img src={coin.image} alt={coin.name} className="w-8 h-8" />
        <div>
          <h3 className="font-semibold">{coin.name}</h3>
          <span className="text-sm text-gray-500 uppercase">{coin.symbol}</span>
        </div>
      </div>
      
      <div className="mt-2">
        <div className="text-2xl font-bold">${formatNumber(coin.current_price)}</div>
        <div className={`flex items-center gap-1 ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
          {isPositive ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
          <span className="font-medium">
            {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
          </span>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-gray-100">
        <div className="flex justify-between text-sm text-gray-500">
          <span>Market Cap</span>
          <span>${formatNumber(coin.market_cap)}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-500 mt-1">
          <span>Volume (24h)</span>
          <span>${formatNumber(coin.total_volume)}</span>
        </div>
      </div>
    </div>
  );
};