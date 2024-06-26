import { getSocialUrlByUsername } from '@constants/social/social.entities';
import useAnalytics from '@hooks/googleAnalytics/useAnalytics';
import { FolderFile } from '@models/business/file';
import { Folder } from '@models/business/folder';
import { AddressFile, SocialFile } from '@models/business/profile';
import { profilesState } from '@states/profiles.atom';
import { useRecoilState } from 'recoil';

const useFolderFile = () => {
  const [profiles, setProfiles] = useRecoilState(profilesState);
  const { trackCreateFile, trackDeleteFile, trackEditFile } = useAnalytics();

  const createFile = (
    profileId: string,
    folderId: string,
    newFile: FolderFile
  ) => {
    const newProfiles = profiles.map((profile) => {
      if (profile.id !== profileId) return profile;

      newFile.id = `${newFile.entity.label}-${Date.now()}`;

      return {
        ...profile,
        folders: profile.folders.map((folder) => {
          if (folder.id !== folderId) return folder;

          if (folder.type.id === 'social') {
            (newFile as SocialFile).url = getSocialUrlByUsername(
              newFile.entity,
              (newFile as SocialFile).username
            );
          }

          return {
            ...folder,
            files: [...folder.files, newFile],
          } as Folder<AddressFile> | Folder<SocialFile>;
        }),
      };
    });

    trackCreateFile(folderId);
    setProfiles(newProfiles);
  };

  const editFile = (
    profileId: string,
    folderId: string,
    editedFile: FolderFile
  ) => {
    const newProfiles = profiles.map((profile) => {
      if (profile.id !== profileId) return profile;

      return {
        ...profile,
        folders: profile.folders.map((folder) => {
          if (folder.id !== folderId) return folder;

          if (folder.type.id === 'social') {
            (editedFile as SocialFile).url = getSocialUrlByUsername(
              editedFile.entity,
              (editedFile as SocialFile).username
            );
          }

          return {
            ...folder,
            files: folder.files.map((File) => {
              if (File.id !== editedFile.id) return File;

              return editedFile;
            }),
          } as Folder<AddressFile> | Folder<SocialFile>;
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
          } as Folder<AddressFile> | Folder<SocialFile>;
        }),
      };
    });

    trackDeleteFile(folderId);
    setProfiles(newProfiles);
  };

  return { createFile, editFile, deleteFile };
};

export default useFolderFile;
