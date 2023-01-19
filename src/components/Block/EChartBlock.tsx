import * as React from 'react';
import * as echarts from 'echarts';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { SxProps, Theme } from '@mui/system';

const vintageColorPalette = [
  '#d87c7c',
  '#919e8b',
  '#d7ab82',
  '#6e7074',
  '#61a0a8',
  '#efa18d',
  '#787464',
  '#cc7e63',
  '#724e58',
  '#4b565b',
];

export interface EChartBlockProps {
  chart: any;
  hidden?: boolean;
  boxSx?: SxProps<Theme>;
}

export default function EChartBlock(props: EChartBlockProps) {
  const { chart, hidden, boxSx } = props;
  const chartRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!chartRef.current) return;
    if (!chart) return;
    echarts.registerTheme('vintage', {
      color: vintageColorPalette,
      backgroundColor: '#f6f6ef',
      graph: {
        color: vintageColorPalette,
      },
    });
    const chartInstance = echarts.init(chartRef.current, 'vintage');
    chartInstance.setOption(chart);
    const resize = () => {
      chartInstance.resize();
    };
    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('resize', resize);
      chartInstance.dispose();
    };
  }, [chart]);

  if (!chart)
    return (
      <Box display={hidden ? 'none' : 'block'}>
        <Typography>Charts temporarily unavailable.</Typography>
        <Typography>Please switch to Table and view results.</Typography>
      </Box>
    );

  return (
    <Box
      component="div"
      width="100%"
      height="30rem"
      ref={chartRef}
      display={hidden ? 'none' : 'block'}
      sx={{
        ...boxSx,
      }}
    ></Box>
  );
}

// Chart
// PieChart
// LineChart
// BarChart
// NumberCard
export function generateChartOptionByType(
  type: string,
  rows: any[],
  meta: any
) {
  switch (type) {
    case 'PieChart':
      return generatePieChartOption(rows, meta);
    case 'LineChart':
      return generateLineOrBarChartOption('line', rows, meta);
    case 'BarChart':
      return generateLineOrBarChartOption('bar', rows, meta);
    // case 'NumberCard':
    //   return generateNumberCardOption(rows);
    default:
      return null;
  }
}

export function generatePieChartOption(
  rows: any[],
  meta: {
    title: string;
    label?: string;
    value: string;
  }
) {
  const { label, value } = meta;
  const data = label
    ? rows.map((row) => {
        return {
          name: row[label],
          value: row[value],
        };
      })
    : {
        name: 'default',
        value: rows[0][value],
      };
  const option = {
    title: {
      text: meta.title,
      left: 'center',
    },
    tooltip: {
      trigger: 'item',
    },
    legend: {
      orient: 'vertical',
      left: 'left',
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: '50%',
        data: data,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  };
  return option;
}

export function generateLineOrBarChartOption(
  type: 'line' | 'bar',
  rows: any[],
  meta: {
    title: string;
    x: string;
    y: string | string[];
  }
) {
  const { x, y } = meta;

  const flattenY = Array.isArray(y) ? y : [y];

  const lineOption = {
    xAxis: {
      type: 'category',
      // data: rows.map((row) => row[x]),
      axisLine: {
        lineStyle: {
          color: '#999'
        },
      },
    },
    yAxis: {
      type: 'value',
    },
    // tooltip: {
    //   formatter: function (params: any) {
    //     return JSON.stringify(params.data);
    //   }
    // },
    tooltip: {
      trigger: 'axis',
    },
    // series: [
    //   {
    //     data: rows.map((row) => row[y]),
    //     type: type,
    //   },
    // ],
    series: flattenY.map((y) => {
      return {
        data: rows.map((row) => row[y]),
        type: type,
      };
    }),
  };

  const barOption = {
    yAxis: {
      type: 'category',
      data: rows.map((row) => row[x]),
    },
    xAxis: {
      type: 'value',
    },
    series: flattenY.map((y) => {
      return {
        data: rows.map((row) => row[y]),
        type: type,
      };
    }),
  };

  return type === 'line' ? lineOption : barOption;
}
