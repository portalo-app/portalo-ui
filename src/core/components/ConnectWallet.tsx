import { Button } from '@core/ui/Button';
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';

declare global {
  interface Window {
    ethereum?: any;
  }
}

const ConnectWallet: React.FC = () => {
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
    } else {
      alert('MetaMask is not installed');
    }
  };

  useEffect(() => {
    if (account) {
    }
  }, [account]);

  const disconnectWallet = () => {
    setAccount(null);
  };

  return (
    <div className="p-4">
      {account ? (
        <div className="flex justify-center items-center gap-4">
          <Button onClick={disconnectWallet}>Disconnect</Button>
        </div>
      ) : (
        <Button onClick={connectToMetaMask}>Connect to MetaMask</Button>
      )}
    </div>
  );
};

export default ConnectWallet;
