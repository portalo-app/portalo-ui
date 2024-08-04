/* eslint-disable @typescript-eslint/no-unused-vars */
import FolderListItem from '@components/folders/FolderListItem';
import { Button } from '@core/ui/Button';
import ResponsiveDialog from '@core/ui/ResponsiveDialog';
import { Separator } from '@core/ui/Separator';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@core/ui/Tooltip';
import { TypographyH3, TypographyMuted } from '@core/ui/Typography';
import useCloudProfile from '@hooks/profiles/useUploadProfile';
import { ProfileDTO } from '@models/dto/profile.dto';
import { Check, CircleX, CloudUpload, LoaderCircle } from 'lucide-react';
import { FC, useState } from 'react';
import { useAccount } from 'wagmi';
import ConnectWallet from './ConnectWallet';
import ShareButton from './ShareProfileButton';

interface CloudSyncProfileButtonProps {
  profile: ProfileDTO;
}

enum TX_STATUS {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  FAILURE = 'FAILURE',
}

const UploadPreview: FC<{ profile: ProfileDTO }> = ({ profile }) => {
  return (
    <div>
      <TypographyMuted>
        Folders included in your profile {profile.name}
      </TypographyMuted>

      {profile?.folders.map((folder, index) => (
        <div key={index}>
          <FolderListItem
            profileName={profile.name}
            folderTypeId={folder.folderTypeId}
            profileId={profile.id}
            isLink={false}
          />
          {profile.folders.length - 1 !== index && <Separator />}
        </div>
      ))}
    </div>
  );
};

const CloudSyncProfileButton: FC<CloudSyncProfileButtonProps> = ({
  profile,
}) => {
  const foldersWithFiles = profile?.folders.filter(
    (folder) => folder.files.length > 0
  );
  const hasFiles = foldersWithFiles.length > 0;

  const [showStoreProfile, setShowStoreProfile] = useState(false);
  const [actionState, setActionState] = useState<TX_STATUS>(TX_STATUS.IDLE);
  const [storeCompleted, setAnimationCompleted] = useState(false);
  const [wallet, setWallet] = useState<string | null>(null);
  const { isConnected } = useAccount();

  const { uploadProfile } = useCloudProfile();

  const handleConnectWallet = () => {
    setShowStoreProfile(true);
  };

  // TODO: Implement store action
  const handleUploadProfile = async () => {
    setActionState(TX_STATUS.LOADING);

    setAnimationCompleted(false);
    await uploadProfile(profile);

    setActionState(TX_STATUS.SUCCESS);
    setAnimationCompleted(true);
  };

  // TODO: Implement clsing
  const handleDone = () => {
    setActionState(TX_STATUS.IDLE);
    setAnimationCompleted(false);
    setShowStoreProfile(false);
  };

  return (
    <ResponsiveDialog
      title=""
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
              Upload Profile
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      }
    >
      <TypographyH3>Upload to Cloud</TypographyH3>

      {actionState === TX_STATUS.IDLE && <UploadPreview profile={profile} />}

      {actionState === TX_STATUS.LOADING && (
        <div className="text-center grid place-items-center py-4">
          <LoaderCircle className="animate-spin w-24 h-24 text-muted-foreground" />
          <TypographyH3>
            Please sign the transaction to upload your profile to the cloud
          </TypographyH3>
        </div>
      )}

      {actionState === TX_STATUS.SUCCESS && (
        <div className="text-center grid place-items-center py-4">
          <Check className="w-24 h-24 text-green-600" />

          <TypographyH3>Your profile was uploaded successfully</TypographyH3>
        </div>
      )}

      {actionState === TX_STATUS.FAILURE && (
        <div className="text-center grid place-items-center py-4">
          <CircleX className="w-24 h-24 text-red-600" />

          <TypographyH3>An error occurred, please try again later</TypographyH3>
        </div>
      )}

      {[TX_STATUS.IDLE, TX_STATUS.LOADING].includes(actionState) &&
        isConnected && (
          <Button
            className="gap-2"
            onClick={handleUploadProfile}
            disabled={actionState === TX_STATUS.LOADING}
          >
            <CloudUpload />
            Store Profile
          </Button>
        )}

      {!isConnected && <ConnectWallet onConnect={handleConnectWallet} />}

      {actionState === TX_STATUS.SUCCESS && storeCompleted && (
        <div className="flex flex-col gap-2 *:gap-2">
          <ShareButton profile={profile} title="Share" />

          <Button>
            <Check />
            Done
          </Button>
        </div>
      )}
    </ResponsiveDialog>
  );
};

export default CloudSyncProfileButton;
