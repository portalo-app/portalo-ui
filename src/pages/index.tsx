import { NextLinkComposed } from '@/core/components/Link';
import { ROUTES } from '@/lib/constants/routes.const';
import { Button, Stack, Typography } from '@mui/material';

export default function Home() {
  return (
    <>
      <Typography variant="h2">Your tree of financial addresses</Typography>
      <Typography>
        Take your addresses anywhere and share them with your clients and
        friends
      </Typography>

      <Stack
        direction="row"
        justifyContent="space-between"
        sx={{ '.MuiButton-root': { flex: 1 } }}
        gap={2}
      >
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
          Start now!
        </Button>
      </Stack>
    </>
  );
}
