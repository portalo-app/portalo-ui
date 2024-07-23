'use client';

import { ROUTES } from '@constants/routes.const';
import IconButton from '@core/components/IconButton';
import { Button } from '@core/ui/Button';
import { DialogClose } from '@core/ui/Dialog';
import { Input } from '@core/ui/Input';
import ResponsiveDialog from '@core/ui/ResponsiveDialog';
import { TypographyP } from '@core/ui/Typography';
import { useToast } from '@core/ui/useToast';
import useFileStorage from '@hooks/useFileStorage';
import { Link, Share } from 'lucide-react';
import { FC, useState } from 'react';

interface ShareFolderProps {
  folderCID: string | null;
  account: string | null;
  profileId: string;
  folderId: string;
}

const ShareFolder: FC<ShareFolderProps> = ({
  folderCID,
  account,
  profileId,
  folderId,
}) => {
  const [addressesToShare, setAddressesToShare] = useState<string>('');
  const { shareEncryptedFolder } = useFileStorage();
  const { toast } = useToast();

  const shareLink: string = `${window.location.origin}${ROUTES.APP_PROFILE}/${profileId}${ROUTES.APP_FOLDER}/${folderId}/share/${folderCID}`;

  return (
    <ResponsiveDialog
      title="Share folder"
      trigger={
        <IconButton
          disabled={!folderCID || !account}
          disabledTooltip="Please connect an account to share"
          onClick={() => {}}
          icon={<Share size={16} />}
        />
      }
    >
      <div className="space-y-4">
        <TypographyP>
          Share this folder with other users by entering their Ethereum address
          below.
        </TypographyP>
        <Input
          type="text"
          placeholder="EVM address"
          onChange={(event) => setAddressesToShare(event.target.value)}
        />

        <div className="flex justify-end gap-4">
          <Button
            className="flex gap-2"
            onClick={() => {
              navigator.clipboard.writeText(shareLink);
              toast({
                title: 'Link copied to clipboard',
              });
            }}
          >
            Copy Link <Link size={16} />
          </Button>
          <DialogClose>
            <Button
              className="w-24"
              onClick={() =>
                shareEncryptedFolder(folderCID!, [addressesToShare])
              }
            >
              Share
            </Button>
          </DialogClose>
        </div>
      </div>
    </ResponsiveDialog>
  );
};

export default ShareFolder;
