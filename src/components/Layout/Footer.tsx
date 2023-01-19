import * as React from 'react';
import Link from 'next/link';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export const FOOTER_ITEMS = [
  {
    id: 'about',
    label: 'About',
    href: '/about',
  },
  {
    id: 'tidbcloud',
    label: 'TiDB Cloud',
    href: 'https://tidbcloud.com/channel?utm_source=chat2query-hackernews&utm_medium=referral',
  },
  {
    id: 'github',
    label: 'GitHub',
    href: 'https://github.com/shczhen/hacknews-tidb',
  },
  {
    id: 'twitter',
    label: 'Twitter',
    href: 'https://twitter.com/OSSInsight',
  },
  {
    id: 'hackernews',
    label: 'Hacker News',
    href: 'https://news.ycombinator.com',
  },
];

export function isOuterLink(href: string) {
  return href.startsWith('http');
}

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        pt: '1rem',
        pb: '1rem',
      }}
    >
      <Container>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          {FOOTER_ITEMS.map((item, idx) => (
            <React.Fragment key={item.id}>
              <Link
                href={item.href}
                target={isOuterLink(item.href) ? '_blank' : undefined}
              >
                <Typography component="div" color={'text.secondary'}>
                  {item.label}
                </Typography>
              </Link>
              {idx < FOOTER_ITEMS.length - 1 && bull}
            </React.Fragment>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
