import { NextLinkComposed } from '@/core/components/Link';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button, Fab, IconButton, Stack, Typography } from '@mui/material';

interface PageLayoutProps {
  children: React.ReactNode;
  title: string;
  action?: ActionData;
  backPath?: string;
  backClick?: () => void;
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

const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  title,
  action,
  backPath,
  backClick,
}) => {
  return (
    <Stack>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={2}
      >
        <Stack direction="row" gap={1} alignItems="center">
          {backPath && (
            <IconButton
              component={NextLinkComposed}
              to={{
                pathname: backPath,
              }}
            >
              <ArrowBackIcon />
            </IconButton>
          )}

          {backClick && (
            <IconButton onClick={backClick}>
              <ArrowBackIcon />
            </IconButton>
          )}

          <Typography variant="h4">{title}</Typography>
        </Stack>

        {action && <Action {...action} />}
      </Stack>

      {children}
    </Stack>
  );
};

export default PageLayout;
