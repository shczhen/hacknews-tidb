import * as React from 'react';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import Container from '@mui/material/Container';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
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
import { questionsState, questionLoadingState } from 'src/recoil/atoms';
import logger from 'next-pino/logger';

import { BotService } from 'src/services/bot';
import MySQLService, { initConnection } from 'src/services/mysql';
import Data2ChartTemplate from 'src/services/bot/templates/Data2ChartTemplate';
import Question2SQLTemplate from 'src/services/bot/templates/Question2SQLTemplate';
import { ChartAnswerProps } from 'src/components/Card/AnswerCard';
import HorizontalBar from '@src/components/HorizontalBar';
import Seo from 'src/components/Layout/Seo';

export default function ChatPage() {
  return (
    <>
      <ChatLayout>
        <Box
          sx={{
            height: '100vh',
            flexGrow: 1,
          }}
        >
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
                    // disabled={disableSearch}
                    // value={search}
                    // onChange={(e) => {
                    //   setSearch(e.target.value);
                    // }}
                    // onKeyDown={(e) => {
                    //   if (e.key === 'Enter') {
                    //     console.log('search', search);
                    //     if (handleSearch) {
                    //       handleSearch(search);
                    //     }
                    //   }
                    // }}
                  />
                </Input>
                <IconButton color="inherit" aria-label="restart conversation">
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
