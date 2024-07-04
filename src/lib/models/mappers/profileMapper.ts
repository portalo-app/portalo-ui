import { Profile } from '@models/business/profile';
import { ProfileDTO } from '@models/dto/profile.dto';

// Profile UI to Storage
export const mapperProfileToProfileDTO = (profile: Profile): ProfileDTO => {
  return {
    id: profile.id,
    name: profile.name,
    folders: profile.folders.map((folder) => {
      return {
        id: folder.id,
        folderTypeId: folder.folderType.id,
        files: folder.files,
      };
    }),
  };
};

// JSON.stringify(mapperProfileToProfileDTO)

// // Folder UI to Storage
// export const mapperFolderToFolderDTO = (folders: Folder): FolderDTO => {
//   return {
//     id: folders.id,
//     folderTypeId: folders.folderType.id,
//     files: folders.files.map((file) => {
//       return {
//         file.id,

//       }
//     }),
//   };
// };

// File mapper

// export const mapperFileDtoToFolderFileModel = (
//   fileDTO: FileDTO
// ): FolderFile => {
//   return {
//     id: fileDTO.id,
//     entity: file,
//   };
// };
