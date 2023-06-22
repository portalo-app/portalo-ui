import { BankValue, ChainValue } from '@/lib/model/entities';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { SvgIcon } from '@mui/material';
import Aave from 'cryptocurrency-icons/svg/color/aave.svg';
import Ada from 'cryptocurrency-icons/svg/color/ada.svg';
import Algo from 'cryptocurrency-icons/svg/color/algo.svg';
import Avax from 'cryptocurrency-icons/svg/color/avax.svg';
import Bnb from 'cryptocurrency-icons/svg/color/bnb.svg';
import Busd from 'cryptocurrency-icons/svg/color/bsd.svg';
import Dai from 'cryptocurrency-icons/svg/color/dai.svg';
import Doge from 'cryptocurrency-icons/svg/color/doge.svg';
import Sol from 'cryptocurrency-icons/svg/color/sol.svg';
import Uni from 'cryptocurrency-icons/svg/color/uni.svg';
import Usdc from 'cryptocurrency-icons/svg/color/usdc.svg';
import Btc from 'cryptocurrency-icons/svg/icon/btc.svg';
import Dot from 'cryptocurrency-icons/svg/icon/dot.svg';
import Eth from 'cryptocurrency-icons/svg/icon/eth.svg';
import Matic from 'cryptocurrency-icons/svg/icon/matic.svg';
import Usdt from 'cryptocurrency-icons/svg/icon/usdt.svg';

interface EntityIconProps {
  entity: ChainValue | BankValue;
}

const icons: {
  [key in ChainValue]: React.ReactNode;
} = {
  BTC: <Btc />,
  ETH: <Eth />,
  MATIC: <Matic />,
  USDT: <Usdt />,
  DOT: <Dot />,
  AAVE: <Aave />,
  ADA: <Ada />,
  ALGO: <Algo />,
  AVAX: <Avax />,
  BNB: <Bnb />,
  BUSD: <Busd />,
  DAI: <Dai />,
  DOGE: <Doge />,
  SOL: <Sol />,
  UNI: <Uni />,
  USDC: <Usdc />,
};

const EntityIcon: React.FC<EntityIconProps> = ({ entity }) => {
  const icon = icons[entity as ChainValue] || <AccountBalanceIcon />;

  return <SvgIcon viewBox="0 0 32 32">{icon}</SvgIcon>;
};

export default EntityIcon;
