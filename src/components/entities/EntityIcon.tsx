import { socialNetworks } from '@constants/socialNetworksList';
import { BankValue, ChainValue, banks } from '@models/address.entities';
import Algo from 'cryptocurrency-icons/svg/color/algo.svg';
import Sol from 'cryptocurrency-icons/svg/color/sol.svg';
import Ada from 'cryptocurrency-icons/svg/icon/ada.svg';
import Atom from 'cryptocurrency-icons/svg/icon/atom.svg';
import Avax from 'cryptocurrency-icons/svg/icon/avax.svg';
import Bnb from 'cryptocurrency-icons/svg/icon/bnb.svg';
import Btc from 'cryptocurrency-icons/svg/icon/btc.svg';
import Dot from 'cryptocurrency-icons/svg/icon/dot.svg';
import Eth from 'cryptocurrency-icons/svg/icon/eth.svg';
import Gnosis from 'cryptocurrency-icons/svg/icon/gno.svg';
import Matic from 'cryptocurrency-icons/svg/icon/matic.svg';
import Trx from 'cryptocurrency-icons/svg/icon/trx.svg';

import { Landmark, Wallet } from 'lucide-react';
import Image from 'next/image';
import { SocialIcon } from 'react-custom-social-icons';
import { SocialNetwork } from 'react-custom-social-icons/dist/esm/types';

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
  TRX: <Trx />,
  BNB: <Bnb />,
  AVAX: <Avax />,
  GNO: <Gnosis />,
  ADA: <Ada />,
  ATOM: <Atom />,
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
        width={30}
        height={30}
        style={{ objectFit: 'contain', height: '100%', borderRadius: '32px' }}
        objectFit="contain"
      />
    ),
  })
);

// TODO: Refactor to make it dynamic through an Icon Directory
const EntityIcon: React.FC<EntityIconProps> = ({ entity, width, height }) => {
  if (socialNetworks.includes(entity.toLowerCase() as any)) {
    return (
      <SocialIcon
        network={entity.toLowerCase() as SocialNetwork}
        size={width}
      />
    );
  }

  const icon =
    chainIcons[entity as ChainValue] ||
    bankIcons[entity as BankValue] ||
    (entity === 'DEFAULT_BANK' ? <Landmark /> : <Wallet />);

  return (
    <div>
      {typeof icon !== 'string' ? (
        <div
          style={{
            width: `${width}`,
            height: `${height}`,
          }}
        >
          {icon}
        </div>
      ) : (
        <div>
          asd
          <Image
            src={icon as string}
            alt="SVG Icon"
            width={width}
            height={height}
          />
        </div>
      )}
    </div>
  );
};

export default EntityIcon;
