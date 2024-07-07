export interface FileDTO {
  id: string;
  data: FileDataDTO;
}

export type FileDataDTO = FileMainDataDTO & { [key: string]: any };

interface FileMainDataDTO {
  variant: string;
  entity: string;
}
