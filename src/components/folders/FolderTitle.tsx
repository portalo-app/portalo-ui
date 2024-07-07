import { TypographyH4, TypographyMuted } from '@core/ui/Typography';

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
      <div>
        <TypographyMuted>{profileName}</TypographyMuted>

        <TypographyH4>{folderTypeName}</TypographyH4>
      </div>
    </div>
  );
};

export default FolderTitle;
