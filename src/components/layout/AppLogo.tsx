import Image from 'next/image';

interface AppLogoProps {}

const AppLogo: React.FC<AppLogoProps> = () => {
  return (
    <Image
      priority
      src="/portalo_dark.svg"
      alt="Portalo"
      width={90}
      height={30}
    />
  );
};

export default AppLogo;
