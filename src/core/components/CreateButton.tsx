import { Button, ButtonProps } from '@core/ui/Button';
import { Plus } from 'lucide-react';
import Link from 'next/link';

interface CreateButtonProps {
  href: string;
  title?: string;
}

const CreateButton: React.FC<CreateButtonProps & ButtonProps> = ({
  href,
  title,
  disabled,
}) => {
  const label = title || 'Create';

  return (
    <Link href={href} aria-disabled={disabled}>
      <Button
        variant="outline"
        size="sm"
        className="flex items-center"
        disabled={disabled}
      >
        <Plus size={16} className="mr-1" />

        {label}
      </Button>
    </Link>
  );
};

export default CreateButton;
