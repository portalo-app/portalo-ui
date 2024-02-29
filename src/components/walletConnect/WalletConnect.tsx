import { Button } from '@core/ui/Button';
import { TypographySmall } from '@core/ui/Typography';
import { useChain } from '@cosmos-kit/react';

interface WalletConnectProps {}

const WalletConnect: React.FC<WalletConnectProps> = () => {
  const chainContext = useChain('cosmoshub');

  const { status, username, address, message, connect, disconnect, openView } =
    chainContext;

  console.log({
    status,
    username,
    address,
    message,
    connect,
    disconnect,
    openView,
  });

  const handleDisconnect = () => {
    disconnect();
  };

  return (
    <div className="max-w-[250px] mx-4">
      {status === 'Connected' ? (
        <div className="flex flex-col max-w-[300px] gap-2">
          <TypographySmall className="text-ellipsis overflow-hidden">
            Username : {username}
          </TypographySmall>
          <TypographySmall className="text-ellipsis overflow-hidden">
            Address : {address}
          </TypographySmall>
          <Button onClick={handleDisconnect}>Disconnect</Button>
        </div>
      ) : (
        <Button onClick={connect}>Connect Wallet</Button>
      )}
    </div>
  );
};

export default WalletConnect;
