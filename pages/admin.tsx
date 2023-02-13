import * as React from 'react';
import dynamic from 'next/dynamic';
import Box from '@mui/material/Box';

import Layout from 'src/components/Layout';
import logger from 'next-pino/logger';

const DynamicAceSQLEditor = dynamic(
  () => import('src/components/Editor/SQLEditor'),
  {
    loading: () => <>Loading...</>,
    ssr: false, // https://nextjs.org/docs/advanced-features/dynamic-import#with-no-ssr
  }
);

export default function AdminPage() {
  return (
    <>
      <Layout recapcha>
        admin page
        <Box
          sx={{
            height: '300px',
          }}
        >
          <DynamicAceSQLEditor
            mode="sql"
            theme="github"
            value={'select * from test;'}
            onChange={() => {}}
            name="SQL_EDITOR"
          />
        </Box>
      </Layout>
    </>
  );
}
