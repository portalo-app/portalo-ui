import Image from 'next/image';

interface AppLogoProps {
  theme: string | undefined;
}

const AppLogo: React.FC<AppLogoProps> = ({ theme }) => {
  const logoSrc =
    theme === 'light'
      ? '/assets/images/portalo_light2.svg'
      : '/assets/images/portalo_dark.svg';

  return <Image priority src={logoSrc} alt="Portalo" width={120} height={30} />;
};

export default AppLogo;
