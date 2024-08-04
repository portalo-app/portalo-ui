import { Button } from '@core/ui/Button';
import { FC } from 'react';
import { useConnect } from 'wagmi';
import { injected } from 'wagmi/connectors';

const ConnectWallet: FC = () => {
  const { connect } = useConnect();

  return (
    <Button onClick={() => connect({ connector: injected() })}>Connect</Button>
  );
};

export default ConnectWallet;
