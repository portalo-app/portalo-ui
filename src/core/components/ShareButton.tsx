import AnimatedButton from '@core/ui/AnimatedButton';
import { Button } from '@core/ui/Button';
import ResponsiveDialog from '@core/ui/ResponsiveDialog';
import { TypographyH5 } from '@core/ui/Typography';
import { ProfileDTO } from '@models/dto/profile.dto';
import { Clipboard, Share, Share2 } from 'lucide-react';
import lzString from 'lz-string';
import { QRCodeSVG } from 'qrcode.react';
import { FC } from 'react';

interface ShareButtonProps {
  profile: ProfileDTO;
}

const ShareButton: FC<ShareButtonProps> = ({ profile }) => {
  const JSONProfile = JSON.stringify(profile);
  const compressed = lzString.compressToEncodedURIComponent(JSONProfile);

  const shareUrl = `${window.location.origin}/profiles/share?profile=${compressed}`;

  return (
    <ResponsiveDialog
      title="Share Profile"
      trigger={
        <Button
          variant="outline"
          className="flex gap-2 border-primary hover:bg-primary/30 text-secondary"
        >
          Share <Share size={16} />
        </Button>
      }
    >
      <div className="text-center space-y-2 grid place-items-center mt-5">
        <div className="px-4 border-2 border-muted p-2 rounded-xl">
          <TypographyH5>{profile.name}&apos;s profile</TypographyH5>
        </div>

        <div className="px-4 space-y-2">
          <QRCodeSVG
            includeMargin
            value={shareUrl}
            size={256}
            className="rounded-3xl"
          />
        </div>

        <div className="flex flex-col gap-3 w-full pb-3 pt-5">
          {navigator?.share && (
            <Button
              className="gap-2 w-full"
              variant="outline"
              onClick={() =>
                navigator?.share({
                  text: profile.name,
                  url: shareUrl,
                })
              }
            >
              <Share2 size={16} />
              Share
            </Button>
          )}
          <AnimatedButton
            className="gap-2 w-full"
            onClick={() => navigator.clipboard.writeText(shareUrl)}
          >
            Copy to Clipboard <Clipboard size={16} />
          </AnimatedButton>
        </div>
      </div>
    </ResponsiveDialog>
  );
};

export default ShareButton;
