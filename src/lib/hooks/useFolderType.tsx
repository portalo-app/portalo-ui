import { FolderType } from '@models/business/folder/folderType';
import { folderTypesState } from '@states/folderTypes.atom';
import { useRecoilValue } from 'recoil';

const useFolderType = () => {
  const folderTypes = useRecoilValue(folderTypesState);

  const getFolderType = (folderTypeId: string): FolderType => {
    return folderTypes.find((folderType) => folderType.id === folderTypeId)!;
  };

  const getFolderIcon = (folderTypeId: string) => {
    const folderIcon = getFolderType(folderTypeId)?.icon;

    return folderIcon;
  };

  return { getFolderType, getFolderIcon };
};

export default useFolderType;
