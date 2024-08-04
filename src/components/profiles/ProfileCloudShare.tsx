'use client';

import FolderListItem from '@components/folders/FolderListItem';
import PortaloCTA from '@core/components/PortaloCTA';
import { Separator } from '@core/ui/Separator';
import { TypographyH3 } from '@core/ui/Typography';
import useEncrypt from '@hooks/useEncrypt';
import { ProfileDTO } from '@models/dto/profile.dto';
import { ZkProfile } from '@models/zk/zkProfile.model';
import { sharedProfileState } from '@states/sharedProfile.atom';
import { Folder } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { FC, useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { Abi } from 'viem';
import { useReadContract } from 'wagmi';
import abi from '../../lib/contracts/portalo_contract_abi.json';
import ProfileHeader from './ProfileHeader';

const contract = process.env.NEXT_PUBLIC_PORTALO_CONTRACT_ADDRESS;

const ProfileCloudShare: FC = () => {
  const [profile, setProfile] = useState<ProfileDTO>();

  const searchParams = useSearchParams();
  const setSharedProfile = useSetRecoilState(sharedProfileState);
  const { decryptSymmetric } = useEncrypt();

  const profileId = searchParams.get('id')!;
  const key = searchParams.get('key')!;

  const { data } = useReadContract({
    abi: abi as unknown as Abi,
    address: contract as `0x${string}`,
    functionName: 'getProfileById',
    args: [profileId],
  });

  useEffect(() => {
    if (!data) return;
    const decryptProfile = async () => {
      const decryptedProfile: ProfileDTO = JSON.parse(
        (await decryptSymmetric((data as ZkProfile).encryptedData, key))!
      );
      setProfile(decryptedProfile);
      setSharedProfile(decryptedProfile);
    };

    decryptProfile();
  }, [data, setSharedProfile]);

  return (
    <div>
      <div className="ml-4 md:ml-0">
        {profile && <ProfileHeader profile={profile} isProfilePage readonly />}
      </div>

      <div className="border border-muted mt-4 rounded-lg">
        <div className="flex justify-between items-center bg-muted/80 p-4 rounded-t-lg">
          <div className="flex items-center gap-2">
            <Folder />
            <TypographyH3>Folders</TypographyH3>
          </div>
        </div>

        <div className="*:block space-y-2 mt-4 px-4">
          {profile && profile.folders.length > 0 ? (
            profile?.folders?.map((folder, index) => (
              <>
                <FolderListItem
                  profileName={profile.name}
                  folderTypeId={folder.folderTypeId}
                  profileId={profile.id}
                  readonly
                />
                {profile.folders.length - 1 !== index && <Separator />}
              </>
            ))
          ) : (
            <div className="text-center text-muted-foreground p-4 pb-6">
              No folders found
            </div>
          )}
        </div>
      </div>

      <PortaloCTA />
    </div>
  );
};

export default ProfileCloudShare;
