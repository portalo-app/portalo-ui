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
import { motion } from 'framer-motion';
import { CircleCheckBig, CloudUpload, Folder, Info } from 'lucide-react';
import Link from 'next/link';
import { FC, useEffect, useState } from 'react';
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

  const [showStoreProfile, setShowStoreProfile] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  const [animationCompleted, setAnimationCompleted] = useState(false);
  const [title, setTitle] = useState('Secure Profile Storage');

  const handleConnectWallet = () => {
    setShowStoreProfile(true);
  };

  const handleStoreProfileClick = () => {
    setShowAnimation(true);
    setAnimationCompleted(false);
    setTitle('Saving your data');
    setTimeout(() => {
      setShowAnimation(false);
      setAnimationCompleted(true);
      setTitle('Profile Saved Correctly');
    }, 3000);
  };

  useEffect(() => {
    if (!showAnimation && !animationCompleted) {
      setTitle('Secure Profile Storage');
    }
  }, [showAnimation, animationCompleted]);

  return (
    <ResponsiveDialog
      title={title}
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
              This is a tooltip
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      }
    >
      <div className="mt-4 rounded-lg bg-background dark:bg-background">
        <div className="space-y-2 px-4 rounded-b-lg ">
          {showAnimation ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-4 flex justify-center"
            >
              <motion.div
                className="loader"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              >
                <div className="w-44 h-44 border-4 border-dashed border-t-transparent border-violet-500 rounded-full"></div>
              </motion.div>
            </motion.div>
          ) : animationCompleted ? (
            <div className="flex flex-col items-center gap-4 my-10 bg-background dark:bg-background">
              <CircleCheckBig className="text-green-500 w-44 h-44" />
              <Button>Share</Button>
              <Button>Done</Button>
            </div>
          ) : hasFiles ? (
            <>
              <div className="flex items-center bg-muted p-4 rounded-t-lg">
                <div className="flex items-center gap-2">
                  <Folder />
                  <TypographyH3>Folders you will save</TypographyH3>
                </div>
              </div>
              {filteredProfiles.map((folder, index) => (
                <Link
                  key={index}
                  href={`${ROUTES.APP_PROFILE}/${profile.id}/${ROUTES.APP_FOLDER}/${folder.id}`}
                >
                  <FolderListItem
                    profileName={profile.name}
                    folderTypeId={folder.folderTypeId}
                    profileId={profile.id}
                  />
                  {profile.folders.length - 1 !== index && <Separator />}
                </Link>
                /* TO DO: Add how many files have each folder */
              ))}
              <div className="flex justify-center py-4">
                {showStoreProfile ? (
                  <Button onClick={handleStoreProfileClick}>
                    Store Profile
                  </Button>
                ) : (
                  <ConnectWallet onConnect={handleConnectWallet} />
                )}
              </div>
            </>
          ) : (
            <div className="flex justify-center items-center gap-4">
              <Info />
              <TypographyP className="pb-2 mb-4">
                This profile doesn&apos;t have files
              </TypographyP>
            </div>
          )}
        </div>
      </div>
    </ResponsiveDialog>
  );
};

export default CloudSyncProfileButton;
