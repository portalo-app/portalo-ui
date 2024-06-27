export interface FolderFile {
  id: string;
  entity: Entity;
  // getFileDetail(): FileDetailData;
}

export interface Entity {
  color: string;
  icon: string;
  value: string;
  label: string;
  validationRegex: RegExp;
}

export interface FileVariant {
  id: string;
  label: string;
  entityLabel: string;
  availableEntities: Entity[];
}
