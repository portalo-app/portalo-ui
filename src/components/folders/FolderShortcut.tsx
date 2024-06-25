import { ROUTES } from '@constants/routes.const';
import { TypographyH4, TypographyMuted } from '@core/ui/Typography';
import { Folder, Profile } from '@models/profile';
import { ChevronRight, Landmark, UserRound } from 'lucide-react';
import Link from 'next/link';

interface FolderShortcutProps {
  profile: Profile;
  folder: Folder<any>;
}

const FolderShortcut: React.FC<FolderShortcutProps> = ({ profile, folder }) => {
  if (!profile || !folder) return null;

  return (
    <Link
      href={`${ROUTES.APP_PROFILE}/${profile?.id}/${ROUTES.APP_FOLDER}/${folder?.id}`}
    >
      <div className="py-4 relative">
        <div className="flex gap-4 items-center">
          <Landmark size={36} className="text-muted-foreground" />

          <div>
            <div className="flex items-center gap-1">
              <UserRound size={16} className="text-muted-foreground" />
              <TypographyMuted>{profile.name}</TypographyMuted>
            </div>

            <TypographyH4>{folder.type.label}</TypographyH4>
          </div>
        </div>

        <ChevronRight
          size={24}
          className="absolute top-[calc(50%-12px)] right-2 text-muted-foreground"
        />
      </div>
    </Link>
  );
};

export default FolderShortcut;
