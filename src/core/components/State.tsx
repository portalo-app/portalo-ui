import { AlertTriangle, CheckCircle, Info, XCircle } from 'lucide-react';

type StateType = 'success' | 'info' | 'warning' | 'error';
type SizeType = number | undefined;
interface StateProps {
  type: StateType;
  label: string;
  size: SizeType;
}

const StateIcon: React.FC<{ type: StateType; size: SizeType }> = ({
  type,
  size,
}) => {
  switch (type) {
    case 'success':
      return <CheckCircle color="#fafafa" size={size} />;
    case 'info':
      return <Info color="#fafafa" size={size} />;
    case 'warning':
      return <AlertTriangle color="#fafafa" size={size} />;
    case 'error':
      return <XCircle color="#fafafa" size={size} />;
    default:
      return null;
  }
};

const State: React.FC<StateProps> = ({ type, label, size }) => {
  return (
    <div className="p-2 flex flex-col">
      <div className="flex justify-center">
        <StateIcon type={type} size={size} />
      </div>
      <h2 className="text-lg m-2">{label}</h2>
    </div>
  );
};

export default State;
