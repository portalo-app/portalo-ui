'use client';

import { TypographyLead, TypographySmall } from '@core/ui/Typography';
import { spacesState } from '@states/spaces.atom';
import Avvvatars from 'avvvatars-react';
import { useRecoilValue } from 'recoil';

const UserSummary = () => {
  const spaces = useRecoilValue(spacesState);

  const welcomeMessage = 'Hi anon! 👋🏻';
  const spacesCount = spaces?.length || 0;

  const spacesCountMessage = `${spacesCount} space${
    spacesCount > 1 ? 's' : ''
  }`;

  const emptyMessage = 'No spaces yet';

  return (
    <div className="p-2 my-4">
      <div className="flex flex-row content-center gap-3">
        <Avvvatars value={spaces.toString()} size={48} style="shape" />

        <div>
          <TypographyLead>{welcomeMessage}</TypographyLead>

          <TypographySmall className="text-primary">
            {spacesCount ? spacesCountMessage : emptyMessage}
          </TypographySmall>
        </div>
      </div>
    </div>
  );
};

export default UserSummary;
