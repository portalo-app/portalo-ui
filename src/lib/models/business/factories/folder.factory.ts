import { AddressFolderType } from '../address/address.folderType';
import { Folder, FolderType } from '../folder';
import { SocialFolderType } from '../social/social.folderType';

// ToDo: Add factory method to create a factory type based on its ID
export class FolderTypeFactory {
  // type: string | null;

  constructor() {
    //this.type = null; // ¿This is necessary?
  }

  createFolderType(folderId: string, folderType: FolderType) {
    switch (folderId) {
      case 'address':
        return new AddressFolderType();
      case 'social':
        return new SocialFolderType();
      default:
        return new Folder(folderId, folderType);
    }
  }
}

// useCreatePerfil
/* 
1 - instanciamos FolderTypeFactory

2- a ese FolderTypeFactory usamos createFolderType

3- usamos createFolderType ( address )

4 -usamos createFolderType ( social )

5- tiene OPC para mandar parametros genericos
 */
