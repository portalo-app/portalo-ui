import { FileDetailData } from '@components/files/FileDetail';
import { Tag } from '@models/business/profile';
import { Entity, FolderFile } from '../business/file';

export class BankAddressFile implements FolderFile {
  id: string;
  entity: Entity;
  tags: Tag[];
  private address: string;
  private name: string;
  private alias: string;
  private notes: string;

  constructor(
    id: string,
    entity: Entity,
    tags: Tag[],
    address: string,
    name: string,
    alias: string,
    notes: string
  ) {
    this.address = address;
    this.name = name;
    this.alias = alias;
    this.notes = notes;
    this.id = id;
    this.entity = entity;
    this.tags = tags;
  }

  getFileDetail(): FileDetailData {
    return {
      title: this.name,
      entity: this.entity,
      QRInfo: this.address,
      tags: this.tags,
      dataPoints: [
        {
          key: 'Alias',
          value: this.alias,
        },
        {
          key: 'Notes',
          value: this.notes,
        },
      ],
    };
  }
}
