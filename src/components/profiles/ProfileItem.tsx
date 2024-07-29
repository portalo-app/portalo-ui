import { ROUTES } from '@constants/routes.const';
import { TypographyH5, TypographyMuted } from '@core/ui/Typography';
import { ProfileDTO } from '@models/dto/profile.dto';
import Avvvatars from 'avvvatars-react';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface ProfileItemProps {
  profile: ProfileDTO;
}

const ProfileItem: React.FC<ProfileItemProps> = ({ profile }) => {
  const { id, name, folders } = profile;

  const count = folders.length;
  const countLabel = `${count} folder${count > 1 || count === 0 ? 's' : ''}`;

  return (
    <Link href={`${ROUTES.APP_PROFILE}/${id}`}>
      <div className="relative py-4">
        <div className="flex items-center gap-4">
          <Avvvatars value={name} size={36} style="character" />

          <div>
            <TypographyH5>{name}</TypographyH5>

            <TypographyMuted className="text-primary">
              {countLabel}
            </TypographyMuted>
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

export default ProfileItem;
