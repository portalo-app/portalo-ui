import { spacesState } from '@states/spaces.atom';
import { useRecoilState } from 'recoil';

type EditSpace = (id: string, name: string) => void;

type UseEditSpace = () => EditSpace;

const useEditSpace: UseEditSpace = () => {
  const [spaces, setSpaces] = useRecoilState(spacesState);

  const editSpace: EditSpace = (id: string, name: string) => {
    const newSpaces = spaces.map((space) => {
      if (space.id === id) {
        return {
          ...space,
          name,
        };
      }
      return space;
    });

    setSpaces(newSpaces);
  };

  return editSpace;
};

export default useEditSpace;
