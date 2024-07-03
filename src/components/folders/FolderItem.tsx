import { ROUTES } from '@constants/routes.const';
import useFolderType from '@hooks/useFolderType';
import { FolderDTO } from '@models/dto/folder.dto';
import { ProfileDTO } from '@models/dto/profile.dto';
import { ChevronRight } from 'lucide-react';
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

  return (
    <Link
      href={`${ROUTES.APP_PROFILE}/${profile?.id}/${ROUTES.APP_FOLDER}/${folder?.id}`}
    >
      <div className="py-4 relative">
        <FolderTitle
          profileName={profile.name}
          folderTypeName={folderType?.label}
        />

        <ChevronRight
          size={24}
          className="absolute top-[calc(50%-12px)] right-2 text-muted-foreground"
        />
      </div>
    </Link>
  );
};

export default FolderListItem;
