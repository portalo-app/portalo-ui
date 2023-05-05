import { Button, Fab, Stack, Typography } from '@mui/material';

interface PageLayoutProps {
  children: React.ReactNode;
  title: string;
  action?: ActionData;
}

interface ActionData {
  icon: React.ReactNode;
  onClick: () => void;
  label?: string;
}

const Action: React.FC<ActionData> = ({ label, icon, onClick }) => {
  return label ? (
    <Button variant="contained" startIcon={icon} onClick={onClick}>
      {label}
    </Button>
  ) : (
    <Fab size="small" color="primary" onClick={onClick}>
      {icon}
    </Fab>
  );
};

const PageLayout: React.FC<PageLayoutProps> = ({ children, title, action }) => {
  return (
    <Stack>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={2}
      >
        <Typography variant="h4">{title}</Typography>

        {action && <Action {...action} />}
      </Stack>

      {children}
    </Stack>
  );
};

export default PageLayout;
