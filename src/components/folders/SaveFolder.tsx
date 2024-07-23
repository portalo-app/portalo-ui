import IconButton from '@core/components/IconButton';
import useFileStorage from '@hooks/useFileStorage';
import { FolderDTO } from '@models/dto/folder.dto';
import { Check, Save } from 'lucide-react';

interface SaveFolderProps {
  folderCID: string | null;
  folder: FolderDTO;
  profileId: string;
  accountConnected?: boolean;
  onSave: (cid: string) => void;
}

const SaveFolder: React.FC<SaveFolderProps> = ({
  folder,
  profileId,
  folderCID,
  accountConnected,
  onSave,
}) => {
  const { saveEncryptedFolder } = useFileStorage();

  return (
    <IconButton
      disabled={!accountConnected || !!folderCID}
      disabledTooltip={
        folderCID ? 'Folder already saved' : 'Please connect an account to save'
      }
      onClick={() => {
        saveEncryptedFolder(profileId, folder).then((cid) => onSave(cid));
      }}
      icon={folderCID ? <Check size={16} /> : <Save size={16} />}
    />
  );
};

export default SaveFolder;
