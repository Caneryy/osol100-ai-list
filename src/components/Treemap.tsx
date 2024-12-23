import React from 'react';
import { Treemap as RechartsTreemap, ResponsiveContainer, Tooltip } from 'recharts';
import { Box, useTheme } from '@mui/material';
import { Coin } from '../types/coin';
import { formatNumber } from '../utils/formatNumber';

interface TreemapProps {
  coins: Coin[];
}

interface TreemapData {
  name: string;
  size: number;
  value: number;
  image: string;
  marketCap: number;
}

interface CustomContentProps {
  x: number;
  y: number;
  width: number;
  height: number;
  name: string;
  value: number;
  image: string;
  marketCap: number;
}

const Treemap: React.FC<TreemapProps> = ({ coins }) => {
  const theme = useTheme();

  const data: TreemapData[] = coins
    .filter(coin => coin.market_cap > 0)
    .map((coin) => ({
      name: coin.symbol.toUpperCase(),
      size: coin.market_cap || 0,
      value: coin.price_change_percentage_24h || 0,
      image: coin.image,
      marketCap: coin.market_cap || 0
    }))
    .sort((a, b) => b.size - a.size);

  if (data.length === 0) {
    return (
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        height={400}
      >
        No data available
      </Box>
    );
  }

  const CustomContent: React.FC<CustomContentProps> = ({ 
    x, 
    y, 
    width, 
    height, 
    name, 
    value, 
    image, 
    marketCap 
  }) => {
    const uniqueId = `clip-${name}-${x}-${y}`;
    const borderRadius = 8;
    const gap = 2;

    if (width < 30 || height < 30) return null;

    return (
      <g>
        <defs>
          <clipPath id={uniqueId}>
            <rect 
              x={x + gap/2} 
              y={y + gap/2} 
              width={width - gap} 
              height={height - gap} 
              rx={borderRadius}
              ry={borderRadius}
            />
          </clipPath>
          <filter id={`shadow-${uniqueId}`}>
            <feGaussianBlur in="SourceAlpha" stdDeviation="2" />
            <feOffset dx="0" dy="0" result="offsetblur" />
            <feFlood floodColor="#000000" floodOpacity="0.3" />
            <feComposite in2="offsetblur" operator="in" />
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <image
          x={x + gap/2}
          y={y + gap/2}
          width={width - gap}
          height={height - gap}
          href={image}
          clipPath={`url(#${uniqueId})`}
          preserveAspectRatio="xMidYMid slice"
          style={{ 
            opacity: 0.8,
            filter: `url(#shadow-${uniqueId})`
          }}
        />
        {width > 50 && height > 30 && (
          <>
            <text
              x={x + width / 2}
              y={y + height / 2 - 16}
              textAnchor="middle"
              fill="#fff"
              fontSize={14}
              fontWeight="bold"
              style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.7)' }}
            >
              {name}
            </text>
            <text
              x={x + width / 2}
              y={y + height / 2}
              textAnchor="middle"
              fill="#fff"
              fontSize={11}
              style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.7)' }}
            >
              ${formatNumber(marketCap)}
            </text>
          </>
        )}
      </g>
    );
  };

  const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: any[] }) => {
    if (!active || !payload?.[0]?.payload) return null;

    const data = payload[0].payload as TreemapData;
    return (
      <Box
        sx={{
          backgroundColor: 'background.paper',
          p: 1.5,
          border: 1,
          borderColor: 'divider',
          borderRadius: 1,
        }}
      >
        <div style={{ color: theme.palette.text.primary }}>
          <strong>{data.name}</strong>
        </div>
        <div style={{ color: theme.palette.text.secondary }}>
          Market Cap: ${formatNumber(data.marketCap)}
        </div>
       
      </Box>
    );
  };

  return (
    <ResponsiveContainer width="100%" height={400}>
      <RechartsTreemap
        data={data}
        dataKey="size"
        ratio={4/3}
        stroke="none"
        content={<CustomContent />}
      >
        <Tooltip content={<CustomTooltip />} />
      </RechartsTreemap>
    </ResponsiveContainer>
  );
};

export default Treemap; 