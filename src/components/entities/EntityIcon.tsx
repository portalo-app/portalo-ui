import { BankValue, ChainValue } from '@/lib/model/entities';
import Btc from '@icons/chains/btc.svg';
import Eth from '@icons/chains/eth.svg';
import Matic from '@icons/chains/matic.svg';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { SvgIcon } from '@mui/material';

interface EntityIconProps {
  entity: ChainValue | BankValue;
}

const icons: {
  [key in ChainValue]: React.ReactNode;
} = {
  BTC: <Btc />,
  ETH: <Eth />,
  MATIC: <Matic />,
};

const EntityIcon: React.FC<EntityIconProps> = ({ entity }) => {
  const icon = icons[entity as ChainValue] || <AccountBalanceIcon />;

  return <SvgIcon>{icon}</SvgIcon>;
};

export default EntityIcon;
