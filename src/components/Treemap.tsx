import React from 'react';
import { Treemap as RechartsTreemap, ResponsiveContainer, Tooltip } from 'recharts';
import { Box, useTheme } from '@mui/material';
import { formatNumber } from '../utils/formatNumber';

interface TreemapProps {
  data: {
    name: string;
    size: number;
    value: number;
    color: string;
  }[];
}

const CustomContent = (props: any) => {
  const { x, y, width, height, name, value, color } = props;
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        style={{
          fill: color,
          stroke: '#fff',
          strokeWidth: 2,
          strokeOpacity: 1,
        }}
      />
      {width > 50 && height > 30 && (
        <>
          <text
            x={x + width / 2}
            y={y + height / 2 - 8}
            textAnchor="middle"
            fill="#fff"
            fontSize={12}
          >
            {name}
          </text>
          <text
            x={x + width / 2}
            y={y + height / 2 + 8}
            textAnchor="middle"
            fill="#fff"
            fontSize={11}
          >
            {formatNumber(value)}
          </text>
        </>
      )}
    </g>
  );
};

const Treemap: React.FC<TreemapProps> = ({ data }) => {
  const theme = useTheme();

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
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
            Market Cap: ${data.size.toLocaleString()}
          </div>
          <div style={{ color: data.value >= 0 ? '#4caf50' : '#f44336' }}>
            24h: {data.value.toFixed(2)}%
          </div>
        </Box>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={400}>
      <RechartsTreemap
        data={data}
        dataKey="size"
        ratio={4/3}
        stroke="#fff"
        content={<CustomContent />}
      >
        <Tooltip content={<CustomTooltip />} />
      </RechartsTreemap>
    </ResponsiveContainer>
  );
};

export default Treemap; 