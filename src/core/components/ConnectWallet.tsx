import { Button } from '@core/ui/Button';
import { TypographyXS } from '@core/ui/Typography';
import { FC } from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { injected } from 'wagmi/connectors';

interface ConnectWalletProps {
  onConnect?: () => void;
}

const ConnectWallet: FC<ConnectWalletProps> = ({ onConnect }) => {
  const { connect } = useConnect();
  const { isConnected, address } = useAccount();
  const { disconnect } = useDisconnect();

  if (onConnect) {
    isConnected && onConnect();
  }

  const limitedText = (text: any) => {
    const limitText = text.length > 15 ? text.slice(0, 15) + '...' : text;
    return limitText;
  };

  return (
    <>
      {!isConnected && (
        <Button onClick={() => connect({ connector: injected() })}>
          Connect
        </Button>
      )}
      {isConnected && !onConnect && (
        <div className="flex items-center gap-2">
          <TypographyXS>{limitedText(address)}</TypographyXS>
          <Button onClick={() => disconnect()}>Disconnect</Button>
        </div>
      )}
    </>
  );
};

export default ConnectWallet;
