import { Button, ButtonProps } from '@core/ui/Button';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import Link from 'next/link';

interface CreateButtonProps {
  href: string;
  title?: string;
}

const CreateButton: React.FC<CreateButtonProps & ButtonProps> = ({
  href,
  disabled,
}) => {
  return (
    <Link href={href} aria-disabled={disabled}>
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          size="sm"
          className="rounded-full bg-primary "
          disabled={disabled}
        >
          <Plus size={16} />
        </Button>
      </motion.div>
    </Link>
  );
};

export default CreateButton;
