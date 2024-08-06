'use client';

import { RECOMMENDED_PROFILES } from '@constants/recommendations.const';
import { ROUTES } from '@constants/routes.const';
import AvatarCard from '@core/components/AvatarCard';
import { Button } from '@core/ui/Button';
import { Carousel, CarouselContent } from '@core/ui/Carousel';
import { Separator } from '@core/ui/Separator';
import { TypographyH5 } from '@core/ui/Typography';
import { ProfileDTO } from '@models/dto/profile.dto';
import { ChevronRight, ThumbsUp } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { FC } from 'react';

const Recommendations: FC<unknown> = () => {
  const router = useRouter();

  return (
    <>
      <Separator />

      <div className="mx-2 flex justify-between items-center w-full">
        <TypographyH5 className="flex items-center gap-2">
          <ThumbsUp size={20} /> Recommendations
        </TypographyH5>

        <Button
          variant="ghost"
          className="text-muted-foreground flex gap-2 items-center"
        >
          View All <ChevronRight />
        </Button>
      </div>

      <Carousel>
        <CarouselContent className="ml-0">
          {RECOMMENDED_PROFILES.map((profile: ProfileDTO, index: number) => (
            <AvatarCard
              title={profile.name}
              description={profile.description || ''}
              iconUrl={profile.icon}
              className="basis-2/3"
              key={index}
              onClick={() => {
                router.push(`${ROUTES.APP_PROFILE}/${profile.id}`);
              }}
            />
          ))}
        </CarouselContent>
      </Carousel>
    </>
  );
};

export default Recommendations;
