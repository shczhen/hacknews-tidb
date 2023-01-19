import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

import Header, {
  SearchAppBarProps,
} from '@src/components/Layout/QuestionHeader';
import Seo from 'src/components/Layout/Seo';

export interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout(props: LayoutProps & SearchAppBarProps) {
  const { children, handleSearch, disableSearch } = props;

  return (
    <>
      <Header handleSearch={handleSearch} disableSearch={disableSearch} />
      <Seo />
      <Box
        sx={{
          backgroundColor: '#fff',
          // backgroundColor: 'hn.background',
          height: 'auto',
          minHeight: 'calc(100vh - 64px)',
          pt: {
            xs: '48px',
            sm: '64px',
          },
        }}
      >
        <Container sx={{ height: '100%' }}>
          <Box
            sx={{
              backgroundColor: 'hn.background',
              height: '100%',
              padding: { xs: '1rem', sm: '1.5rem' },
            }}
          >
            {children}
          </Box>
        </Container>
      </Box>
    </>
  );
}
