'use client';

import StoreWidget from '@components/dashboard/StoreWidget';
import Onboarding from '@components/onboarding/Onboarding';
import { Button } from '@core/ui/Button';
import { Input } from '@core/ui/Input';
import ResponsiveDialog from '@core/ui/ResponsiveDialog';
import { FC } from 'react';
import { useReadContract, useReadContracts } from 'wagmi';
import abi from '../../lib/contracts/portalo_contract_abi.json';
import HomeCardsList from './HomeCardList';

const contract = process.env.NEXT_PUBLIC_PORTALO_CONTRACT_ADDRESS;

const Home: FC = () => {
  const address = '0x0C5AE41F3c2898e46e73376c21bc52e61Dc9EFfE';

  const { data } = useReadContract({
    abi: abi,
    address: contract as `0x${string}`,
    functionName: 'getProfileIdsByOwner',
    args: [address],
  });
  console.log('firstData', data);

  const profilesIdsQuerys = (data as string[])?.map((id: string) => ({
    abi: abi,
    address: contract as `0x${string}`,
    functionName: 'getProfileById',
    args: [id],
  }));

  const response = useReadContracts({
    contracts: profilesIdsQuerys as any,
  });

  //TODO : make decrypt each response.data
  console.log('data', response.data);

  return (
    <div className="space-y-4">
      <Onboarding />

      <ResponsiveDialog
        title="Coming soon"
        description="✨ Soon you'll be able to store ANYTHING ANYWHERE ✨"
        trigger={<StoreWidget />}
      >
        <div className="space-y-4 flex flex-col justify-center">
          <Input disabled placeholder="Input Anything!" />
          <Button disabled>Store Anywhere</Button>
        </div>
      </ResponsiveDialog>

      <HomeCardsList />
    </div>
  );
};

export default Home;
