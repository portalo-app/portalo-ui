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
  return (
    <Image
      src={`${iconIsUrl ? '' : '/assets/icons/'}${icon}`}
      alt={`${id} logo`}
      width={size}
      height={size}
    />
  );
};

export default FileVariantEntityIcon;
