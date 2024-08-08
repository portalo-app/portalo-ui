import { Button } from '@core/ui/Button';
import { Separator } from '@core/ui/Separator';
import { FC, ReactElement } from 'react';

interface PlainCardProps {
  content: ReactElement;
  title: ReactElement;
  titleIcon: ReactElement;
  ctaTitle?: string;
  ctaIcon?: ReactElement;
  onCtaClick?: () => void;
  hideSeparator?: boolean;
}

const PlainCard: FC<PlainCardProps> = ({
  content,
  title,
  titleIcon,
  ctaTitle,
  ctaIcon,
  onCtaClick,
  hideSeparator,
}) => {
  return (
    <div className="space-y-2">
      {hideSeparator ? <></> : <Separator />}

      <div className="flex justify-between items-center w-full">
        <div className="flex items-center gap-2">
          {titleIcon} {title}
        </div>

        {ctaTitle ? (
          <Button
            variant="ghost"
            className="text-muted-foreground flex gap-2 items-center p-0 hover:bg-transparent"
            onClick={onCtaClick}
          >
            {ctaTitle} {ctaIcon}
          </Button>
        ) : (
          <></>
        )}
      </div>

      {content}
    </div>
  );
};

export default PlainCard;
