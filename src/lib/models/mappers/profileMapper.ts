import { Profile } from '@models/business/profile';

// Profile UI to Storage
export const mapperProfileToProfileDTO = (profiles: Profile[]) => {
  return profiles.map((profile) => ({
    id: profile.id,
    name: profile.name,
    folders: profile.folders.map((folder) => {
      return {
        id: folder.id,
        folderTypeId: folder.folderType,
        files: folder.files.map((file) => {
          return file.id;
        }),
      };
    }),
  }));
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
