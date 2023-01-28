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
  const [sqlRetryCount, setSqlRetryCount] = React.useState(0);
  const [rows, setRows] = React.useState<any[] | null>(null);
  const [chartAnswer, setChartAnswer] = React.useState<ChartAnswerProps | null>(
    null
  );
  const [chartError, setChartError] = React.useState<Error | null>(null);
  const [chartRetryCount, setChartRetryCount] = React.useState(0);

  const [loading, setLoading] = useRecoilState(questionLoadingState);

  const handleRetry = (type?: 'sql' | 'chart') => {
    console.log('handleRetry', type);
    if (type === 'sql') {
      setError(null);
      setSqlRetryCount(sqlRetryCount + 1);
    } else if (type === 'chart') {
      setChartRetryCount(chartRetryCount + 1);
    }
    setLoading(true);
  };

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

    if (question && !answerData && sqlRetryCount >= 0) {
      void getAnswer(question);
    }
  }, [question, sqlRetryCount]);

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
        onRetry={handleRetry}
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
  onRetry?: (type?: 'sql' | 'chart') => void;
}

export function CommonAnswerCard(props: CommonAnswerCard) {
  const {
    question,
    sqlAnswer,
    chartAnswer,
    answerError,
    chartError,
    rows,
    onRetry,
  } = props;

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
          border: 'unset',
          // borderWidth: '1px',
          // borderStyle: 'solid',
          // borderColor: 'grey.300',
          backgroundColor: 'transparent',

          animation: 'changebackgroudcolor 2s',
          '@keyframes changebackgroudcolor': {
            '0%': {
              backgroundColor: 'transparent',
              borderColor: '#333',
            },
            '100%': {
              backgroundColor: 'transparent',
              borderColor: 'grey.300',
            },
          },
        }}
      >
        <CardContent>
          <Box display="flex" alignItems="center">
            <Typography component="div" fontWeight="bold">
              Q: {question}
            </Typography>
            <Box ml="auto">
              <CopyShareLinkBtn question={question} />
            </Box>
          </Box>
          <SQLCard
            loading={answerError ? false : !sqlAnswer}
            sql={sqlAnswer}
            error={answerError}
            onRetry={onRetry}
          />
          {sqlAnswer && (
            <>
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
              `${process.env.NEXT_PUBLIC_HOST}?search=${encodeURIComponent(
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
