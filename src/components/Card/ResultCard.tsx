import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';

import CodeBlock from 'src/components/Block/CodeBlock';
import { row2string } from 'src/utils/stringfy';

export interface ResultCardProps {
  sql: string;
  rows: any[];
  heading?: string;
  loading?: boolean;
  error?: Error | null;
}

export default function ResultCard(props: ResultCardProps) {
  const { sql, rows, heading, loading, error } = props;

  const rowStrMemo = React.useMemo(() => {
    return row2string(rows);
  }, [rows]);

  return (
    <Card sx={{ minWidth: 275 }} raised>
      <CardContent>
        <Typography variant="h5" component="div">
          {heading || 'Result'}
        </Typography>
        <br />
        {loading && <Skeleton variant="rounded" height={60} />}
        {error && <Typography color="error">{error.message}</Typography>}
        <CodeBlock language='bash'>{rowStrMemo}</CodeBlock>
      </CardContent>
    </Card>
  );
}
