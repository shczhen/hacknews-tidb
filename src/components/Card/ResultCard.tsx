import * as React from 'react';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import InsertChartRoundedIcon from '@mui/icons-material/InsertChartRounded';
import TableChartRoundedIcon from '@mui/icons-material/TableChartRounded';

import CodeBlock from 'src/components/Block/CodeBlock';
import EChartBlock, {
  generateChartOptionByType,
} from 'src/components/Block/EChartBlock';
import { row2string } from 'src/utils/stringfy';

export interface ResultCardProps {
  sql: string;
  rows: any[];
  heading?: string;
  loading?: boolean;
  error?: any;
  chart?: string;
  meta: any;
}

export default function ResultCard(props: ResultCardProps) {
  const { sql, rows, heading, loading, error, chart, meta } = props;
  const [displayType, setDisplayType] = React.useState<'chart' | 'table'>(
    'chart'
  );

  const rowStrMemo = React.useMemo(() => {
    if (!rows) return '';
    return row2string(rows);
  }, [rows]);

  const chartOptionMemo = React.useMemo(() => {
    if (!rows || !chart) return undefined;
    return generateChartOptionByType(chart, rows, meta);
  }, [rows, chart]);

  return (
    <Box>
      <Box
        display="flex"
        justifyContent="flex-end"
        pt="1rem"
        pb="1rem"
        sx={{
          '& .MuiButtonGroup-grouped:not(:last-of-type)': {
            borderColor: 'white',
          },
        }}
      >
        {loading && <Skeleton variant="rounded" width={204} height={38} />}
        {!loading && (
          <ButtonGroup
            variant="contained"
            aria-label="switch between chart and table"
            disabled={!!error}
            size="small"
          >
            <Button
              startIcon={<InsertChartRoundedIcon />}
              onClick={() => setDisplayType('chart')}
              sx={{
                backgroundColor: 'hn.primary',
                '&:hover': {
                  backgroundColor: 'hn.primary',
                },
              }}
            >
              Chart
            </Button>
            <Button
              startIcon={<TableChartRoundedIcon />}
              onClick={() => setDisplayType('table')}
              sx={{
                backgroundColor: 'hn.primary',
                '&:hover': {
                  backgroundColor: 'hn.primary',
                },
              }}
            >
              Table
            </Button>
          </ButtonGroup>
        )}
      </Box>
      {loading && <Skeleton variant="rounded" height={60} />}
      {error && <Typography color="error">{error.message}</Typography>}
      {error?.response?.data?.error && (
        <Typography color="error">
          {error?.response?.data?.error.message}
        </Typography>
      )}
      {!loading && rows && (
        <>
          {!!rowStrMemo && (
            <CodeBlock language="bash" hidden={displayType !== 'table'} boxSx={{
              border: '1px solid #e0e0e0',
            }}>
              {rowStrMemo}
            </CodeBlock>
          )}
          {typeof chartOptionMemo !== 'undefined' && (
            <EChartBlock
              chart={chartOptionMemo}
              hidden={displayType !== 'chart'}
            />
          )}
        </>
      )}
    </Box>
  );
}
