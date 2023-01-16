import * as React from 'react';
// import hljs from 'highlight.js';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import sql from 'highlight.js/lib/languages/sql';
import 'highlight.js/styles/github.css';
import Box from '@mui/material/Box';

import { IconCopyButton } from 'src/components/Button/CopyButton';

interface CodeBlockProps {
  language?: string;
  children: React.ReactNode;
}

hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('sql', sql);
const registeredLanguages = new Set(['sql']);

export default function CodeBlock(props: CodeBlockProps) {
  const { language = '', children } = props;
  const [highlighted, setHighlighted] = React.useState(false);

  const ref = React.useRef<HTMLPreElement>(null);

  React.useEffect(() => {
    if (registeredLanguages.has(language) && ref.current && !highlighted) {
      hljs.highlightBlock(ref.current);
      setHighlighted(true);
    }
  }, [highlighted, language]);

  return (
    <Box
      component="pre"
      sx={{
        backgroundColor: 'hn.background',
        position: 'relative',
        borderRadius: 1,
        '& .hljs': {
          background: 'transparent',
        },
      }}
    >
      {children && (
        <Box
          sx={{
            position: 'absolute',
            right: 0,
            top: 8,
            backgroundColor: 'inherit',
          }}
        >
          <IconCopyButton content={children?.toString()} />
        </Box>
      )}
      <Box component="code" ref={ref} className={language}>
        {children}
      </Box>
    </Box>
  );
}
