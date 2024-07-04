import { FileType } from '../file/fileType';

export interface FolderType {
  id: string;
  label: string;
  fileType: FileType;
}

/* Component side

1- The zod model should be dynamic. It will depend on the folder type.
2- The inputs should be drawn based on the folder type datapoints.
(Mapper side) 3- The file values should be converted to a key-value schema for the DTO.
4- When a user wants to edit a file, the stringified file data should be parsed and the inputs filled.

*/
