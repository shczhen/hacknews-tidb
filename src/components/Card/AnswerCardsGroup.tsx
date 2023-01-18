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
import AnswerCard from 'src/components/Card/AnswerCard';
import SQLCard from 'src/components/Card/SQLCard';
import ResultCard from 'src/components/Card/ResultCard';
import { postQuestion, postSQL2Chart } from 'src/api/question';
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

// function AnswerCard(props: { question: string }) {
//   const { question } = props;
//   const [answerData, setAnswerData] = React.useState('');
//   const [error, setError] = React.useState<Error | null>(null);
//   const [rows, setRows] = React.useState<any[] | null>(null);
//   const [chartAnswer, setChartAnswer] = React.useState<{
//     chartName: string;
//     title: string;
//     columns: any[];
//   } | null>(null);
//   const [chartError, setChartError] = React.useState<Error | null>(null);

//   const [loading, setLoading] = useRecoilState(questionLoadingState);

//   React.useEffect(() => {
//     const getAnswer = async (question: string) => {
//       try {
//         const data = await postQuestion(question);
//         setAnswerData(data.answer);
//         // setLoading(false);
//       } catch (error: any) {
//         logger.error(
//           {
//             name: 'AnswerCard',
//             error,
//           },
//           `getAnswer error`
//         );
//         setError(error);
//       }
//     };

//     if (question && !answerData) {
//       void getAnswer(question);
//     }
//   }, [question]);

//   React.useEffect(() => {
//     const getDataAndChart = async (question: string, sql: string) => {
//       try {
//         const data = await postSQL2Chart(question, sql);
//         setChartAnswer(JSON.parse(data.answer));
//         setRows(data.rows);
//         setLoading(false);
//       } catch (error: any) {
//         logger.error(
//           {
//             name: 'AnswerCard',
//             error,
//           },
//           `getDataAndChart error`
//         );
//         setChartError(error);
//       }
//     };
//     if (answerData) {
//       getDataAndChart(question, answerData);
//     }
//   }, [answerData]);

//   return (
//     <Box
//       sx={{
//         display: 'flex',
//         flexDirection: 'column',
//         gap: '1rem',
//       }}
//     >
//       <Typography>{`Q: ${question}`}</Typography>
//       <SQLCard loading={!answerData} sql={answerData} error={error} />
//       {answerData && (
//         <ResultCard
//           loading={!rows}
//           sql={answerData}
//           rows={rows || []}
//           heading={chartAnswer?.title}
//           chart={chartAnswer?.chartName}
//           meta={chartAnswer}
//         />
//       )}
//     </Box>
//   );
// }
