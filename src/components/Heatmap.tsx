import React from 'react';
import { ResponsiveHeatMap } from '@nivo/heatmap';
import { useTheme } from '@mui/material';

interface HeatmapProps {
  data: {
    id: string;
    data: Array<{
      x: string;
      y: number;
    }>;
  }[];
}

const Heatmap: React.FC<HeatmapProps> = ({ data }) => {
  const theme = useTheme();

  return (
    <div style={{ height: '400px', width: '100%' }}>
      <ResponsiveHeatMap
        data={data}
        margin={{ top: 60, right: 90, bottom: 60, left: 90 }}
        valueFormat=">-.2%"
        axisTop={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: -45,
          legend: '',
          legendOffset: 46
        }}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: -45,
          legend: '',
          legendOffset: 46
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Asset',
          legendPosition: 'middle',
          legendOffset: -72
        }}
        colors={{
          type: 'diverging',
          scheme: 'red_yellow_green',
          divergeAt: 0.5,
          minValue: -0.1,
          maxValue: 0.1
        }}
        emptyColor="#555555"
        borderColor={theme.palette.divider}
        labelTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
        theme={{
          axis: {
            ticks: {
              text: {
                fill: theme.palette.text.primary
              }
            },
            legend: {
              text: {
                fill: theme.palette.text.primary
              }
            }
          },
          labels: {
            text: {
              fill: theme.palette.text.primary
            }
          }
        }}
      />
    </div>
  );
};

export default Heatmap; 