import { Button } from '@core/ui/Button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@core/ui/DropDownMenu';
import { TypographyMuted } from '@core/ui/Typography';
import { useChain } from '@cosmos-kit/react';
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';

interface WalletConnectProps {}

const WalletConnect: React.FC<WalletConnectProps> = () => {
  const chainContext = useChain('secretnetworktestnet');

  const {
    status,
    username,
    address,
    message,
    connect,
    disconnect,
    openView,
    logoUrl,
    assets,
  } = chainContext;

  console.log({
    status,
    username,
    address,
    message,
    connect,
    disconnect,
    openView,
    logoUrl,
    assets,
  });

  const handleDisconnect = () => {
    disconnect();
  };

  return (
    <div className="max-w-[250px] mx-4">
      {status === 'Connected' ? (
        <div className="flex max-w-[300px] gap-2">
          {/* <TypographySmall className="text-ellipsis overflow-hidden">
            Username : {username}
          </TypographySmall> */}
          {/* <TypographySmall className="text-ellipsis overflow-hidden">
            Address : {address}
          </TypographySmall> */}
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1">
              {logoUrl && (
                <Image src={logoUrl} alt="logo icon" width={30} height={30} />
              )}
              <ChevronDown />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="max-w-[200px] p-4">
              <DropdownMenuLabel className="max-w-[130px] text-ellipsis overflow-hidden">
                <TypographyMuted>logged in as</TypographyMuted>
                {username}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex flex-col max-w-[130px] text-ellipsis overflow-hidden">
                <TypographyMuted>address</TypographyMuted>
                {address}
              </DropdownMenuItem>
              <DropdownMenuItem />
              <Button onClick={handleDisconnect}>Logout</Button>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ) : (
        <Button onClick={connect}>Login</Button>
      )}
    </div>
  );
};

export default WalletConnect;
