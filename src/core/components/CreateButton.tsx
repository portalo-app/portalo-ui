import { Button, ButtonProps } from '@core/ui/Button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@core/ui/Tooltip';
import { cn } from '@utils/utils';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import Link from 'next/link';

interface CreateButtonProps {
  href: string;
  disabledTooltip?: string;
}

const CreateButton: React.FC<CreateButtonProps & ButtonProps> = ({
  href,
  disabled,
  disabledTooltip,
}) => {
  const ButtonContainer = ({ children }: { children: React.ReactNode }) =>
    disabled ? (
      <div>{children}</div>
    ) : (
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        {children}
      </motion.div>
    );

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Link
            className={cn(disabled && 'cursor-not-allowed')}
            href={disabled ? {} : href}
            aria-disabled={disabled}
          >
            <ButtonContainer>
              <Button
                size="sm"
                className="rounded-full bg-primary "
                disabled={disabled}
              >
                <Plus size={16} />
              </Button>
            </ButtonContainer>
          </Link>
        </TooltipTrigger>

        {disabled && disabledTooltip && (
          <TooltipContent>{disabledTooltip}</TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  );
};

export default CreateButton;
