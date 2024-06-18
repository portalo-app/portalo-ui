import Image from 'next/image';

interface AppLogoProps {
  theme: string | undefined;
}

const AppLogo: React.FC<AppLogoProps> = ({ theme }) => {
  const logoSrc =
    theme === 'dark'
      ? '/assets/images/portalo_dark.svg'
      : '/assets/images/portalo_light.svg';

  return <Image priority src={logoSrc} alt="Portalo" width={120} height={30} />;
};

export default AppLogo;
