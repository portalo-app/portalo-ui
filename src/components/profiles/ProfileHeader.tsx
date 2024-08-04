import CloudSyncProfileButton from '@core/components/CloudSyncProfileButton';
import DeleteProfileButton from '@core/components/DeleteProfileButton';
import ShareButton from '@core/components/ShareProfileButton';
import { Button } from '@core/ui/Button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@core/ui/Tooltip';
import { TypographyH3 } from '@core/ui/Typography';
import { ProfileDTO } from '@models/dto/profile.dto';
import Avvvatars from 'avvvatars-react';
import { Users } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface ProfileHeaderProps {
  profile: ProfileDTO;
  isProfilePage?: boolean;
  readonly?: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ManageAccessButton: React.FC<{ profile: ProfileDTO }> = ({ profile }) => {
  const router = useRouter();

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className="w-full">
          <Button
            variant="outline"
            className="flex gap-2 rounded-xl w-full"
            onClick={() => router.push(`/profiles/${profile.id}/manage-access`)}
          >
            <Users size={20} />
          </Button>
        </TooltipTrigger>

        <TooltipContent className="text-wrap max-w-[100ch]">
          Manage Access
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  profile,
  isProfilePage,
  readonly,
}) => {
  return (
    <>
      <div className="py-4 rounded-md">
        <div className="flex gap-3 items-center">
          <Avvvatars value={profile?.name || ''} size={42} style="character" />
          <TypographyH3>{profile?.name}</TypographyH3>
        </div>
        {isProfilePage && !readonly && (
          <div className="flex gap-2 mt-4">
            <CloudSyncProfileButton profile={profile} />

            {/* <ManageAccessButton profile={profile} /> */}

            <ShareButton profile={profile} />

            <DeleteProfileButton profile={profile} />
          </div>
        )}
      </div>
    </>
  );
};

export default ProfileHeader;
