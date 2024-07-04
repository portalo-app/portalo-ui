import { AddressFileType } from '../file/address.fileType';
import { FileType } from '../file/fileType';
import { FolderType } from './folderType';

export class AddressFolderType implements FolderType {
  id: string;
  label: string;
  fileType: FileType;

  constructor() {
    this.id = 'address';
    this.label = 'Address';
    this.fileType = new AddressFileType();
  }
}
