'use client';

import { RECOMMENDED_PROFILES } from '@constants/recommendations.const';
import { ROUTES } from '@constants/routes.const';
import AvatarCard from '@core/components/AvatarCard';
import PlainCard from '@core/components/PlainCard';
import { Carousel, CarouselContent, CarouselItem } from '@core/ui/Carousel';
import { TypographyH5 } from '@core/ui/Typography';
import { ProfileDTO } from '@models/dto/profile.dto';
import { sharedProfileState } from '@states/sharedProfile.atom';
import { ThumbsUp } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { FC } from 'react';
import { useSetRecoilState } from 'recoil';

const Recommendations: FC<unknown> = () => {
  const router = useRouter();
  const setSharedProfile = useSetRecoilState(sharedProfileState);

  return (
    <PlainCard
      title={<TypographyH5>Recommendations</TypographyH5>}
      titleIcon={<ThumbsUp size={20} />}
      content={
        <Carousel>
          <CarouselContent>
            {RECOMMENDED_PROFILES.map((profile: ProfileDTO, index: number) => (
              <CarouselItem className="basis-4/5 lg:basis-2/3 " key={index}>
                <AvatarCard
                  title={profile.name}
                  description={profile.description || ''}
                  iconUrl={profile.icon}
                  className="h-full"
                  onClick={() => {
                    router.push(
                      `${ROUTES.APP_PROFILE}/share?recommendation=${profile.id}`
                    );
                  }}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      }
    />
  );
};

export default Recommendations;
