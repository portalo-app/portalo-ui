'use client';

import { ROUTES } from '@constants/routes.const';
import PlainCardWithSeparator from '@core/components/PlainCardWithSeparator';
import State from '@core/components/State';
import { profilesState } from '@states/profiles.atom';
import { ChevronRight, UserRound } from 'lucide-react';
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
    <PlainCardWithSeparator
      title={profilesTitle}
      titleIcon={<UserRound />}
      ctaTitle="Create Profile"
      ctaIcon={<ChevronRight />}
      onCtaClick={() => router.push(ROUTES.APP_CREATE_PROFILE)}
      content={
        hasProfiles ? (
          <>
            {profiles.map((profile, index) => (
              <ProfileItem profile={profile} key={index} />
            ))}
          </>
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
