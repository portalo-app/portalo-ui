'use client';

import { ROUTES } from '@constants/routes.const';
import PlainCard from '@core/components/PlainCard';
import State from '@core/components/State';
import { CarouselItem, FullWidthCarousel } from '@core/ui/Carousel';
import { TypographyH5 } from '@core/ui/Typography';
import { profilesState } from '@states/profiles.atom';
import { Plus, UserRound } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useRecoilValue } from 'recoil';
import ProfileItem from './ProfileItem';

const ProfileWidget = () => {
  const router = useRouter();

  const profiles = useRecoilValue(profilesState);

  const hasProfiles = profiles?.length > 0;

  const profilesTitle = 'Profiles';
  const emptyProfilesMessage = 'Create a Profile to get started!';

  return (
    <PlainCard
      title={<TypographyH5> {profilesTitle}</TypographyH5>}
      titleIcon={<UserRound />}
      hideSeparator
      ctaTitle="Add Profile"
      ctaIcon={<Plus />}
      onCtaClick={() => router.push(ROUTES.APP_CREATE_PROFILE)}
      content={
        hasProfiles ? (
          <FullWidthCarousel>
            {profiles.map((profile, index) => (
              <CarouselItem className="basis-4/9" key={index}>
                <ProfileItem profile={profile} />
              </CarouselItem>
            ))}
          </FullWidthCarousel>
        ) : (
          <State
            type="empty"
            label={emptyProfilesMessage}
            action={{
              label: 'Create Profile',
              onClick: () => router.push(ROUTES.APP_CREATE_PROFILE),
            }}
          />
        )
      }
    />
  );
};
export default ProfileWidget;
