import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import Container from '@mui/material/Container';

import { TiDBCloudLogo } from 'src/components/Icons';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.85),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.95),
  },
  marginLeft: 0,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.hn.primary,
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: alpha(theme.palette.common.black, 0.75),
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
  },
}));

export interface SearchAppBarProps {
  handleSearch?: (question: string) => void;
  disableSearch?: boolean;
}

export default function SearchAppBar(props: SearchAppBarProps) {
  const { handleSearch, disableSearch = false } = props;

  const [search, setSearch] = React.useState('');

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: 'hn.primary',
        }}
      >
        <Container>
          <Toolbar sx={{ gap: '1rem' }}>
            <Typography
              variant="body1"
              noWrap
              overflow="visible"
              component="div"
              sx={{
                lineHeight: 1.2,
                color: '#000',
                fontSize: { xs: '16px', md: '20px' },
              }}
            >
              Chat2Query
              <br />
              Hackernews
            </Typography>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Input your question here…"
                inputProps={{ 'aria-label': 'search' }}
                disabled={disableSearch}
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    console.log('search', search);
                    if (handleSearch) {
                      handleSearch(search);
                    }
                  }
                }}
              />
              <Box
                display="flex"
                alignItems="center"
                gap="0.5rem"
                pl="0.5rem"
                pr="0.5rem"
              >
                <Typography
                  variant="body2"
                  color="text.secondary"
                  whiteSpace="nowrap"
                >
                  Powered by
                </Typography>
                <Box
                  component="a"
                  target="_blank"
                  href="https://tidbcloud.com/channel?utm_source=chat2query-hackernews&utm_medium=referral"
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                  }}
                >
                  <TiDBCloudLogo />
                  <Typography
                    variant="body2"
                    fontWeight="bold"
                    color="text.primary"
                    whiteSpace="nowrap"
                  >
                    TiDB Cloud
                  </Typography>
                </Box>
              </Box>
            </Search>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}
