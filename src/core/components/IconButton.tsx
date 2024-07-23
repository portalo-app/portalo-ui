import { Button, ButtonProps } from '@core/ui/Button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@core/ui/Tooltip';
import { motion } from 'framer-motion';

interface IconButtonProps {
  disabledTooltip?: string;
  onClick: () => void;
  icon: React.ReactNode;
}

const IconButton: React.FC<IconButtonProps & ButtonProps> = ({
  disabled,
  disabledTooltip,
  onClick,
  icon,
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
          <ButtonContainer>
            <Button
              size="sm"
              className="rounded-full bg-primary "
              disabled={disabled}
              onClick={onClick}
            >
              {icon}
            </Button>
          </ButtonContainer>
        </TooltipTrigger>

        {disabled && disabledTooltip && (
          <TooltipContent>{disabledTooltip}</TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  );
};

export default IconButton;
