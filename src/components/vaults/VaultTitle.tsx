import { Avatar } from '@core/ui/Avatar';
import { TypographyH4, TypographyMuted } from '@core/ui/Typography';
import { Space, Vault } from '@models/space';
import { Wallet } from 'lucide-react';

interface VaultTitleProps {
  space: Space;
  vault: Vault<any>;
}

const VaultTitle: React.FC<VaultTitleProps> = ({ space, vault }) => {
  if (!space || !vault) return null;

  return (
    <div className="flex items-center gap-4">
      <Avatar className="bg-muted grid place-items-center w-[42px] h-[42px]">
        <Wallet className="text-muted-foreground" />
      </Avatar>

      <div>
        <TypographyMuted>{space.name}</TypographyMuted>

        <TypographyH4>{vault.type.label}</TypographyH4>
      </div>
    </div>
  );
};

export default VaultTitle;
