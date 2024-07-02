import { Avatar } from '@core/ui/Avatar';
import { TypographyH4, TypographyMuted } from '@core/ui/Typography';
import { IFolder } from '@models/business/folder/folder';
import { Profile } from '@models/business/profile';
import { Wallet } from 'lucide-react';

interface FolderTitleProps {
  profile: Profile;
  folder: IFolder;
}

const FolderTitle: React.FC<FolderTitleProps> = ({ profile, folder }) => {
  if (!profile || !folder) return null;

  console.log(folder);

  return (
    <div className="flex items-center gap-4">
      <Avatar className="bg-muted grid place-items-center w-[42px] h-[42px]">
        <Wallet className="text-muted-foreground" />
      </Avatar>

      <div>
        <TypographyMuted>{profile.name}</TypographyMuted>

        <TypographyH4>{folder.folderType.label}</TypographyH4>
      </div>
    </div>
  );
};

export default FolderTitle;
