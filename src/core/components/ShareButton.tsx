import { Button } from '@core/ui/Button';
import ResponsiveDialog from '@core/ui/ResponsiveDialog';
import {
  TypographyH4,
  TypographyMutedXS,
  TypographyP,
} from '@core/ui/Typography';
import { ProfileDTO } from '@models/dto/profile.dto';
import Avvvatars from 'avvvatars-react';
import { Share, Share2, Users } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { FC } from 'react';
import CopyButton from './CopyButton';

interface ShareButtonProps {
  profile: ProfileDTO;
}

const ShareButton: FC<ShareButtonProps> = ({ profile }) => {
  // const profileToShare = {
  //   ...profile,
  //   folders: profile.folders.filter((folder) => folder.files.length > 0),
  // };
  // const JSONProfile = JSON.stringify(profileToShare);
  // const compressed = lzString.compressToEncodedURIComponent(JSONProfile);

  // const shareUrl = `${window.location.origin}/profiles/share?profile=${compressed}`;

  // TODO: Set the correct and UNIQUE profile ID
  const profileID = profile.id;
  const shareUrl = `${window.location.origin}/profiles/share?profile=${profileID}`;

  // TODO: Implement
  const goToManageAccess = () => {
    // router.push(`/profiles/${profile.id}/manage-access`);
  };

  // TODO: Implement
  const shareProfile = () => {
    // navigator?.share({
    //   text: `Portalo profile: ${profile.name}`,
    //   url: shareUrl,
    // });
  };

  return (
    <ResponsiveDialog
      title="Share Profile"
      trigger={
        <Button
          variant="outline"
          className="flex gap-2 border-primary hover:bg-primary hover:text-foreground text-primary rounded-xl"
        >
          <TypographyP className="hidden md:block">Share</TypographyP>
          <Share size={16} />
        </Button>
      }
    >
      <div className="text-center space-y-2 grid place-items-center">
        <div className="flex justify-center items-center rounded w-full">
          {/* TOOLBAR */}
          <div className="flex items-center gap-2">
            <Avvvatars value={profile.name} size={42} />

            <TypographyH4 className="text-left">
              {profile.name}&apos;s profile
            </TypographyH4>
          </div>
        </div>

        <div className="px-4 pt-2 space-y-2 w-full">
          <QRCodeSVG
            includeMargin
            value={shareUrl}
            size={512}
            className="w-full h-fit rounded-3xl"
          />

          <TypographyMutedXS>{shareUrl}</TypographyMutedXS>
        </div>

        <div className="flex flex-col gap-3 w-full pb-3 pt-5">
          {navigator?.share && (
            <Button
              className="gap-2 w-full"
              variant="outline"
              onClick={() =>
                navigator?.share({
                  text: `👛️ Portalo: ${profile.name}'s profile`,
                  url: shareUrl,
                })
              }
            >
              <Share2 size={16} />
              Share
            </Button>
          )}

          <div className="flex *:flex-1 gap-2">
            <CopyButton text={shareUrl} />

            <Button variant="outline" className="gap-2" onClick={shareProfile}>
              <Share2 />
              Share
            </Button>
          </div>

          <Button className="gap-2" onClick={goToManageAccess}>
            <Users />
            Manage Access
          </Button>
        </div>
      </div>
    </ResponsiveDialog>
  );
};

export default ShareButton;
