import { Button } from '@core/ui/Button';
import { TypographyXS } from '@core/ui/Typography';
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';

declare global {
  interface Window {
    ethereum?: any;
  }
}

const ConnectWallet: React.FC = () => {
  const [account, setAccount] = useState<string | null>(null);
  const [balance, setBalance] = useState<string | null>(null);

  const connectToMetaMask = async () => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const accounts = await provider.send('eth_requestAccounts', []);
      setAccount(accounts[0]);

      const network = await provider.getNetwork();
      const chainId = network.chainId;

      // Target chain ID (Scroll Sepolia Testnet)
      const targetChainId = 534351;
      const targetChainIdHex = '0x' + targetChainId.toString(16);

      if (chainId !== targetChainId) {
        try {
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: targetChainIdHex }],
          });
        } catch (switchError: any) {
          // This error code indicates that the chain has not been added to MetaMask
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

  const getuserBalance = async () => {
    if (account && window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const balance = await provider.getBalance(account);
      setBalance(ethers.utils.formatEther(balance));
    }
  };

  useEffect(() => {
    if (account) {
      getuserBalance();
    }
  }, [account]);

  const disconnectWallet = () => {
    setAccount(null);
    setBalance(null);
  };

  return (
    <div className="p-4">
      {account ? (
        <>
          <TypographyXS>Connected account: {account}</TypographyXS>
          <TypographyXS>Balance: {balance} ETH</TypographyXS>
          <Button onClick={disconnectWallet}>Disconnect</Button>
        </>
      ) : (
        <Button onClick={connectToMetaMask}>Connect to MetaMask</Button>
      )}
    </div>
  );
};

export default ConnectWallet;
