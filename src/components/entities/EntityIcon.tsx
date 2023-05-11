import { BankValue, ChainValue } from '@/lib/model/entities';
import Btc from '@icons/chains/btc.svg';
import Eth from '@icons/chains/eth.svg';
import Matic from '@icons/chains/matic.svg';
import { SvgIcon } from '@mui/material';

interface EntityIconProps {
  entity: ChainValue | BankValue;
}

const EntityIcon: React.FC<EntityIconProps> = ({ entity }) => {
  return (
    <SvgIcon>
      {(() => {
        switch (entity) {
          case 'BTC':
            return <Btc />;
          case 'ETH':
            return <Eth />;
          case 'MATIC':
            return <Matic />;
          default:
            return null;
        }
      })()}
    </SvgIcon>
  );
};

export default EntityIcon;
