import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';

import { questionsState, questionLoadingState } from 'src/recoil/atoms';
import SQLCard from 'src/components/Card/SQLCard';
import { postQuestion } from 'src/api/question';
import logger from 'next-pino/logger';

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

function AnswerCard(props: { question: string }) {
  const { question } = props;
  const [answerData, setAnswerData] = React.useState('');
  const [error, setError] = React.useState<Error | null>(null);

  const [loading, setLoading] = useRecoilState(questionLoadingState);

  React.useEffect(() => {
    const getAnswer = async (question: string) => {
      try {
        const data = await postQuestion(question);
        setAnswerData(data.answer);
        setLoading(false);
      } catch (error: any) {
        logger.error(
          {
            name: 'AnswerCard',
            error,
          },
          `getAnswer error`
        );
        setError(error);
      }
    };

    if (question && !answerData) {
      void getAnswer(question);
    }
  }, [question]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
      }}
    >
      <Typography>{`Q: ${question}`}</Typography>
      <SQLCard loading={!answerData} sql={answerData} error={error} />
    </Box>
  );
}
