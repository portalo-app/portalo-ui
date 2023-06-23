import { BankValue, ChainValue } from '@/lib/model/entities';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { SvgIcon } from '@mui/material';
import Algo from 'cryptocurrency-icons/svg/color/algo.svg';
import Sol from 'cryptocurrency-icons/svg/color/sol.svg';
import Uni from 'cryptocurrency-icons/svg/color/uni.svg';
import Btc from 'cryptocurrency-icons/svg/icon/btc.svg';
import Dot from 'cryptocurrency-icons/svg/icon/dot.svg';
import Eth from 'cryptocurrency-icons/svg/icon/eth.svg';
import Matic from 'cryptocurrency-icons/svg/icon/matic.svg';

interface EntityIconProps {
  entity: ChainValue | BankValue;
}

const icons: {
  [key in ChainValue]: React.ReactNode;
} = {
  BTC: <Btc />,
  ETH: <Eth />,
  MATIC: <Matic />,
  DOT: <Dot />,
  ALGO: <Algo />,
  SOL: <Sol />,
  UNI: <Uni />,
};

const EntityIcon: React.FC<EntityIconProps> = ({ entity }) => {
  const icon = icons[entity as ChainValue] || <AccountBalanceIcon />;

  return <SvgIcon viewBox="0 0 32 32">{icon}</SvgIcon>;
};

export default EntityIcon;
