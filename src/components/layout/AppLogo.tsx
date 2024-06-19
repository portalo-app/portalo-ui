import { usePortaloTheme } from '@hooks/general/usePortaloTheme';
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
    <Image priority src={logoSrc} alt="Portalo" width={width} height={height} />
  );
};

export default AppLogo;
