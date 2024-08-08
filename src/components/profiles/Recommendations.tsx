'use client';

import { RECOMMENDED_PROFILES } from '@constants/recommendations.const';
import { ROUTES } from '@constants/routes.const';
import AvatarCard from '@core/components/AvatarCard';
import PlainCard from '@core/components/PlainCard';
import { CarouselItem, FullWidthCarousel } from '@core/ui/Carousel';
import { TypographyH5 } from '@core/ui/Typography';
import { ProfileDTO } from '@models/dto/profile.dto';
import { cn } from '@utils/utils';
import { ThumbsUp } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { FC } from 'react';

const Recommendations: FC<unknown> = () => {
  const router = useRouter();

  return (
    <PlainCard
      title={<TypographyH5>Recommendations</TypographyH5>}
      titleIcon={<ThumbsUp size={20} />}
      content={
        <FullWidthCarousel>
          {RECOMMENDED_PROFILES.map((profile: ProfileDTO, index: number) => (
            <CarouselItem
              className={cn(
                'basis-4/5 lg:basis-2/3',
                RECOMMENDED_PROFILES.length - 1 === index && 'pr-4'
              )}
              key={index}
            >
              <AvatarCard
                title={profile.name}
                description={profile.description || ''}
                iconUrl={profile.icon}
                className="h-full cursor-pointer"
                onClick={() => {
                  router.push(
                    `${ROUTES.APP_PROFILE}/share?recommendation=${profile.id}`
                  );
                }}
              />
            </CarouselItem>
          ))}
        </FullWidthCarousel>
      }
    />
  );
};

export default Recommendations;
