'use client';

import { RECOMMENDED_PROFILES } from '@constants/recommendations.const';
import { ROUTES } from '@constants/routes.const';
import AvatarCard from '@core/components/AvatarCard';
import PlainCardWithSeparator from '@core/components/PlainCard';
import { Carousel, CarouselContent, CarouselItem } from '@core/ui/Carousel';
import { ProfileDTO } from '@models/dto/profile.dto';
import { sharedProfileState } from '@states/sharedProfile.atom';
import { ChevronRight, ThumbsUp } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { FC } from 'react';
import { useSetRecoilState } from 'recoil';

const Recommendations: FC<unknown> = () => {
  const router = useRouter();
  const setSharedProfile = useSetRecoilState(sharedProfileState);

  return (
    <PlainCardWithSeparator
      title="Recommendations"
      titleIcon={<ThumbsUp size={20} />}
      ctaTitle="View All"
      ctaIcon={<ChevronRight />}
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
                    setSharedProfile(profile);
                    router.push(`${ROUTES.APP_PROFILE}/share?recommendation`);
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
