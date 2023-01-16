import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import AlarmIcon from '@mui/icons-material/Alarm';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';

interface IconCopyButtonProps {
  content: string;
  labels?: {
    copy: string;
    copied: string;
  };
}

export function IconCopyButton(props: IconCopyButtonProps) {
  const { content, labels = { copy: 'Copy', copied: 'Copied' } } = props;
  const [copied, setCopied] = React.useState(false);

  React.useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => {
        setCopied(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  const handleCopy = () => {
    if (copied) return;
    console.log('content', content);

    typeof navigator !== 'undefined' && navigator.clipboard.writeText(content);
    setCopied(true);
  };

  return (
    <IconButton aria-label="copy" onClick={handleCopy} size="small">
      {copied ? <CheckRoundedIcon fontSize='inherit' /> : <ContentCopyRoundedIcon  fontSize='inherit'/>}
    </IconButton>
  );
}
