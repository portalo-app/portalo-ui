import { ThemeOptions } from '@mui/material';
import { amber, blue, green, red } from '@mui/material/colors';
import { Roboto_Mono, Work_Sans } from 'next/font/google';

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
});

const workSans = Work_Sans({
  subsets: ['latin'],
});

export const bodyFonts = {
  fontFamily: workSans.style.fontFamily,
};

export const headingFonts = {
  fontFamily: workSans.style.fontFamily,
};

export const buttonFonts = {
  fontFamily: workSans.style.fontFamily,
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
      main: '#5271FF',
    },
    secondary: {
      main: '#8952ff',
    },
    info: {
      main: blue[600],
    },
    warning: {
      main: amber[600],
    },
    success: {
      main: green[600],
    },
    error: {
      main: red[600],
    },
    background: {
      default: '#121212',
      paper: '#121212',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#B0BEC5',
      disabled: '#757575',
    },
  },
  shape: {
    borderRadius: 16,
  },
};
