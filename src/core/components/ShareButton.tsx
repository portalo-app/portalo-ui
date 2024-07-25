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
      `-----BEGIN RSA PRIVATE KEY-----
MIIBOgIBAAJBAJe54MqfdzVWbea9mdHwWcj+PJCe59nyRsUC2xghdvOuu1uPCEnJ
MWRHYEmp+Iay2XEPZEGvwIbmS6Jo+acgpB0CAwEAAQJAIul6eCVJYNSKZVWrV0te
3YjilsR5xQSilCKcF2lb3aYxpCZnh2IipH/QkPfkkE85whkQf6xiPniNApV51+fM
YQIhAPyfzjO0TLWrukA51fpVsp4XOpn+78kOuo4+oWw33RwTAiEAmcDpyENLJnS9
qKwi8JtpLVcRLlbnDBBdhcporsCV5Q8CICtpUsfzzdLSRdlPlwPDwkQEfd+EvbPx
QgG7pYWxO9/dAiBjP/1pcc8UDu3S8PNI//k/9GE52Y0h43qLf+JdVCIujwIhAO/I
mwdPQFw+nVLgFpWvGOdoSwv/m7Hfi1JEIpJ6JRFg
-----END RSA PRIVATE KEY-----`
    );

    const JSONProfile = JSON.stringify(profile);
    const encrypted = encodeURIComponent(key.encrypt(JSONProfile, 'base64'));

    navigator.clipboard.writeText(
      `${window.location.origin}/profiles/share?profile=${encrypted}`
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
