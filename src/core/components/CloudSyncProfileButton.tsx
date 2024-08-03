import FolderListItem from '@components/folders/FolderListItem';
import { ROUTES } from '@constants/routes.const';
import { Button } from '@core/ui/Button';
import ResponsiveDialog from '@core/ui/ResponsiveDialog';
import { Separator } from '@core/ui/Separator';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@core/ui/Tooltip';
import { TypographyH3, TypographyP } from '@core/ui/Typography';
import { ProfileDTO } from '@models/dto/profile.dto';
import { CloudUpload, Folder } from 'lucide-react';
import Link from 'next/link';
import { FC } from 'react';
import ConnectWallet from './ConnectWallet';

interface CloudSyncProfileButtonProps {
  profile: ProfileDTO;
}

const CloudSyncProfileButton: FC<CloudSyncProfileButtonProps> = ({
  profile,
}) => {
  const filteredProfiles = profile?.folders.filter(
    (folder) => folder.files.length > 0
  );
  const hasFiles = filteredProfiles.length > 0;

  return (
    <ResponsiveDialog
      title="Secure Profile Storage"
      trigger={
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger className="w-full">
              <Button
                variant="outline"
                className="flex gap-2 rounded-xl w-full"
              >
                <CloudUpload size={20} />
              </Button>
            </TooltipTrigger>
            <TooltipContent className="text-wrap max-w-[100ch]">
              esto es un tooltip
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      }
    >
      <div className="border mt-4 rounded-lg">
        <div className="flex justify-between items-center bg-muted p-4 rounded-t-lg">
          <div className="flex items-center gap-2">
            <Folder />
            <TypographyH3>Folders you will save</TypographyH3>
          </div>
        </div>
        <div className="*:block space-y-2 px-4 bg-card rounded-b-lg">
          {hasFiles ? (
            filteredProfiles.map((folder, index) => (
              <Link
                key={index}
                href={`${ROUTES.APP_PROFILE}/${
                  profile.id
                }/${ROUTES.APP_FOLDER}/${folder.id}`}
              >
                <FolderListItem
                  profileName={profile.name}
                  folderTypeId={folder.folderTypeId}
                  profileId={profile.id}
                />
                {profile.folders.length - 1 !== index && <Separator />}
              </Link>
            ))
          ) : (
            <TypographyP>This profile doesnt have files</TypographyP>
          )}
        </div>
      </div>
      <ConnectWallet />
    </ResponsiveDialog>
  );
};

export default CloudSyncProfileButton;
