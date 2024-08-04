'use client';

import StoreWidget from '@components/dashboard/StoreWidget';
import Onboarding from '@components/onboarding/Onboarding';
import { Button } from '@core/ui/Button';
import { Input } from '@core/ui/Input';
import ResponsiveDialog from '@core/ui/ResponsiveDialog';
import useEncrypt from '@hooks/useEncrypt';
import { ProfileDTO } from '@models/dto/profile.dto';
import { ZkProfile } from '@models/zk/zkProfile.model';
import { profilesState } from '@states/profiles.atom';
import { FC, useEffect, useMemo } from 'react';
import { useSetRecoilState } from 'recoil';
import {
  useAccount,
  useReadContract,
  useReadContracts,
  useSignMessage,
} from 'wagmi';
import abi from '../../lib/contracts/portalo_contract_abi.json';
import HomeCardsList from './HomeCardList';

const contract = process.env.NEXT_PUBLIC_PORTALO_CONTRACT_ADDRESS;

const Home: FC = () => {
  const { address, connector } = useAccount();
  // const address = '0x0C5AE41F3c2898e46e73376c21bc52e61Dc9EFfE';
  const { decryptSymmetric } = useEncrypt();

  const setProfiles = useSetRecoilState(profilesState);

  const { signMessageAsync } = useSignMessage();

  //Obtener los Ids de Profiles de la cuenta conectada
  const { data } = useReadContract({
    abi: abi,
    address: contract as `0x${string}`,
    functionName: 'getProfileIdsByOwner',
    args: [address],
  });

  const filteredProfiles = useMemo(() => {
    return [...new Set((data as string[])?.map((id) => id))];
  }, [data]);

  const profilesIdsQuerys = useMemo(
    () =>
      filteredProfiles.map((id: string) => ({
        abi: abi,
        address: contract as `0x${string}`,
        functionName: 'getProfileById',
        args: [id],
      })),
    [filteredProfiles]
  );

  const { data: zkProfiles } = useReadContracts({
    contracts: profilesIdsQuerys as any,
  });

  console.log({ zkProfiles });

  useEffect(() => {
    if (!zkProfiles || !connector || !address) return;

    zkProfiles.forEach(async ({ result }) => {
      const signature = await signMessageAsync({
        account: address,
        message: (result as ZkProfile)!.nonce,
      });

      const key = await decryptSymmetric(
        (result as ZkProfile)!.profileEncryptionKey,
        signature
      );

      const profileDto: ProfileDTO = JSON.parse(
        (await decryptSymmetric((result as ZkProfile)!.encryptedData, key!))!
      );

      setProfiles((profiles) => [
        ...profiles.filter((profile) => profile.id !== profileDto.id),
        profileDto,
      ]);
    });
  }, [zkProfiles]);

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
