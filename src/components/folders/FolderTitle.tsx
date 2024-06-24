import { Avatar } from '@core/ui/Avatar';
import { TypographyH4, TypographyMuted } from '@core/ui/Typography';
import { Folder, Space } from '@models/space';
import { Wallet } from 'lucide-react';

interface FolderTitleProps {
  space: Space;
  folder: Folder<any>;
}

const FolderTitle: React.FC<FolderTitleProps> = ({ space, folder }) => {
  if (!space || !folder) return null;

  return (
    <div className="flex items-center gap-4">
      <Avatar className="bg-muted grid place-items-center w-[42px] h-[42px]">
        <Wallet className="text-muted-foreground" />
      </Avatar>

      <div>
        <TypographyMuted>{space.name}</TypographyMuted>

        <TypographyH4>{folder.type.label}</TypographyH4>
      </div>
    </div>
  );
};

export default FolderTitle;
