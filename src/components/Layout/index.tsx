import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

import Header, {
  SearchAppBarProps,
} from '@src/components/Layout/QuestionHeader';
import Seo from 'src/components/Layout/Seo';
import Footer from 'src/components/Layout/Footer';
import 'github-markdown-css/github-markdown-light.css';

export interface LayoutProps {
  children: React.ReactNode;
  markdown?: boolean;
}

export default function Layout(props: LayoutProps & SearchAppBarProps) {
  const { children, handleSearch, disableSearch, markdown } = props;

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
          '& .markdown-body': {
            backgroundColor: 'hn.background',
          },
        }}
      >
        <Container sx={{ height: '100%' }}>
          <Box
            sx={{
              backgroundColor: 'hn.background',
              height: '100%',
              padding: { xs: '1rem', sm: '1.5rem' },
              "&.markdown-body pre": {
                backgroundColor: 'hn.background',
              }
            }}
            className={markdown ? 'markdown-body' : ''}
          >
            {children}
          </Box>
        </Container>
      </Box>
      <Footer />
    </>
  );
}
