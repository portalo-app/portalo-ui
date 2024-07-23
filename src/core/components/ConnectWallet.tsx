'use client';

import { Button } from '@core/ui/Button';
import useWallet from '@hooks/useWallet';
import { walletState } from '@states/wallet.atom';
import { Wallet } from 'lucide-react';
import { FC } from 'react';
import { useRecoilValue } from 'recoil';
import AccountSelector from './AccountSelector';

const ConnectWallet: FC<unknown> = () => {
  const account = useRecoilValue(walletState);
  const { connect, disconnect } = useWallet();

  return (
    <div className="pr-3">
      {account ? (
        <div className="flex items-center gap-3">
          <AccountSelector />

          <Button onClick={disconnect}>Disconnect</Button>
        </div>
      ) : (
        <Button className="flex gap-3" onClick={connect}>
          <Wallet /> Connect
        </Button>
      )}
    </div>
  );
};

export default ConnectWallet;
