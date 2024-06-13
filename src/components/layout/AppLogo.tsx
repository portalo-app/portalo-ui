import Image from 'next/image';

interface AppLogoProps {
  width: number;
  height: number;
}

const AppLogo: React.FC<AppLogoProps> = ({ width, height }) => {
  return (
    <Image
      priority
      src="/portalo_dark.svg"
      alt="Portalo"
      width={width}
      height={height}
    />
  );
};

export default AppLogo;
