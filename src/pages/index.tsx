import { NextLinkComposed } from '@/core/components/Link';
import { ROUTES } from '@/lib/constants/routes.const';
import { Button, Typography } from '@mui/material';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <>
      <Typography variant="h1">Take your addresses anywhere</Typography>

      <Button variant="contained" color="secondary">
        View demo
      </Button>

      <Button
        variant="contained"
        component={NextLinkComposed}
        to={{
          pathname: ROUTES.APP,
        }}
      >
        Go to app
      </Button>
    </>
  );
}
