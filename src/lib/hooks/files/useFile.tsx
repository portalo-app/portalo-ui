import useAnalytics from '@hooks/googleAnalytics/useAnalytics';
import {
  Datapoint,
  DatapointValidation,
} from '@models/business/file/datapoint/datapoint';
import { FileDTO } from '@models/dto/file.dto';
import { FolderDTO } from '@models/dto/folder.dto';
import { profilesState } from '@states/profiles.atom';
import { createMaxErrorMessage, createMinErrorMessage } from '@utils/formUtils';
import { useRecoilState } from 'recoil';
import z from 'zod';

const useFile = () => {
  const [profiles, setProfiles] = useRecoilState(profilesState);
  const { trackCreateFile, trackDeleteFile, trackEditFile } = useAnalytics();

  const generateZodFileSchema = (datapoints: Datapoint[]): z.ZodSchema => {
    // Shape are the form fields that will be rendered depending on the datapoints
    const shape: { [key: string]: z.ZodSchema } = {};

    datapoints.forEach((datapoint: Datapoint) => {
      switch (datapoint.type) {
        case 'string':
          shape[datapoint.id] = z.string();
          break;
        case 'number':
          shape[datapoint.id] = z.number();
          break;
        case 'boolean':
          shape[datapoint.id] = z.boolean();
          break;
        default:
          throw new Error(`Unknown type: ${datapoint.type}`);
      }

      datapoint.validations?.forEach((validation: DatapointValidation) => {
        const shapeField = shape[datapoint.id];

        switch (validation.type) {
          case 'min':
            if (
              shapeField instanceof z.ZodNumber ||
              shapeField instanceof z.ZodString
            ) {
              shape[datapoint.id] = shapeField.min(Number(validation.value), {
                message:
                  validation.errorMessage ??
                  createMinErrorMessage(
                    datapoint.name,
                    Number(validation.value)
                  ),
              });
            }
            break;

          case 'max':
            if (
              shapeField instanceof z.ZodNumber ||
              shapeField instanceof z.ZodString
            ) {
              shape[datapoint.id] = shapeField.max(Number(validation.value), {
                message:
                  validation.errorMessage ??
                  createMaxErrorMessage(
                    datapoint.name,
                    Number(validation.value)
                  ),
              });
            }
            break;

          case 'isOptional':
            shape[datapoint.id] = shapeField.optional();
            break;
        }
      });
    });

    return z
      .object({
        variant: z.string().min(1, `Field is required`),
        entity: z.string().min(1, `Field is required`),
        ...shape,
      })
      .required();
  };

  const createFile = (
    profileId: string,
    folderId: string,
    fileVariantId: string,
    fileVariantEntityId: string,
    newFile: FileDTO
  ) => {
    const newProfiles = profiles.map((profile) => {
      if (profile.id !== profileId) return profile;

      return {
        ...profile,
        folders: profile.folders.map((folder) => {
          if (folder.id !== folderId) return folder;

          newFile.id = `${folder.folderTypeId}_${fileVariantId}_${fileVariantEntityId}_${Date.now()}`;

          return {
            ...folder,
            files: [...folder.files, newFile],
          } as FolderDTO;
        }),
      };
    });

    trackCreateFile(folderId);
    setProfiles(newProfiles);
  };

  const editFile = (
    profileId: string,
    folderId: string,
    editedFile: FileDTO
  ) => {
    const newProfiles = profiles.map((profile) => {
      if (profile.id !== profileId) return profile;

      return {
        ...profile,
        folders: profile.folders.map((folder) => {
          if (folder.id !== folderId) return folder;

          return {
            ...folder,
            files: folder.files.map((file) => {
              if (file.id !== editedFile.id) return file;

              return editedFile;
            }),
          } as FolderDTO;
        }),
      };
    });

    trackEditFile(folderId);
    setProfiles(newProfiles);
  };

  const deleteFile = (profileId: string, folderId: string, fileId: string) => {
    const newProfiles = profiles.map((profile) => {
      if (profile.id !== profileId) return profile;

      return {
        ...profile,
        folders: profile.folders.map((folder) => {
          if (folder.id !== folderId) return folder;

          return {
            ...folder,
            files: folder.files.filter((file) => file.id !== fileId),
          } as FolderDTO;
        }),
      };
    });

    trackDeleteFile(folderId);
    setProfiles(newProfiles);
  };

  return { generateZodFileSchema, createFile, editFile, deleteFile };
};

export default useFile;
