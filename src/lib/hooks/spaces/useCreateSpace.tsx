import { Space } from '@models/space';
import { DEFAULT_FOLDERS } from '@models/space.data';
import { spacesState } from '@states/spaces.atom';
import { useSetRecoilState } from 'recoil';

type CreateSpace = (name: string) => void;

type UseCreateSpace = () => CreateSpace;

const useCreateSpace: UseCreateSpace = () => {
  const setSpaces = useSetRecoilState(spacesState);

  const createSpace: CreateSpace = (name: string) => {
    const space: Space = {
      id: Date.now().toString(),
      name,
      folders: [...DEFAULT_FOLDERS],
    };

    setSpaces((spaces) => [...spaces, space]);
  };

  return createSpace;
};

export default useCreateSpace;
