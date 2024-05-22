import { ROUTES } from '@constants/routes.const';
import { Avatar } from '@core/ui/Avatar';
import { TypographyH4, TypographyMuted } from '@core/ui/Typography';
import { Space, Vault } from '@models/space';
import { ChevronRight, Wallet } from 'lucide-react';
import Link from 'next/link';

interface ShortcutItemProps {
  space: Space;
  vault: Vault<any>;
}

const ShortcutItem: React.FC<ShortcutItemProps> = ({ space, vault }) => {
  // const Icon = vault.type.icon as LucideIcon;

  if (!space || !vault) return null;

  return (
    <Link
      href={`${ROUTES.APP_SPACE}/${space?.id}/${ROUTES.APP_VAULT}/${vault?.id}`}
    >
      <div className="py-4 relative">
        <div className="flex items-center gap-4">
          <Avatar className="bg-muted grid place-items-center w-[42px] h-[42px]">
            <Wallet className="text-muted-foreground" />
          </Avatar>

          <div>
            <TypographyMuted>{space.name}</TypographyMuted>

            <TypographyH4>{vault.type.label}</TypographyH4>
          </div>
        </div>

        <ChevronRight
          size={24}
          className="absolute top-[calc(50%-12px)] right-2 text-muted-foreground"
        />
      </div>
    </Link>
  );
};

export default ShortcutItem;
