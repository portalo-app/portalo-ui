import PageLayout from '@/components/layout/PageLayout';
import ProfileCard from '@/components/profiles/ProfileCard';
import State from '@/core/components/State';
import { Button } from '@/core/ui/Button';
import { ROUTES } from '@/lib/constants/routes.const';
import { Profile } from '@/lib/model/profile';
import { profilesState } from '@/lib/store/profiles.atom';
import { useRouter } from 'next/router';
import { FunctionComponent, useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

interface AppPageProps {}

const AppPage: FunctionComponent<AppPageProps> = () => {
  const profilesTitle = 'Profiles';
  const emptyMessage = "You don't have any profiles yet";
  const createProfileTitle = 'Create Profile';
  const profilesData = useRecoilValue(profilesState);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const router = useRouter();

  useEffect(() => {
    setProfiles(profilesData);
  }, [profilesData]);

  const hasProfiles = profiles && profiles.length > 0;

  const handleCreateProfile = () => {
    router.push(ROUTES.APP_CREATE_PROFILE);
  };

  return (
    <PageLayout title={profilesTitle}>
      <div className="flex content-center justify-center">
        {!hasProfiles && <State type="info" size={100} label={emptyMessage} />}
      </div>

      {hasProfiles && (
        <div>
          {profiles.map((profile, index) => (
            <ProfileCard profile={profile} key={index} />
          ))}
        </div>
      )}
      <div className="flex content-center justify-center pt-4">
        <Button
          onClick={handleCreateProfile}
          className="w-[250px] rounded-3xl h-12 hover:text-primary hover:bg-foreground hover:border-2 hover:border-primary ease-in duration-200"
        >
          {createProfileTitle}
        </Button>
      </div>
    </PageLayout>
  );
};

export default AppPage;
