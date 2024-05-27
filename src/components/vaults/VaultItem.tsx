import { ROUTES } from '@constants/routes.const';
import { Space, Vault } from '@models/space';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import VaultTitle from './VaultTitle';

interface VaultItemProps {
  space: Space;
  vault: Vault<any>;
}

const VaultItem: React.FC<VaultItemProps> = ({ space, vault }) => {
  // TODO: Define an icon directory to better fetch the icon.
  // const Icon = vault.type.icon as LucideIcon;

  if (!space || !vault) return null;

  return (
    <Link
      href={`${ROUTES.APP_SPACE}/${space?.id}/${ROUTES.APP_VAULT}/${vault?.id}`}
    >
      <div className="py-4 relative">
        <VaultTitle space={space} vault={vault} />

        <ChevronRight
          size={24}
          className="absolute top-[calc(50%-12px)] right-2 text-muted-foreground"
        />
      </div>
    </Link>
  );
};

export default VaultItem;
