import { ROUTES } from '@constants/routes.const';
import { Card, CardContent, CardHeader } from '@core/ui/Card';
import {
  TypographyH4,
  TypographyMutedXS,
  TypographySmall,
} from '@core/ui/Typography';
import { Profile } from '@models/profile';
import Avvvatars from 'avvvatars-react';
import { ChevronRight, Coins, Landmark } from 'lucide-react';
import Link from 'next/link';

interface ProfileCardProps {
  profile: Profile;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ profile }) => {
  const { id, name, cryptoAddresses, fiatAddresses } = profile;
  const cryptoLabel = 'Crypto';
  const fiatLabel = 'Fiat';

  const addressCount = cryptoAddresses.length + fiatAddresses.length;
  const addressCountLabel = `${addressCount} address${
    addressCount > 1 ? 'es' : ''
  }`;

  const addressesStats = [
    {
      icon: Coins,
      label: cryptoLabel,
      count: cryptoAddresses.length,
    },
    {
      icon: Landmark,
      label: fiatLabel,
      count: fiatAddresses.length,
    },
  ];

  return (
    <Link href={`${ROUTES.APP_PROFILE}/${id}`}>
      <Card className="relative border-2 bg-muted">
        <CardHeader>
          <div className="flex items-center gap-4">
            <Avvvatars value={name} size={42} style="character" radius={8} />

            <div>
              <TypographyH4 className="text-secondary">{name}</TypographyH4>

              <TypographyMutedXS className="text-primary">
                {addressCountLabel}
              </TypographyMutedXS>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="flex gap-8 items-center">
            {addressesStats.map((data, index) => (
              <div key={index} className="flex items-center gap-2">
                <data.icon size={16} className="text-secondary" />

                <TypographySmall>
                  <span className="text-muted-foreground">{data.label}:</span>{' '}
                  {data.count}
                </TypographySmall>
              </div>
            ))}
          </div>
        </CardContent>

        <ChevronRight
          size={24}
          className="absolute top-[calc(50%-12px)] right-2 text-secondary"
        />
      </Card>
    </Link>
  );
};

export default ProfileCard;
