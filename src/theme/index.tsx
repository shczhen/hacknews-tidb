import { Palette } from '@mui/icons-material';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface PaletteOptions {
    hn: {
      primary: React.CSSProperties['color'];
      background: React.CSSProperties['color'];
    };
  }
}

const theme = createTheme({
  palette: {
    hn: {
      primary: '#ff742b',
      background: '#f6f6ef',
    },
  },
});

export default theme;
