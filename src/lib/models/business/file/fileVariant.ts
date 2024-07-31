export interface FileVariant {
  id: string;
  label: string;
  entityLabel: string;
  availableEntities: FileVariantEntity[];
}

export interface FileVariantEntity {
  id: string;
  color: string;
  icon: string;
  iconIsUrl?: boolean;
  label: string;
  shareUrl: string;
}
