import { Button } from '@core/ui/Button';
import { ProfileDTO } from '@models/dto/profile.dto';
import { Share } from 'lucide-react';
import NodeRSA from 'node-rsa';
import { FC } from 'react';

interface ShareButtonProps {
  profile: ProfileDTO;
}

const ShareButton: FC<ShareButtonProps> = ({ profile }) => {
  const shareProfile = async () => {
    const key = new NodeRSA().importKey(
      process.env.NEXT_PUBLIC_PORTALO_RSA_KEY!
    );

    const encryptedProfile = encodeURIComponent(
      key.encrypt(JSON.stringify(profile), 'base64')
    );

    navigator.clipboard.writeText(
      `${window.location.origin}/profiles/share?profile=${encryptedProfile}`
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
