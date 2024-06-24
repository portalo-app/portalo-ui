import { ROUTES } from '@constants/routes.const';
import { Folder, Space } from '@models/space';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import FolderTitle from './FolderTitle';

interface FolderItemProps {
  space: Space;
  folder: Folder<any>;
}

const FolderItem: React.FC<FolderItemProps> = ({ space, folder }) => {
  // TODO: Define an icon directory to better fetch the icon.
  // const Icon = folder.type.icon as LucideIcon;

  if (!space || !folder) return null;

  return (
    <Link
      href={`${ROUTES.APP_SPACE}/${space?.id}/${ROUTES.APP_FOLDER}/${folder?.id}`}
    >
      <div className="py-4 relative">
        <FolderTitle space={space} folder={folder} />

        <ChevronRight
          size={24}
          className="absolute top-[calc(50%-12px)] right-2 text-muted-foreground"
        />
      </div>
    </Link>
  );
};

export default FolderItem;
