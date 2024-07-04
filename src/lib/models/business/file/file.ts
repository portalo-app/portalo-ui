export interface File {
  id: string;
  data: any;
  // entity: FileVariantEntity;
  // type: FileType;

  // ToDo: I think this should be in FileType, because it depends on the type strategy.
  // getFileDetail(): FileDetailData;
}
