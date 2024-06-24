import { Avatar } from '@core/ui/Avatar';
import { TypographyH4, TypographyMuted } from '@core/ui/Typography';
import { Folder, Profile } from '@models/profile';
import { Wallet } from 'lucide-react';

interface FolderTitleProps {
  profile: Profile;
  folder: Folder<any>;
}

const FolderTitle: React.FC<FolderTitleProps> = ({ profile, folder }) => {
  if (!profile || !folder) return null;

  return (
    <div className="flex items-center gap-4">
      <Avatar className="bg-muted grid place-items-center w-[42px] h-[42px]">
        <Wallet className="text-muted-foreground" />
      </Avatar>

      <div>
        <TypographyMuted>{profile.name}</TypographyMuted>

        <TypographyH4>{folder.type.label}</TypographyH4>
      </div>
    </div>
  );
};

export default FolderTitle;
