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
import ResultCard from 'src/components/Card/ResultCard';
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
      <ResultCard sql="" rows={MOCK_ROWS} />
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

const MOCK_ROWS = [
  {
    id: 34202045,
    title: 'Closing Shop – The Plain Text Project',
    url: 'https://plaintextproject.online/articles/2022/12/21/closing.html',
    text: null,
    type: 'story',
    by: 'jethronethro',
    time: 1672531064,
    score: 5,
    parent: null,
    descendants: 1,
    deleted: 0,
    dead: 0,
    last_fetch_at: '2023-01-01T01:11:48.000Z',
    kids: [34202575],
    parts: null,
    poll: null,
  },
  {
    id: 34201955,
    title: 'New Years Eve Address of President of Ukraine Volodymyr Zelenskyy',
    url: 'https://www.president.gov.ua/en/news/novorichne-privitannya-prezidenta-ukrayini-volodimira-zelens-80197',
    text: null,
    type: 'story',
    by: 'jasonhansel',
    time: 1672530289,
    score: 12,
    parent: null,
    descendants: 0,
    deleted: 0,
    dead: 0,
    last_fetch_at: '2023-01-01T00:23:17.000Z',
    kids: null,
    parts: null,
    poll: null,
  },
  {
    id: 34201942,
    title: 'Flying blind: The problem isn’t flight cancellations – It’s flying',
    url: 'https://thehill.com/opinion/energy-environment/3794342-flying-blind-the-problem-isnt-flight-cancellations-its-flying/',
    text: null,
    type: 'story',
    by: 'JSeymourATL',
    time: 1672530220,
    score: 7,
    parent: null,
    descendants: 2,
    deleted: 0,
    dead: 0,
    last_fetch_at: '2023-01-02T18:37:28.000Z',
    kids: [34202577, 34202112],
    parts: null,
    poll: null,
  },
  {
    id: 34201931,
    title: 'Show HN: My programming language, building in public for 1 year',
    url: 'https://petersaxton.uk/log/',
    text: 'My weekly(ish) video logs tracking my progress of building a completely sound statically typed language and structural editor. The motivation is to make lots of invalid programs unrepresentable.',
    type: 'story',
    by: 'crowdhailer',
    time: 1672530146,
    score: 7,
    parent: null,
    descendants: 3,
    deleted: 0,
    dead: 0,
    last_fetch_at: '2023-01-03T19:19:40.000Z',
    kids: [34202526, 34202399, 34202415],
    parts: null,
    poll: null,
  },
  {
    id: 34201919,
    title: 'Ask HN: Is this new ThinkPad E14 worth it to bother with warranty?',
    url: null,
    text: 'So I bought a new ThinkPad E14 Gen2 for 560 euros in the Baltic market. It has 15.2 GB of usable RAM instead of 16GB stated and 930GB SSD instead of 1Tb stated by the vendor mdata.lt. No wonder they were reluctant for me to check the SSD storage upon delivery. Hope that they go bankrupt and hang their useless selves in theirs useless offices.<p>It also has a backlit keyboard, aluminum casing on top and probably PC + ABS casing on the bottom, AMD 3 4300U 4 core CPU, Windows10 pre-installed, 2 year warranty.<p>I can buy a refurbished T480 for ~500 euros with the 1Tb SSD and 16GB RAM + 2 year warranty for the Thinkpad and 6 month warranty for the battery from another vendor. Or a new L14 G1 with 8gb RAM, 256 GB SSD, AMD Ryzen 5 6 core and backlit keyboard for ~670 euros (no soldered RAM) from another vendor.<p>Should I bother to send this E14 for incorrect specs (the discrepancy in which basically may not matter much for me for now)?',
    type: 'story',
    by: 'amts',
    time: 1672530055,
    score: 2,
    parent: null,
    descendants: 21,
    deleted: 0,
    dead: 0,
    last_fetch_at: '2023-01-05T15:32:07.000Z',
    kids: [34202043, 34201951, 34207087, 34203441, 34222487, 34202021],
    parts: null,
    poll: null,
  },
  {
    id: 34201871,
    title: 'Programming Pascal Using an AI Chatbot',
    url: 'https://www.getlazarus.org/aichatbot/',
    text: null,
    type: 'story',
    by: 'sysrpl',
    time: 1672529765,
    score: 1,
    parent: null,
    descendants: 0,
    deleted: 0,
    dead: 0,
    last_fetch_at: '2022-12-31T15:36:56.000Z',
    kids: null,
    parts: null,
    poll: null,
  },
  {
    id: 34201846,
    title: 'Happy 2023, HN',
    url: null,
    text: null,
    type: 'story',
    by: 'user43689',
    time: 1672529553,
    score: 9,
    parent: null,
    descendants: 0,
    deleted: 0,
    dead: 0,
    last_fetch_at: '2022-12-31T19:28:59.000Z',
    kids: null,
    parts: null,
    poll: null,
  },
  {
    id: 34201814,
    title: 'Of Cost Centers, and Competitive Advantages',
    url: 'http://blogs.newardassociates.com/blog/2022/of-cost-centers.html',
    text: null,
    type: 'story',
    by: 'PretzelFisch',
    time: 1672529286,
    score: 2,
    parent: null,
    descendants: 0,
    deleted: 0,
    dead: 0,
    last_fetch_at: '2022-12-31T16:59:40.000Z',
    kids: null,
    parts: null,
    poll: null,
  },
  {
    id: 34201772,
    title: 'UN seeks ICJ opinion on Israel’s illegal occupation of Palestine',
    url: 'https://www.aljazeera.com/news/2022/12/31/un-seeks-icj-opinion-on-israels-illegal-occupation-of-palestine',
    text: null,
    type: 'story',
    by: 'jacooper',
    time: 1672528938,
    score: 18,
    parent: null,
    descendants: 23,
    deleted: 0,
    dead: 0,
    last_fetch_at: '2023-01-06T00:04:38.000Z',
    kids: [34202373, 34202848, 34203616, 34203870],
    parts: null,
    poll: null,
  },
  {
    id: 34201755,
    title: 'I did Advent of Code on a Playstation',
    url: 'https://bvisness.me/advent-of-dreams/',
    text: null,
    type: 'story',
    by: 'azhenley',
    time: 1672528828,
    score: 242,
    parent: null,
    descendants: 57,
    deleted: 0,
    dead: 0,
    last_fetch_at: '2023-01-05T13:02:32.000Z',
    kids: [
      34203467, 34205541, 34203719, 34209604, 34206386, 34207014, 34203087,
      34203591, 34203946, 34208611, 34205202, 34202273, 34203218,
    ],
    parts: null,
    poll: null,
  },
];
