import { usePortaloTheme } from '@hooks/general/usePortaloTheme';
import Image from 'next/image';

const AppLogo = () => {
  const { theme } = usePortaloTheme();

  const logoSrc =
    theme === 'dark'
      ? '/assets/images/portalo_dark.svg'
      : '/assets/images/portalo_light.svg';

  return <Image priority src={logoSrc} alt="Portalo" width={120} height={30} />;
};

export default AppLogo;
