import { Folder } from '@models/business/folder';
import { FolderFile } from '@models/business/folderFile';
import { Profile } from '@models/business/profile';
import { FileDTO } from '@models/dto/file.dto';
import { FolderDTO } from '@models/dto/folder.dto';
import { ProfileDTO } from '@models/dto/profile.dto';

//Profile mapper

export const mapProfileDtoToProfileModel = (
  profileDTO: ProfileDTO[]
): Profile[] => {
  return profileDTO.map((profileDTO: ProfileDTO) => ({
    id: profileDTO.id,
    name: profileDTO.name,
    folders: profileDTO.folders.map(mapFolderDtoToFolderModel),
  }));
};

//Folder mapper
export const mapFolderDtoToFolderIU = (FolderDTO: FolderDTO): Folder => {
  const { id, folderTypeId, files } = FolderDTO;

  return {
    id: id,
    folderTypeId: folderTypeId,
    //! ToDo: Complete this
    files: files,
  };
};

export const mapFolderIUToFolderDTO = (UIDto: any): Folder => {
  return {
    id: UIDto.id,
    folderTypeId: UIDto.folderType.id,
    //! ToDo: Complete this
    filesDTO: [],
  };
};

//File mapper

export const mapFileDtoToFolderFileModel = (fileDTO: FileDTO): FolderFile => {
  return {
    id: fileDTO.id,
    entity: file,
  };
};

// export const mapProfilesModelToProfileDto = (profiles: Profile[]): Profile[] => {
//     return profiles.map((profile) => {
//       id: profile.id,
//       folders: [
//         {
//           profile.
//         }
//       ]
//     })

// }

/* export const mapFciRateDtoToFciRate = (
    fciRatesDTO: FciRateDto[]
  ): FciRate[] => {
    return fciRatesDTO.map((fciRateDTO: FciRateDto) => ({
      key: fciRateDTO.fci_id,
      tna: fciRateDTO.tna,
      limit: fciRateDTO.limit,
      fci: fciRateDTO.fci_info[0].fci_name,
      name: fciRateDTO.fci_info[0].fci_company_name,
    }));
  }; */
