import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useRecoilState } from 'recoil';

import SQLCard from 'src/components/Card/SQLCard';
import ResultCard from 'src/components/Card/ResultCard';
import { postQuestion, postSQL2Chart } from 'src/api/question';
import { questionLoadingState } from 'src/recoil/atoms';
import logger from 'next-pino/logger';

export default function AnswerCard(props: {
  question: string;
  highlight?: boolean;
}) {
  const { question, highlight } = props;
  const [answerData, setAnswerData] = React.useState('');
  const [error, setError] = React.useState<Error | null>(null);
  const [rows, setRows] = React.useState<any[] | null>(null);
  const [chartAnswer, setChartAnswer] = React.useState<{
    chartName: string;
    title: string;
    columns: any[];
  } | null>(null);
  const [chartError, setChartError] = React.useState<Error | null>(null);

  const [loading, setLoading] = useRecoilState(questionLoadingState);

  React.useEffect(() => {
    const getAnswer = async (question: string) => {
      try {
        const data = await postQuestion(question);
        setAnswerData(data.answer);
        // setLoading(false);
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

  React.useEffect(() => {
    const getDataAndChart = async (question: string, sql: string) => {
      try {
        const data = await postSQL2Chart(question, sql);
        setChartAnswer(JSON.parse(data.answer));
        setRows(data.rows);
      } catch (error: any) {
        logger.error(
          {
            name: 'AnswerCard',
            error,
          },
          `getDataAndChart error`
        );
        setChartError(error);
      } finally {
        setLoading(false);
      }
    };
    if (answerData) {
      getDataAndChart(question, answerData);
    }
  }, [answerData]);

  return (
    <Box
      sx={{
        overflow: 'auto',
      }}
    >
      <Card
        sx={{
          minWidth: 425,
          boxShadow: 'none',
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: 'grey.300',

          animation: 'changebackgroudcolor 5s',
          '@keyframes changebackgroudcolor': {
            '0%': {
              backgroundColor: 'white',
              borderColor: 'grey.300',
            },
            '50%': {
              backgroundColor: 'grey.300',
              borderColor: 'grey.500',
            },
            '100%': {
              backgroundColor: 'white',
              borderColor: 'grey.300',
            },
          },
        }}
      >
        <CardContent>
          <Typography variant="h5" component="div">
            {question}
          </Typography>
          <br />
          <SQLCard loading={!answerData} sql={answerData} error={error} />
          {answerData && (
            <>
              <br />
              <ResultCard
                loading={chartError ? !chartError : !rows}
                sql={answerData}
                rows={rows || []}
                heading={chartAnswer?.title}
                chart={chartAnswer?.chartName}
                meta={chartAnswer}
              />
            </>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}
