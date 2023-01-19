import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { useRecoilState } from 'recoil';
import LinkIcon from '@mui/icons-material/Link';

import SQLCard from 'src/components/Card/SQLCard';
import ResultCard from 'src/components/Card/ResultCard';
import { postQuestion, postSQL2Chart } from 'src/api/question';
import { questionLoadingState } from 'src/recoil/atoms';
import logger from 'next-pino/logger';

export interface ChartAnswerProps {
  chartName: string;
  title: string;
  columns: any[];
}

export default function AnswerCard(props: {
  question: string;
  highlight?: boolean;
}) {
  const { question, highlight } = props;
  const [answerData, setAnswerData] = React.useState('');
  const [error, setError] = React.useState<Error | null>(null);
  const [rows, setRows] = React.useState<any[] | null>(null);
  const [chartAnswer, setChartAnswer] = React.useState<ChartAnswerProps | null>(
    null
  );
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
      } finally {
        setLoading(false);
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
    <>
      <CommonAnswerCard
        question={question}
        sqlAnswer={answerData}
        chartAnswer={chartAnswer}
        rows={rows}
        answerError={error}
        chartError={chartError}
      />
    </>
  );
}

export interface CommonAnswerCard {
  question: string;
  sqlAnswer: string;
  chartAnswer: ChartAnswerProps | null;
  answerError: Error | null;
  chartError: Error | null;
  rows: any[] | null;
}

export function CommonAnswerCard(props: CommonAnswerCard) {
  const { question, sqlAnswer, chartAnswer, answerError, chartError, rows } =
    props;

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
          <Box display="flex" alignItems="center">
            <Typography variant="h5" component="div">
              {question}
            </Typography>
            <Box ml="auto">
              <CopyShareLinkBtn question={question} />
            </Box>
          </Box>
          <br />
          <SQLCard loading={!sqlAnswer} sql={sqlAnswer} error={answerError} />
          {sqlAnswer && (
            <>
              <br />
              <ResultCard
                loading={chartError ? !chartError : !rows}
                error={chartError}
                sql={sqlAnswer}
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

export function CopyShareLinkBtn(props: { question: string }) {
  const { question } = props;

  const [isCopied, setIsCopied] = React.useState(false);

  React.useEffect(() => {
    if (isCopied) {
      const timer = setTimeout(() => {
        setIsCopied(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isCopied]);

  return (
    <>
      <IconButton
        aria-label="share"
        size="small"
        onClick={() => {
          typeof navigator !== 'undefined' &&
            navigator.clipboard.writeText(
              `${process.env.NEXT_PUBLIC_BASE_URL}?search=${encodeURIComponent(
                question
              )}`
            );
          setIsCopied(true);
        }}
        sx={{
          display: isCopied ? 'none' : 'inline-flex',
        }}
      >
        <LinkIcon />
      </IconButton>
      {isCopied && (
        <Box
          sx={{
            padding: '5px',
          }}
        >
          <Typography component="span" variant="body2" lineHeight="24px">
            URL copied!
          </Typography>
        </Box>
      )}
    </>
  );
}
