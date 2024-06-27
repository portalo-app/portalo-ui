import { FileDetailData } from '@components/files/FileDetail';
import { Entity, FolderFile } from '@models/business/file';

export class SocialFile implements FolderFile {
  id: string;
  entity: Entity;
  private address: string;
  private name: string;
  private alias: string;
  private notes: string;

  constructor(
    id: string,
    entity: Entity,
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
  }

  getFileDetail(): FileDetailData {
    return {
      title: this.name,
      entity: this.entity,
      QRInfo: this.address,
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
