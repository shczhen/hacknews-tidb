import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';

import CodeBlock from 'src/components/Block/CodeBlock';

export interface SQLCardProps {
  sql: string;
  loading?: boolean;
  error?: Error | null;
}

export default function SQLCard(props: SQLCardProps) {
  const { sql, loading, error } = props;

  return (
    <Card sx={{ minWidth: 275 }} raised>
      <CardContent>
        <Typography variant="h5" component="div">
          SQL genereated by AI
        </Typography>
        <br />
        {loading && <Skeleton variant="rounded" height={60} />}
        {sql && <CodeBlock language="sql">{`    ` + sql.trim()}</CodeBlock>}
        {error && <Typography color="error">{error.message}</Typography>}
      </CardContent>
    </Card>
  );
}
