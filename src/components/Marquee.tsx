import React from 'react';
import { Coin } from '../types/coin';
import { formatNumber } from '../utils/formatNumber';

interface MarqueeProps {
  coins: Coin[];
}

export const Marquee: React.FC<MarqueeProps> = ({ coins }) => {
  return (
    <>
      {/* Spacer div to prevent content from hiding behind fixed marquee */}
      <div className="h-10"></div>
      
      {/* Fixed marquee */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-cyberpunk-darker border-b border-purple-900/20 py-2 overflow-hidden">
        <div className="animate-marquee whitespace-nowrap">
          {coins.map((coin) => (
            <span key={coin.id} className="mx-4 inline-flex items-center">
              <img src={coin.image} alt={coin.symbol} className="w-4 h-4 mr-2" />
              <span className="font-medium">{coin.symbol.toUpperCase()}</span>
              <span className="ml-2">${formatNumber(coin.current_price)}</span>
              <span 
                className={`ml-2 ${
                  coin.price_change_percentage_24h >= 0 
                    ? 'text-green-400' 
                    : 'text-red-400'
                }`}
              >
                {coin.price_change_percentage_24h.toFixed(2)}%
              </span>
            </span>
          ))}
        </div>
      </div>
    </>
  );
}; 