import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from 'next/link';

const STATIC_QUESTIONS = [
  `What is the trend of new users per month in 2022?`,
  `User items in 2021?`,
  `How many users are there in 2021?`,
];

// default is 3000 ms
const INTERVAL = 3000;

export default function HorizontalBar() {
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % STATIC_QUESTIONS.length);
    }, INTERVAL);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      sx={{
        width: '100%',
        height: 30,
        backgroundColor: 'transparent',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '0.5rem',
      }}
    >
      <Link href={`/?search=${encodeURIComponent(STATIC_QUESTIONS[index])}`}>
        <Typography
          sx={{
            '&:hover': {
              textDecoration: 'underline',
            },
          }}
        >{`${STATIC_QUESTIONS[index]}`}</Typography>
      </Link>
    </Box>
  );
}
