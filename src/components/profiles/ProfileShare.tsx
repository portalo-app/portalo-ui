'use client';

import FolderListItem from '@components/folders/FolderListItem';
import { Separator } from '@core/ui/Separator';
import { TypographyH3 } from '@core/ui/Typography';
import { ProfileDTO } from '@models/dto/profile.dto';
import { sharedProfileState } from '@states/sharedProfile.atom';
import { Folder } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import NodeRSA from 'node-rsa';
import { FC } from 'react';
import { useSetRecoilState } from 'recoil';
import ProfileHeader from './ProfileHeader';

const ProfileShare: FC = () => {
  const searchParams = useSearchParams();
  const setSharedProfile = useSetRecoilState(sharedProfileState);

  const encryptedProfile = decodeURIComponent(searchParams.get('profile')!);
  const key = new NodeRSA().importKey(`-----BEGIN RSA PRIVATE KEY-----
    MIIBOgIBAAJBAJe54MqfdzVWbea9mdHwWcj+PJCe59nyRsUC2xghdvOuu1uPCEnJ
    MWRHYEmp+Iay2XEPZEGvwIbmS6Jo+acgpB0CAwEAAQJAIul6eCVJYNSKZVWrV0te
    3YjilsR5xQSilCKcF2lb3aYxpCZnh2IipH/QkPfkkE85whkQf6xiPniNApV51+fM
    YQIhAPyfzjO0TLWrukA51fpVsp4XOpn+78kOuo4+oWw33RwTAiEAmcDpyENLJnS9
    qKwi8JtpLVcRLlbnDBBdhcporsCV5Q8CICtpUsfzzdLSRdlPlwPDwkQEfd+EvbPx
    QgG7pYWxO9/dAiBjP/1pcc8UDu3S8PNI//k/9GE52Y0h43qLf+JdVCIujwIhAO/I
    mwdPQFw+nVLgFpWvGOdoSwv/m7Hfi1JEIpJ6JRFg
    -----END RSA PRIVATE KEY-----`);
  const profile = JSON.parse(
    key.decrypt(encryptedProfile, 'utf8')
  ) as ProfileDTO;

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
