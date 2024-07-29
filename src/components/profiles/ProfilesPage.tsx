'use client';

import { ROUTES } from '@constants/routes.const';
import HomeCard from '@core/components/HomeCard';
import State from '@core/components/State';
import { profilesState } from '@states/profiles.atom';
import { UserRound } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useRecoilValue } from 'recoil';
import ProfileItem from './ProfileItem';

const ProfilesPage = () => {
  const router = useRouter();

  const profiles = useRecoilValue(profilesState);

  const hasProfiles = profiles?.length > 0;

  const profilesTitle = 'Profiles';
  const emptyProfilesMessage = 'Create a Profile to get started!';

  return (
    <HomeCard
      title={profilesTitle}
      icon={<UserRound />}
      href={ROUTES.APP_CREATE_PROFILE}
      hasData={hasProfiles}
      listToShow={
        <>
          {profiles.map((profile, index) => (
            <ProfileItem profile={profile} key={index} />
          ))}
        </>
      }
      stateComponent={
        <State
          type="empty"
          label={emptyProfilesMessage}
          action={{
            label: '+ Create Profile',
            onClick: () => router.push(ROUTES.APP_CREATE_PROFILE),
          }}
        />
      }
    />
  );
};

export default ProfilesPage;
