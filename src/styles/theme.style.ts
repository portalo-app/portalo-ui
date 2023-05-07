import { ThemeOptions } from '@mui/material';
import { Montserrat } from 'next/font/google';

const nunito = Montserrat({
  subsets: ['latin'],
});

export const bodyFonts = {
  fontFamily: nunito.style.fontFamily,
};

export const headingFonts = {
  fontFamily: nunito.style.fontFamily,
};

export const buttonFonts = {
  fontFamily: nunito.style.fontFamily,
};

export const numberFonts = {
  fontFamily: nunito.style.fontFamily,
};

export const THEME: ThemeOptions = {
  typography: {
    ...bodyFonts,
    button: buttonFonts,
    h1: headingFonts,
    h2: headingFonts,
    h3: headingFonts,
    h4: headingFonts,
    h5: headingFonts,
    h6: headingFonts,
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 'normal',
          fontSize: '1rem',
        },
      },
    },
  },
  palette: {
    mode: 'dark',
    primary: {
      main: '#7C4DFF',
    },
    secondary: {
      main: '#F9A826',
    },
    error: {
      main: '#F44336',
    },
    warning: {
      main: '#FFC107',
    },
    info: {
      main: '#2196F3',
    },
    success: {
      main: '#00C853',
    },
    background: {
      default: '#121212',
      paper: '#1E1E1E',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#B0BEC5',
      disabled: '#757575',
    },
  },
};
