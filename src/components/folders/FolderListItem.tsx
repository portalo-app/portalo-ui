import { ROUTES } from '@constants/routes.const';
import Icon from '@core/ui/Icon';
import useFolderType from '@hooks/useFolderType';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import FolderTitle from './FolderTitle';

interface FolderListItemProps {
  profileName: string;
  folderTypeId: string;
  profileId: string;
}

const FolderListItem: React.FC<FolderListItemProps> = ({
  profileName,
  folderTypeId,
  profileId,
}) => {
  const { getFolderType } = useFolderType();

  const folderType = getFolderType(folderTypeId);

  return (
    <Link
      href={`${ROUTES.APP_PROFILE}/${profileId}/${ROUTES.APP_FOLDER}/${folderTypeId}`}
    >
      <div className="flex py-4 items-center justify-between">
        <div className="flex gap-4 items-center">
          <Icon
            size={35}
            name={folderType.icon}
            className="text-muted-foreground"
          />
          <FolderTitle
            profileName={profileName}
            folderTypeName={folderType?.label}
          />
        </div>

        <ChevronRight size={24} className="text-muted-foreground mr-2" />
      </div>
    </Link>
  );
};

export default FolderListItem;
