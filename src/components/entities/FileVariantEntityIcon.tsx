import { FileVariantEntity } from '@models/business/file/fileVariant';
import Image from 'next/image';

interface FileVariantEntityIconProps {
  entity: FileVariantEntity;
}

const FileVariantEntityIcon: React.FC<FileVariantEntityIconProps> = ({
  entity: { icon, id },
}) => {
  return (
    <Image
      src={`/assets/icons/${icon}`}
      alt={`${id} logo`}
      width={35}
      height={35}
    />
  );
};

export default FileVariantEntityIcon;
