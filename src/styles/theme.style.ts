import { ThemeOptions } from '@mui/material';
import { Inter, Montserrat, Roboto_Mono } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
});

const montserrat = Montserrat({
  subsets: ['latin'],
});

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
});

export const bodyFonts = {
  fontFamily: inter.style.fontFamily,
};

export const headingFonts = {
  fontFamily: montserrat.style.fontFamily,
};

export const buttonFonts = {
  fontFamily: inter.style.fontFamily,
};

export const monoFonts = {
  fontFamily: robotoMono.style.fontFamily,
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
    MuiTypography: {
      variants: [
        {
          props: { variant: 'mono' },
          style: monoFonts,
        },
      ],
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
