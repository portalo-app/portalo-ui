import useAnalytics from '@hooks/googleAnalytics/useAnalytics';
import { Space } from '@models/space';
import { DEFAULT_VAULTS } from '@models/space.data';
import { spacesState } from '@states/spaces.atom';
import { useSetRecoilState } from 'recoil';

type CreateSpace = (name: string) => void;

type UseCreateSpace = () => CreateSpace;

const useCreateSpace: UseCreateSpace = () => {
  const { trackCreateProfile } = useAnalytics();
  const setSpaces = useSetRecoilState(spacesState);

  const createSpace: CreateSpace = (name: string) => {
    const space: Space = {
      id: Date.now().toString(),
      name,
      vaults: [...DEFAULT_VAULTS],
    };

    setSpaces((spaces) => [...spaces, space]);
    trackCreateProfile(space.id);
  };
  return createSpace;
};

export default useCreateSpace;
