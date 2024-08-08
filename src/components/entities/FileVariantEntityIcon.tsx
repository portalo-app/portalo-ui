import { FileVariantEntity } from '@models/business/file/fileVariant';
import Image from 'next/image';

interface FileVariantEntityIconProps {
  entity: FileVariantEntity;
  size?: number;
}

const FileVariantEntityIcon: React.FC<FileVariantEntityIconProps> = ({
  entity: { icon, id, iconIsUrl },
  size = 35,
}) => {
  const iconPrefix = iconIsUrl ? '' : '/assets/icons/';
  const iconURL = `${iconPrefix}${icon}`;

  return (
    <Image
      className="rounded-full"
      src={iconURL}
      alt={`${id} logo`}
      width={size}
      height={size}
    />
  );
};

export default FileVariantEntityIcon;
