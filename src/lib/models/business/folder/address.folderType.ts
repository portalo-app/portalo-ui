import { IconType } from '@core/ui/Icon';
import { AddressFileType } from '../file/address.fileType';
import { FileType } from '../file/fileType';
import { FolderType } from './folderType';

export class AddressFolderType implements FolderType {
  id: string;
  label: string;
  fileType: FileType;
  icon: IconType;

  constructor() {
    this.id = 'address';
    this.label = 'Address';
    this.fileType = new AddressFileType();
    this.icon = 'Wallet';
  }
}
