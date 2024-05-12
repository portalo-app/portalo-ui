import { spacesState } from '@states/spaces.atom';
import { useSetRecoilState } from 'recoil';

type DeleteSpace = (id: string) => void;

type UseDeleteSpace = () => DeleteSpace;

const useDeleteSpace: UseDeleteSpace = () => {
  const setSpaces = useSetRecoilState(spacesState);

  const deleteSpace: DeleteSpace = (id: string) => {
    setSpaces((spaces) => spaces.filter((space) => space.id !== id));
  };

  return deleteSpace;
};

export default useDeleteSpace;
