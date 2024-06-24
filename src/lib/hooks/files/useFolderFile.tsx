import { getSocialUrlByUsername } from '@models/social.entities';
import { AddressFile, Folder, FolderFile, SocialFile } from '@models/space';
import { spacesState } from '@states/spaces.atom';
import { useRecoilState } from 'recoil';

const useFolderFile = () => {
  const [spaces, setSpaces] = useRecoilState(spacesState);

  const createFile = (
    spaceId: string,
    folderId: string,
    newFile: FolderFile
  ) => {
    const newSpaces = spaces.map((space) => {
      if (space.id !== spaceId) return space;

      newFile.id = `${newFile.entity.label}-${Date.now()}`;

      return {
        ...space,
        folders: space.folders.map((folder) => {
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

    setSpaces(newSpaces);
  };

  const editFile = (
    spaceId: string,
    folderId: string,
    editedFile: FolderFile
  ) => {
    const newSpaces = spaces.map((space) => {
      if (space.id !== spaceId) return space;

      return {
        ...space,
        folders: space.folders.map((folder) => {
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

    setSpaces(newSpaces);
  };

  const deleteFile = (spaceId: string, folderId: string, fileId: string) => {
    const newSpaces = spaces.map((space) => {
      if (space.id !== spaceId) return space;

      return {
        ...space,
        folders: space.folders.map((folder) => {
          if (folder.id !== folderId) return folder;

          return {
            ...folder,
            files: folder.files.filter((file) => file.id !== fileId),
          } as Folder<AddressFile> | Folder<SocialFile>;
        }),
      };
    });

    setSpaces(newSpaces);
  };

  return { createFile, editFile, deleteFile };
};

export default useFolderFile;
