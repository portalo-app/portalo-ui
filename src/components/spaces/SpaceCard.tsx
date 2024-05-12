import { ROUTES } from '@constants/routes.const';
import { TypographyH4, TypographyMutedXS } from '@core/ui/Typography';
import { Space } from '@models/space';
import Avvvatars from 'avvvatars-react';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface SpaceCardProps {
  space: Space;
}

const SpaceCard: React.FC<SpaceCardProps> = ({ space }) => {
  const { id, name, cryptoAddresses, fiatAddresses } = space;

  const addressCount = cryptoAddresses.length + fiatAddresses.length;
  const addressCountLabel = `${addressCount} address${
    addressCount > 1 ? 'es' : ''
  }`;

  // const addressesStats = [
  //   {
  //     icon: Coins,
  //     label: 'Crypto',
  //     count: cryptoAddresses.length,
  //   },
  //   {
  //     icon: Landmark,
  //     label: 'Fiat',
  //     count: fiatAddresses.length,
  //   },
  // ];

  return (
    <Link href={`${ROUTES.APP_SPACE}/${id}`}>
      <div className="relative py-4">
        <div className="flex items-center gap-4">
          <Avvvatars value={name} size={42} style="character" radius={8} />

          <div>
            <TypographyH4>{name}</TypographyH4>

            <TypographyMutedXS className="text-primary">
              {addressCountLabel}
            </TypographyMutedXS>
          </div>
        </div>

        {/* <CardContent>
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
        </CardContent> */}

        <ChevronRight
          size={24}
          className="absolute top-[calc(50%-12px)] right-2 text-secondary"
        />
      </div>
    </Link>
  );
};

export default SpaceCard;
