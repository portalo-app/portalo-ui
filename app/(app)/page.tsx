'use client';

import PageLayout from '@components/layout/PageLayout';
import ProfileCard from '@components/profiles/ProfileCard';
import { ROUTES } from '@constants/routes.const';
import State from '@core/components/State';
import { Button } from '@core/ui/Button';
import { Profile } from '@models/profile';
import { profilesState } from '@states/profiles.atom';
import { useRouter } from 'next/navigation';
import { FunctionComponent, useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

interface AppPageProps {}

const AppPage: FunctionComponent<AppPageProps> = () => {
  const profilesTitle = 'Profiles';
  const emptyMessage = "You don't have any profiles yet";
  const createProfileLabel = 'Create Profile';
  const profilesData = useRecoilValue(profilesState);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const router = useRouter();

  useEffect(() => {
    setProfiles(profilesData);
  }, [profilesData]);

  const hasProfiles = profiles?.length > 0;

  const handleCreateProfile = () => {
    router.push(ROUTES.APP_CREATE_PROFILE);
  };

  return (
    <PageLayout title={profilesTitle}>
      {!hasProfiles && (
        <div className="flex content-center justify-center mt-8">
          <State type="info" size={100} label={emptyMessage} />
        </div>
      )}

      {hasProfiles && (
        <div className="space-y-4 *:block">
          {profiles.map((profile, index) => (
            <ProfileCard profile={profile} key={index} />
          ))}
        </div>
      )}

      <Button onClick={handleCreateProfile} className="w-full mt-4">
        {createProfileLabel}
      </Button>
    </PageLayout>
  );
};

export default AppPage;
