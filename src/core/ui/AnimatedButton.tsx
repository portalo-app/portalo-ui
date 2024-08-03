import { motion } from 'framer-motion';
import React from 'react';
import { Button, ButtonProps } from './Button';

interface AnimatedButtonProps extends ButtonProps {
  children: React.ReactNode;
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  children,
  ...props
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="w-full"
    >
      <Button {...props}>{children}</Button>
    </motion.div>
  );
};

export default AnimatedButton;
