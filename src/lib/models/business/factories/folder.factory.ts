import { AddressFolderType } from '../folder/address.folderType';
import { SocialFolderType } from '../folder/social.folderType';

// ToDo: Add factory method to create a factory type based on its ID
export class FolderTypeFactory {
  static createFolderType(folderId: string) {
    switch (folderId) {
      case 'address':
        return new AddressFolderType();
      case 'social':
        return new SocialFolderType();
      default:
        throw new Error('Folder type ID does not exist');
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
