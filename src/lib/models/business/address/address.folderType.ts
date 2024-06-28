import { FolderType } from '@models/business/folder';

export class AddressFolderType implements FolderType {
  id: string;
  label: string;

  constructor() {
    this.id = 'address';
    this.label = 'Address';
  }
}
