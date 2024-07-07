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
