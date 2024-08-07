import { Button } from '@core/ui/Button';
import { Separator } from '@core/ui/Separator';
import { TypographyH5 } from '@core/ui/Typography';
import { FC, ReactElement } from 'react';

interface PlainCardWithSeparatorProps {
  content: ReactElement;
  title: string;
  titleIcon: ReactElement;
  ctaTitle?: string;
  ctaIcon?: ReactElement;
  onCtaClick?: () => void;
}

const PlainCardWithSeparator: FC<PlainCardWithSeparatorProps> = ({
  content,
  title,
  titleIcon,
  ctaTitle,
  ctaIcon,
  onCtaClick,
}) => {
  return (
    <div className="space-y-2">
      <Separator />

      <div className="mx-2 flex justify-between items-center w-full">
        <TypographyH5 className="flex items-center gap-2">
          {titleIcon} {title}
        </TypographyH5>

        {ctaTitle ? (
          <Button
            variant="ghost"
            className="text-muted-foreground flex gap-2 items-center"
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

export default PlainCardWithSeparator;
