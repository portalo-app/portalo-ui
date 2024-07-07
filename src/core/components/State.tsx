import { Button } from '@core/ui/Button';
import { Card } from '@core/ui/Card';
import { TypographyMuted } from '@core/ui/Typography';
import { motion } from 'framer-motion';
import {
  AlertTriangle,
  CheckCircle,
  Info,
  Search,
  XCircle,
} from 'lucide-react';

type StateType = 'success' | 'info' | 'warning' | 'error' | 'empty';
type SizeType = number;
interface StateProps {
  type: StateType;
  label: string;
  size?: SizeType;
  action?: {
    label: string;
    onClick: () => void;
  };
}

const StateIcon: React.FC<{ type: StateType; size?: SizeType }> = ({
  type,
  size,
}) => {
  switch (type) {
    case 'success':
      return <CheckCircle size={size} />;
    case 'info':
      return <Info size={size} />;
    case 'empty':
      return <Search size={size} />;
    case 'warning':
      return <AlertTriangle size={size} />;
    case 'error':
      return <XCircle size={size} />;
    default:
      return null;
  }
};

const State: React.FC<StateProps> = ({ type, label, size, action }) => {
  return (
    <Card className="border-2 border-muted w-full p-4 text-muted-foreground">
      <div className="flex items-center gap-2">
        <StateIcon type={type} size={size || 36} />

        <TypographyMuted>{label}</TypographyMuted>
      </div>

      {action && (
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.95 }}>
          <Button className="w-full mt-4" onClick={action.onClick}>
            {action.label}
          </Button>
        </motion.div>
      )}
    </Card>
  );
};

export default State;
