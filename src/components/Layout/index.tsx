import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

import Header from 'src/components/Layout/Header';
import Seo from 'src/components/Layout/Seo';

export interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout(props: LayoutProps) {
  const { children } = props;

  return (
    <>
      <Header />
      <Seo />
      <Box
        sx={{
          backgroundColor: 'background.paper',
          height: 'auto',
          minHeight: 'calc(100vh - 64px)',
          mt: '64px',
        }}
      >
        <Container sx={{ height: '100%' }}>
          <Box
            sx={{
              // backgroundColor: 'hn.background',
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
