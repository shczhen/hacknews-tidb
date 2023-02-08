import * as React from 'react';
import _ from 'lodash';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import Container from '@mui/material/Container';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Fab from '@mui/material/Fab';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Avatar from '@mui/material/Avatar';
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import MoreIcon from '@mui/icons-material/MoreVert';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';

import Layout from 'src/components/Layout';
import AnswerCardsGroup from 'src/components/Card/AnswerCardsGroup';
import {
  chatConversationIdState,
  chatMessagesState,
  chatLoadingState,
} from 'src/recoil/atoms';
import logger from 'next-pino/logger';

import { BotService } from 'src/services/bot';
import MySQLService, { initConnection } from 'src/services/mysql';
import Data2ChartTemplate from 'src/services/bot/templates/Data2ChartTemplate';
import Question2SQLTemplate from 'src/services/bot/templates/Question2SQLTemplate';
import { ChartAnswerProps } from 'src/components/Card/AnswerCard';
import HorizontalBar from '@src/components/HorizontalBar';
import Seo from 'src/components/Layout/Seo';
import axios from 'src/utils/axios';
import { UserMessage, BotMessage, ChatMessage } from 'src/types';

export default function ChatPage() {
  const [inputString, setInputString] = React.useState('');

  const [conversationId, setConversationId] = useRecoilState(
    chatConversationIdState
  );
  const [messages, setMessages] = useRecoilState(chatMessagesState);
  const [loading, setLoading] = useRecoilState(chatLoadingState);

  const handleSubmit = async (text: string) => {
    const previousMsg = _.last(messages);
    const timestamp = Date.now();
    setMessages((prev) => {
      return [
        ...prev,
        {
          id: `${timestamp}`,
          type: 'user',
          text,
          timestamp,
          conversationId,
          parentMessageId: previousMsg?.id,
        },
      ];
    });
    setInputString('');
    setLoading(true);
  };

  React.useEffect(() => {
    const sendSingleMsg = async (previousMsg: UserMessage) => {
      const reqBody =
        previousMsg?.parentMessageId && conversationId
          ? {
              message: previousMsg.text,
              conversationId,
              parentMessageId: previousMsg.parentMessageId,
            }
          : {
              message: previousMsg.text,
            };
      const res = await axios
        .post('/api/chat', reqBody, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${localStorage.getItem('chat2query.token')}`,
          },
        })
        .then((res) => res.data);
      setConversationId(res.conversationId);
      setMessages((prev) => {
        return [
          ...prev,
          {
            id: res.id,
            type: 'bot',
            text: res.text,
            timestamp: Date.now(),
            conversationId: res.conversationId,
            parentMessageId: previousMsg.id,
          },
        ];
      });
      setLoading(false);
    };
    const previousMsg = _.last(messages);
    if (previousMsg && previousMsg.type === 'user') {
      sendSingleMsg(previousMsg);
    }
  }, [messages]);

  return (
    <>
      <ChatLayout>
        <Box
          sx={{
            height: '100vh',
            flexGrow: 1,
          }}
        >
          <ChatBubbles items={messages} />
          <AppBar
            position="fixed"
            sx={{
              top: 'auto',
              bottom: 0,
              backgroundColor: 'transparent',
              boxShadow: 'none',
            }}
          >
            <Container>
              <Toolbar
                sx={{
                  backgroundColor: 'hn.primary',
                  gap: '1rem',
                }}
              >
                <Input>
                  <StyledInputBase
                    placeholder="Input your question here…"
                    inputProps={{ 'aria-label': 'chat' }}
                    value={inputString}
                    onChange={(e) => {
                      setInputString(e.target.value);
                    }}
                    disabled={loading}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        console.log('chat message', inputString);
                        if (handleSubmit) {
                          handleSubmit(inputString);
                        }
                      }
                    }}
                  />
                </Input>
                <IconButton
                  color="inherit"
                  aria-label="restart conversation"
                  disabled={loading || inputString === ''}
                  onClick={() => {
                    if (handleSubmit) {
                      handleSubmit(inputString);
                    }
                  }}
                >
                  <SendIcon />
                </IconButton>
              </Toolbar>
            </Container>
          </AppBar>
        </Box>
      </ChatLayout>
    </>
  );
}

function ChatBubbles(props: { items: ChatMessage[] }) {
  const { items } = props;

  const messagesMemo = React.useMemo(() => {
    return _.reverse([...items]);
  }, [items]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column-reverse',
        gap: '1rem',

        height: 'calc(100vh - 64px)',
        pt: '1rem',
        pb: '1rem',
        overflowY: 'auto',
      }}
    >
      {messagesMemo.map((item) => {
        return <ChatBubble key={item.id} item={item} />;
      })}
    </Box>
  );
}

function ChatBubble(props: { item: ChatMessage }) {
  const { type, text, timestamp } = props.item;
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: type === 'user' ? 'row-reverse' : 'row',
        }}
      >
        <Paper
          variant="outlined"
          sx={{
            padding: '1rem',
            maxWidth: '80%',
          }}
        >
          {text}
        </Paper>
      </Box>
    </>
  );
}

function ChatLayout(props: { children: React.ReactNode }) {
  const { children } = props;

  return (
    <>
      <Box
        sx={{
          backgroundColor: '#fff',
          height: 'auto',
          minHeight: '100vh',
        }}
      >
        <Container sx={{ height: '100%' }}>
          <Box
            sx={{
              backgroundColor: 'hn.background',
              height: '100%',
              // padding: { xs: '1rem', sm: '1.5rem' },
            }}
          >
            {children}
          </Box>
        </Container>
      </Box>
    </>
  );
}

const Input = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.95),
  marginLeft: 0,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: alpha(theme.palette.common.black, 0.75),
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `1rem`,
    transition: theme.transitions.create('width'),
    width: '100%',
  },
}));
