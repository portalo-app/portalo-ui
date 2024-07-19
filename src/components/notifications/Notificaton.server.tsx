import { TypographyLarge } from '@core/ui/Typography';
import { FC } from 'react';

const Notifications: FC = () => {
  return (
    <div className="md:mt-4 ">
      <TypographyLarge className="border-b p-2 text-center">
        No notifications
      </TypographyLarge>
    </div>
  );
};

export default Notifications;
