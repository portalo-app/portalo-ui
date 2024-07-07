import { ROUTES } from '@constants/routes.const';
import useFolderType from '@hooks/useFolderType';
import { FolderDTO } from '@models/dto/folder.dto';
import { ProfileDTO } from '@models/dto/profile.dto';
import { ChevronRight, MessagesSquare, Wallet } from 'lucide-react';
import Link from 'next/link';
import FolderTitle from './FolderTitle';

interface FolderListItemProps {
  profile: ProfileDTO;
  folder: FolderDTO;
}

const FolderListItem: React.FC<FolderListItemProps> = ({ profile, folder }) => {
  // TODO: Define an icon directory to better fetch the icon.
  // const Icon = folder.type.icon as LucideIcon;

  const folderType = useFolderType(folder?.folderTypeId);

  if (!profile || !folder) return null;

  // const filesLabel = `${folder.files.length} file${
  //   folder.files.length > 1 || folder.files.length === 0 ? 's' : ''
  // }`;

  return (
    <Link
      href={`${ROUTES.APP_PROFILE}/${profile?.id}/${ROUTES.APP_FOLDER}/${folder?.id}`}
    >
      <div className="flex py-4 items-center justify-between">
        <div className="flex gap-4 items-center">
          {folder.id === 'social' ? (
            <MessagesSquare size={35} className="text-muted-foreground" />
          ) : (
            <Wallet size={35} className="text-muted-foreground" />
          )}
          <FolderTitle
            profileName={profile.name}
            folderTypeName={folderType?.label}
          />
        </div>

        <ChevronRight size={24} className="text-muted-foreground" />
      </div>
    </Link>
  );
};

export default FolderListItem;
