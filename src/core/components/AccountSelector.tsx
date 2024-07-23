import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@core/ui/Select';
import { walletState } from '@states/wallet.atom';
import { ethers } from 'ethers';
import { UserPen } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

const AccountSelector: React.FC<unknown> = () => {
  const [accounts, setAccounts] = useState<string[]>([]);
  const [account, setAccount] = useRecoilState(walletState);

  useEffect(() => {
    const fetchAccounts = async () => {
      if ((window as any).ethereum) {
        const provider = new ethers.providers.Web3Provider(
          (window as any).ethereum
        );
        const accounts = await provider.listAccounts();
        setAccounts(accounts);
      }
    };

    fetchAccounts();
  }, []);

  const handleAccountChange = (value: string) => {
    setAccount(value);
  };

  return (
    <Select onValueChange={handleAccountChange} defaultValue={account}>
      <SelectTrigger className="w-[75px]">
        <UserPen />
      </SelectTrigger>
      <SelectContent>
        {accounts.map((acc) => (
          <SelectItem key={acc} value={acc}>
            {acc}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default AccountSelector;
