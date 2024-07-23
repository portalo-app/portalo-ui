import { walletState } from '@states/wallet.atom';
import { ethers } from 'ethers';
import { useSetRecoilState } from 'recoil';

const useWallet = () => {
  const setAccount = useSetRecoilState(walletState);

  const connect = async () => {
    if ((window as any).ethereum) {
      const provider = new ethers.providers.Web3Provider(
        (window as any).ethereum
      );
      const accounts = await provider.send('eth_requestAccounts', []);
      setAccount(accounts[0]);
    } else {
      alert('MetaMask is not installed');
    }
  };

  const disconnect = async () => {
    setAccount('');
  };

  const signMessage = async (message: string): Promise<string> => {
    const provider = new ethers.providers.Web3Provider(
      (window as any).ethereum
    );
    const signer = provider.getSigner();
    return await signer.signMessage(message);
  };

  return { connect, disconnect, signMessage };
};

export default useWallet;
