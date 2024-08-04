import { Button } from '@core/ui/Button';
import { FC } from 'react';
import { useAccount, useConnect } from 'wagmi';
import { injected } from 'wagmi/connectors';

interface ConnectWalletProps {
  onConnect: () => void;
}

const ConnectWallet: FC<ConnectWalletProps> = ({ onConnect }) => {
  const { connect } = useConnect();
  const { isConnected } = useAccount();

  isConnected && onConnect();

  return (
    !isConnected && (
      <Button onClick={() => connect({ connector: injected() })}>
        Connect
      </Button>
    )
  );
};

export default ConnectWallet;
