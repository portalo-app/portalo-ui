import { AlertTriangle, CheckCircle, Info, XCircle } from 'lucide-react';

type StateType = 'success' | 'info' | 'warning' | 'error';
type SizeType = number;
interface StateProps {
  type: StateType;
  label: string;
  size?: SizeType;
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
    case 'warning':
      return <AlertTriangle size={size} />;
    case 'error':
      return <XCircle size={size} />;
    default:
      return null;
  }
};

const State: React.FC<StateProps> = ({ type, label, size }) => {
  return (
    <div className="flex items-center flex-col">
      <StateIcon type={type} size={size} />
      <h2 className="text-lg mt-2 ">{label}</h2>
    </div>
  );
};

export default State;
