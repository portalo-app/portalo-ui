'use client';

import { usePortaloTheme } from '@hooks/general/usePortaloTheme';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface AppLogoProps {
  width: number;
  height: number;
}

const AppLogo: React.FC<AppLogoProps> = ({ width, height }) => {
  const { theme } = usePortaloTheme();

  const logoSrc =
    theme === 'dark'
      ? '/assets/images/portalo_dark.svg'
      : '/assets/images/portalo_light.svg';

  return (
    <motion.div
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ ease: 'easeOut', duration: 0.5 }}
    >
      <Image
        priority
        src={logoSrc}
        alt="Portalo"
        width={width}
        height={height}
      />
    </motion.div>
  );
};

export default AppLogo;
