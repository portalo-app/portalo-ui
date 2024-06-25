import { TypographyH4, TypographyMuted } from '@core/ui/Typography';
import { Folder, Profile } from '@models/profile';
import { UserRound } from 'lucide-react';

interface FolderTitleProps {
  profile: Profile;
  folder: Folder<any>;
}

const FolderTitle: React.FC<FolderTitleProps> = ({ profile, folder }) => {
  if (!profile || !folder) return null;

  return (
    <div className="flex items-center gap-4">
      <div>
        <div className="flex items-center gap-1">
          <UserRound size={16} className="text-muted-foreground" />
          <TypographyMuted>{profile.name}</TypographyMuted>
        </div>

        <TypographyH4>{folder.type.label}</TypographyH4>
      </div>
    </div>
  );
};

export default FolderTitle;
