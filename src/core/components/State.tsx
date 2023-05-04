import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import InfoIcon from '@mui/icons-material/Info';
import WarningIcon from '@mui/icons-material/Warning';
import { Paper, Stack, Typography } from '@mui/material';

type StateType = 'success' | 'info' | 'warning' | 'error';

interface StateProps {
  type: StateType;
  label: string;
}

const StateIcon: React.FC<{ type: StateType }> = ({ type }) => {
  switch (type) {
    case 'success':
      return <CheckCircleIcon fontSize="inherit" color="success" />;
    case 'info':
      return <InfoIcon fontSize="inherit" color="info" />;
    case 'warning':
      return <WarningIcon fontSize="inherit" color="warning" />;
    case 'error':
      return <ErrorIcon fontSize="inherit" color="error" />;
    default:
      return null;
  }
};

const State: React.FC<StateProps> = ({ type, label }) => {
  return (
    <Paper elevation={0}>
      <Stack p={2} alignItems="center" justifyContent="center">
        <Typography variant="h1">
          <StateIcon type={type} />
        </Typography>

        <Typography>{label}</Typography>
      </Stack>
    </Paper>
  );
};

export default State;
