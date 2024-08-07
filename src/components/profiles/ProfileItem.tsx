import { ROUTES } from '@constants/routes.const';
import { Card } from '@core/ui/Card';
import { TypographyH5, TypographyMuted } from '@core/ui/Typography';
import { ProfileDTO } from '@models/dto/profile.dto';
import Avvvatars from 'avvvatars-react';
import Image from 'next/image';
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
      <Card className="flex flex-col items-center w-36 h-fit py-3 px-5 bg-muted/25">
        {profile.icon ? (
          <Image
            src={profile.icon}
            alt={`${name} logo`}
            width={46}
            height={46}
          />
        ) : (
          <Avvvatars value={name} size={46} style="character" />
        )}

        <TypographyH5>{name}</TypographyH5>
        <TypographyMuted className="text-primary">{countLabel}</TypographyMuted>
      </Card>
    </Link>
  );
};

export default ProfileItem;
