import { LucideProps, icons } from 'lucide-react';

export type IconType = keyof typeof icons;

interface IconProps extends LucideProps {
  name: IconType;
}

const Icon = ({ name, ...props }: IconProps) => {
  const LucideIcon = icons[name];

  return <LucideIcon {...props} />;
};

export default Icon;
