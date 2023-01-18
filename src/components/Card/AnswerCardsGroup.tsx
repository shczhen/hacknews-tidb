import * as React from 'react';
import Box from '@mui/material/Box';
import { useRecoilValue } from 'recoil';

import { questionsState } from 'src/recoil/atoms';
import AnswerCard from 'src/components/Card/AnswerCard';

export default function AnswerCardsGroup() {
  const questions = useRecoilValue(questionsState);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column-reverse',
        gap: '1rem',
      }}
    >
      {questions.map((q, idx) => (
        <AnswerCard key={`${idx}-${q}`} question={q} />
      ))}
    </Box>
  );
}
