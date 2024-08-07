'use client';

import FolderListItem from '@components/folders/FolderListItem';
import { RECOMMENDED_PROFILES } from '@constants/recommendations.const';
import PlainCard from '@core/components/PlainCard';
import PortaloCTA from '@core/components/PortaloCTA';
import { Separator } from '@core/ui/Separator';
import { TypographyH4 } from '@core/ui/Typography';
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
  const recommendation = searchParams.get('recommendation');

  const profile = recommendation
    ? RECOMMENDED_PROFILES.find((profile) => profile.id === recommendation)!
    : (JSON.parse(
        lzString.decompressFromEncodedURIComponent(searchParams.get('profile')!)
      ) as ProfileDTO);

  if (!recommendation) setSharedProfile(profile);

  return (
    <div>
      <ProfileHeader profile={profile} isProfilePage readonly />

      <PlainCard
        title={<TypographyH4 className="py-3">Folders</TypographyH4>}
        titleIcon={<Folder />}
        content={
          profile.folders.length > 0 ? (
            <>
              {profile?.folders
                .filter((folder) => folder.files.length > 0)
                .map((folder, index) => (
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
            </>
          ) : (
            <div className="text-center text-muted-foreground p-4 pb-6">
              No folders found
            </div>
          )
        }
      />

      <PortaloCTA />
    </div>
  );
};

export default ProfileShare;
