import { ROUTES } from '@constants/routes.const';
import { TypographyH4, TypographyMutedXS } from '@core/ui/Typography';
import { Space } from '@models/space';
import Avvvatars from 'avvvatars-react';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface SpaceItemProps {
  space: Space;
}

const SpaceItem: React.FC<SpaceItemProps> = ({ space }) => {
  const { id, name, folders } = space;

  const count = folders.length;
  const countLabel = `${count} active folder${count > 1 || count === 0 ? 's' : ''}`;

  return (
    <Link href={`${ROUTES.APP_SPACE}/${id}`}>
      <div className="relative py-4">
        <div className="flex items-center gap-4">
          <Avvvatars value={name} size={42} style="character" />

          <div>
            <TypographyH4>{name}</TypographyH4>

            <TypographyMutedXS className="text-primary">
              {countLabel}
            </TypographyMutedXS>
          </div>
        </div>

        <ChevronRight
          size={24}
          className="absolute top-[calc(50%-12px)] right-2 text-secondary"
        />
      </div>
    </Link>
  );
};

export default SpaceItem;
