'use client';

import FolderListItem from '@components/folders/FolderListItem';
import { Separator } from '@core/ui/Separator';
import { TypographyH3 } from '@core/ui/Typography';
import { ProfileDTO } from '@models/dto/profile.dto';
import { sharedProfileState } from '@states/sharedProfile.atom';
import { Folder } from 'lucide-react';
import lzString from 'lz-string';
import { useSearchParams } from 'next/navigation';
import { FC } from 'react';
import { useSetRecoilState } from 'recoil';
import ProfileHeader from './ProfileHeader';

const ProfileShare: FC = () => {
  const searchParams = useSearchParams();
  const setSharedProfile = useSetRecoilState(sharedProfileState);

  const compressedProfile = decodeURIComponent(searchParams.get('profile')!);

  const decompressed =
    lzString.decompressFromEncodedURIComponent(compressedProfile);

  const profile = JSON.parse(decompressed) as ProfileDTO;

  setSharedProfile(profile);

  return (
    <div>
      <div className="ml-4 md:ml-0">
        <ProfileHeader profile={profile} isProfilePage readonly />
      </div>

      <div className="border border-muted mt-4 rounded-lg">
        <div className="flex justify-between items-center bg-muted/80 p-4 rounded-t-lg">
          <div className="flex items-center gap-2">
            <Folder />
            <TypographyH3>Folders</TypographyH3>
          </div>
        </div>

        <div className="*:block space-y-2 mt-4 px-4">
          {profile?.folders.map((folder, index) => (
            <>
              <FolderListItem
                profileName={profile.name}
                folderTypeId={folder.folderTypeId}
                profileId={profile.id}
                readonly
              />
              {profile.folders.length - 1 !== index && <Separator />}
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileShare;
