import * as React from 'react';

import Button from '@mui/material/Button';
import ReplayIcon from '@mui/icons-material/Replay';

export interface RetryButtonProps {
  onClick?: () => void;
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
