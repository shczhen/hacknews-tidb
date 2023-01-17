import * as React from 'react';
import * as echarts from 'echarts';
import Box from '@mui/material/Box';

// export default function EChartBlock(props: any) {
//   const { chart, hidden } = props;
//   const chartRef = React.useRef<HTMLDivElement>(null);

//   React.useEffect(() => {
//     if (!chartRef.current) return;
//     if (!chart) return;
//     const chartInstance = echarts.init(chartRef.current);
//     chartInstance.setOption(chart);
//     return chartInstance.dispose();
//   }, [chart]);

//   return (
//     <Box
//       component="div"
//       width="100%"
//       height="20rem"
//       ref={chartRef}
//       display={hidden ? 'none' : 'block'}
//     ></Box>
//   );
// }

export default function EChartBlock(props: any) {
  const { chart, hidden } = props;
  const chartRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!chartRef.current) return;
    if (!chart) return;
    const chartInstance = echarts.init(chartRef.current);
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

  return (
    <Box
      component="div"
      width="100%"
      height="40rem"
      ref={chartRef}
      display={hidden ? 'none' : 'block'}
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
    // case 'LineChart':
    //   return generateLineChartOption(rows);
    // case 'BarChart':
    //   return generateBarChartOption(rows);
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
