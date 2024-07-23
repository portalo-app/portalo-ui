import { IconType } from '@core/ui/Icon';
import { AddressFileType } from '../file/address.fileType';
import { FileType } from '../file/fileType';
import { FolderType, FolderTypeEnum } from './folderType';

export class AddressFolderType implements FolderType {
  id: FolderTypeEnum;
  label: string;
  fileType: FileType;
  icon: IconType;

  constructor() {
    this.id = FolderTypeEnum.Address;
    this.label = 'Address';
    this.fileType = new AddressFileType();
    this.icon = 'Wallet';
  }
}
