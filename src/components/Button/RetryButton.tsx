import * as React from 'react';

import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ReplayIcon from '@mui/icons-material/Replay';

export interface RetryButtonProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export default function RetryButton(props: RetryButtonProps) {
  const { onClick } = props;

  return (
    <Button
      variant="contained"
      size="small"
      startIcon={<ReplayIcon />}
      onClick={onClick}
      sx={{
        backgroundColor: 'hn.primary',
        '&:hover': {
          backgroundColor: 'hn.primary',
        },
      }}
    >
      Retry
    </Button>
  );
}

export function RetryIconButton(props: RetryButtonProps) {
  const { onClick } = props;

  return (
    <IconButton
      aria-label="retry"
      onClick={onClick}
      size="small"
      sx={{
        color: 'white',
        fontSize: '0.75rem',
        backgroundColor: 'hn.primary',
        '&:hover': {
          backgroundColor: 'hn.primary',
        },
      }}
    >
      <ReplayIcon fontSize="inherit" />
    </IconButton>
  );
}
