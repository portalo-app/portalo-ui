import { Card } from '@core/ui/Card';
import { TypographyH5 } from '@core/ui/Typography';
import { ReactElement } from 'react';
import CreateButton from './CreateButton';

interface HomeCardProps {
  title: string;
  icon: ReactElement;
  hasData: boolean;
  listToShow: ReactElement;
  stateComponent: ReactElement;
  href: string;
}

const HomeCard: React.FC<HomeCardProps> = ({
  title,
  icon,
  hasData,
  listToShow,
  stateComponent,
  href,
}) => (
  <Card className="!mt-10">
    <div className="flex justify-between items-center py-2 px-4 bg-muted rounded-t-md">
      <div className="flex items-center gap-2 text-muted-foreground">
        {icon}

        <TypographyH5>{title}</TypographyH5>
      </div>

      {hasData && href && <CreateButton href={href} title="Add" />}
    </div>

    {hasData ? (
      <div className="divide-y-2 *:block py-2 px-4">{listToShow}</div>
    ) : (
      <div className="flex content-center justify-center bg-muted rounded-b-xl">
        {stateComponent}
      </div>
    )}
  </Card>
);

export default HomeCard;
