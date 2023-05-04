import { Button, Stack, Typography } from '@mui/material';

interface PageLayoutProps {
  children: React.ReactNode;
  title: string;
  action?: { label: string; icon: React.ReactNode; onClick: () => void };
}

const PageLayout: React.FC<PageLayoutProps> = ({ children, title, action }) => {
  return (
    <Stack>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={2}
      >
        <Typography variant="h2">{title}</Typography>

        {action && (
          <Button
            variant="contained"
            startIcon={action.icon}
            onClick={action.onClick}
          >
            {action.label}
          </Button>
        )}
      </Stack>

      {children}
    </Stack>
  );
};

export default PageLayout;
