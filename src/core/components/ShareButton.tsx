import { Button } from '@core/ui/Button';
import { ProfileDTO } from '@models/dto/profile.dto';
import { Share } from 'lucide-react';
import lzString from 'lz-string';
import { FC } from 'react';

interface ShareButtonProps {
  profile: ProfileDTO;
}

const ShareButton: FC<ShareButtonProps> = ({ profile }) => {
  const shareProfile = () => {
    const JSONProfile = JSON.stringify(profile);
    const compressed = lzString.compressToEncodedURIComponent(JSONProfile);

    navigator.clipboard.writeText(
      `${window.location.origin}/profiles/share?profile=${compressed}`
    );
  };

  return (
    <Button
      variant="outline"
      className="flex gap-2 border-primary hover:bg-primary/30 text-secondary"
      onClick={shareProfile}
    >
      Share <Share size={16} />
    </Button>
  );
};

export default ShareButton;
