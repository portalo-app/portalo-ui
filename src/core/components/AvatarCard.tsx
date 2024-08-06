import { Card } from '@core/ui/Card';
import { TypographyH4, TypographyMuted } from '@core/ui/Typography';
import { cn } from '@utils/utils';
import Avvvatars from 'avvvatars-react';
import Image from 'next/image';
import { FC } from 'react';

interface AvatarCardProps {
  title: string;
  description: string;
  iconUrl?: string;
  className?: string;
  onClick?: () => void;
}

const AvatarCard: FC<AvatarCardProps> = ({
  title,
  description,
  iconUrl,
  className,
  onClick,
}) => {
  return (
    <Card
      className={cn(
        'flex gap-2 rounded-xl max-w-full items-center px-2 py-3 ',
        className
      )}
      onClick={onClick}
    >
      <div className="min-w-fit">
        {iconUrl ? (
          <Image src={iconUrl} alt={`${title} logo`} width={48} height={48} />
        ) : (
          <Avvvatars size={48} value={title} />
        )}
      </div>

      <div>
        <TypographyH4>{title}</TypographyH4>
        <TypographyMuted>{description}</TypographyMuted>
      </div>
    </Card>
  );
};
export default AvatarCard;
