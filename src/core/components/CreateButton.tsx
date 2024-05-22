import { Button } from '@core/ui/Button';
import { Plus } from 'lucide-react';
import Link from 'next/link';

interface CreateButtonProps {
  href: string;
}

const CreateButton: React.FC<CreateButtonProps> = ({ href }) => {
  const label = 'Create';

  return (
    <Link href={href}>
      <Button variant="outline" size="sm" className="flex items-center">
        <Plus size={16} className="mr-1" />

        {label}
      </Button>
    </Link>
  );
};

export default CreateButton;
