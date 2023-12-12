import { BankValue, ChainValue, banks } from '@/lib/model/entities';
import Algo from 'cryptocurrency-icons/svg/color/algo.svg';
import Sol from 'cryptocurrency-icons/svg/color/sol.svg';
import Uni from 'cryptocurrency-icons/svg/color/uni.svg';
import Btc from 'cryptocurrency-icons/svg/icon/btc.svg';
import Dot from 'cryptocurrency-icons/svg/icon/dot.svg';
import Eth from 'cryptocurrency-icons/svg/icon/eth.svg';
import Matic from 'cryptocurrency-icons/svg/icon/matic.svg';
import { Landmark, Wallet } from 'lucide-react';
import Image from 'next/image';

interface EntityIconProps {
  entity: ChainValue | BankValue | 'DEFAULT_BANK' | 'DEFAULT_CHAIN';
  width?: number;
  height?: number;
}

const chainIcons: {
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

const bankIcons: {
  [key in BankValue]?: React.ReactNode;
} = {};
banks.forEach((bank) =>
  Object.assign(bankIcons, {
    [bank.value]: (
      <Image
        alt={bank.icon}
        src={`/assets/icons/banks/${bank.icon}.png`}
        width={64}
        height={64}
        style={{ objectFit: 'contain', height: '100%' }}
      />
    ),
  })
);

const EntityIcon: React.FC<EntityIconProps> = ({ entity, width, height }) => {
  const icon =
    chainIcons[entity as ChainValue] ||
    bankIcons[entity as BankValue] ||
    (entity === 'DEFAULT_BANK' ? <Landmark /> : <Wallet />);

  return (
    <div>
      {typeof icon !== 'string' ? (
        <div style={{ width: `${width}`, height: `${height}` }}>{icon}</div>
      ) : (
        <Image
          src={icon as string}
          alt="SVG Icon"
          width={width}
          height={height}
        />
      )}
    </div>
  );
};

export default EntityIcon;
