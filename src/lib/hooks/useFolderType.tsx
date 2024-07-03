import { FolderType } from '@models/business/folder/folderType';
import { folderTypesState } from '@states/folderTypes.atom';
import { useRecoilValue } from 'recoil';

const useFolderType = (
  folderTypeId: string | undefined
): FolderType | undefined => {
  const folderTypes = useRecoilValue(folderTypesState);

  if (!folderTypeId) return;

  return folderTypes.find((folderType) => folderType.id === folderTypeId)!;
};

export default useFolderType;
