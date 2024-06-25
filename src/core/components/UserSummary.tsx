'use client';

import { TypographyLead, TypographySmall } from '@core/ui/Typography';
import { profilesState } from '@states/profiles.atom';
import Avvvatars from 'avvvatars-react';
import { useRecoilValue } from 'recoil';

const UserSummary = () => {
  const profiles = useRecoilValue(profilesState);

  const welcomeMessage = 'Hi anon! 👋🏻';
  const profilesCount = profiles?.length || 0;

  const profilesCountMessage = `${profilesCount} profile${
    profilesCount > 1 ? 's' : ''
  }`;

  const emptyMessage = 'No profiles yet';

  return (
    <div className="my-3 px-4">
      <div className="flex flex-row content-center gap-3 ">
        <Avvvatars value={profiles.toString()} size={48} style="shape" />

        <div>
          <TypographyLead>{welcomeMessage}</TypographyLead>

          <TypographySmall className="text-primary">
            {profilesCount ? profilesCountMessage : emptyMessage}
          </TypographySmall>
        </div>
      </div>
    </div>
  );
};

export default UserSummary;
