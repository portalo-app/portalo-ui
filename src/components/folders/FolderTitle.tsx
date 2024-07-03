import { Avatar } from '@core/ui/Avatar';
import { TypographyH4, TypographyMuted } from '@core/ui/Typography';
import { Wallet } from 'lucide-react';

interface FolderTitleProps {
  profileName: string;
  folderTypeName: string | undefined;
}

const FolderTitle: React.FC<FolderTitleProps> = ({
  profileName,
  folderTypeName,
}) => {
  return (
    <div className="flex items-center gap-4">
      <Avatar className="bg-muted grid place-items-center w-[42px] h-[42px]">
        <Wallet className="text-muted-foreground" />
      </Avatar>

      <div>
        <TypographyMuted>{profileName}</TypographyMuted>

        <TypographyH4>{folderTypeName}</TypographyH4>
      </div>
    </div>
  );
};

export default FolderTitle;
