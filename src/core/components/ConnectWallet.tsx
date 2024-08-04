import { Button } from '@core/ui/Button';
import { ethers } from 'ethers';
import { Unplug } from 'lucide-react';
import { useEffect, useState } from 'react';

declare global {
  interface Window {
    ethereum?: any;
  }
}

interface ConnectWalletProps {
  onConnect: () => void;
}

const ConnectWallet: React.FC<ConnectWalletProps> = ({ onConnect }) => {
  const [account, setAccount] = useState<string | null>(null);

  const connectToMetaMask = async () => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const accounts = await provider.send('eth_requestAccounts', []);
      setAccount(accounts[0]);
      const network = await provider.getNetwork();
      const chainId = network.chainId;
      const targetChainId = 534351;
      const targetChainIdHex = '0x' + targetChainId.toString(16);

      if (chainId !== targetChainId) {
        try {
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: targetChainIdHex }],
          });
        } catch (switchError: any) {
          if (switchError.code === 4902) {
            try {
              await window.ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [
                  {
                    chainId: targetChainIdHex,
                    chainName: 'Scroll Sepolia Testnet',
                    rpcUrls: ['https://sepolia-rpc.scroll.io/'],
                    nativeCurrency: {
                      name: 'ETH',
                      symbol: 'ETH',
                      decimals: 18,
                    },
                    blockExplorerUrls: ['https://sepolia.scrollscan.com'],
                  },
                ],
              });
            } catch (addError: any) {
              console.error(addError);
            }
          } else {
            console.error(switchError);
          }
        }
      }
      onConnect();
    } else {
      alert('MetaMask is not installed');
    }
  };

  useEffect(() => {
    if (account) {
      onConnect();
    }
  }, [account, onConnect]);

  return (
    !account && (
      <Button className="w-full gap-2" onClick={connectToMetaMask}>
        <Unplug />
        Connect to MetaMask
      </Button>
    )
  );
};

export default ConnectWallet;
