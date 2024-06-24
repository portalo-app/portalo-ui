import { ROUTES } from '@constants/routes.const';
import { Folder, Profile } from '@models/profile';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import FolderTitle from './FolderTitle';

interface FolderItemProps {
  profile: Profile;
  folder: Folder<any>;
}

const FolderItem: React.FC<FolderItemProps> = ({ profile, folder }) => {
  // TODO: Define an icon directory to better fetch the icon.
  // const Icon = folder.type.icon as LucideIcon;

  if (!profile || !folder) return null;

  return (
    <Link
      href={`${ROUTES.APP_PROFILE}/${profile?.id}/${ROUTES.APP_FOLDER}/${folder?.id}`}
    >
      <div className="py-4 relative">
        <FolderTitle profile={profile} folder={folder} />

        <ChevronRight
          size={24}
          className="absolute top-[calc(50%-12px)] right-2 text-muted-foreground"
        />
      </div>
    </Link>
  );
};

export default FolderItem;
