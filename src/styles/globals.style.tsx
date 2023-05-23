import { css, GlobalStyles as Global } from '@mui/material';

interface GlobalStylesProps {}

const GlobalStyles: React.FC<GlobalStylesProps> = () => {
  return (
    <Global
      styles={css`
        html {
          scroll-behavior: smooth;
        }

        body {
          transition: all 0.3s linear;
          transition: padding 0s;
        }

        html,
        body,
        body > div,
        main,
        main > div {
          min-height: 100%;
          height: 100%;
        }

        .MuiBackdrop-root {
          backdrop-filter: blur(8px);
          background-color: rgb(0, 0, 0, 0.5) !important;
        }

        h1,
        h2,
        h3,
        h4,
        h5,
        h6,
        a {
          opacity: 0.87;
        }

        p,
        span {
          opacity: 0.6;
        }
      `}
    />
  );
};

export default GlobalStyles;
