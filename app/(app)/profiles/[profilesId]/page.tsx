'use client';

import FolderItem from '@components/folders/FolderItem';
import DeleteSpaceModal from '@components/spaces/DeleteSpaceModal';
import { ROUTES } from '@constants/routes.const';
import { Button } from '@core/ui/Button';
import { TypographyH3 } from '@core/ui/Typography';
import { Space } from '@models/space';
import { spacesState } from '@states/spaces.atom';
import { ChevronRight, Trash } from 'lucide-react';
import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

interface SpacePageProps {
  params: { spaceId: string };
}

const SpacePage: NextPage<SpacePageProps> = ({ params }) => {
  const [space, setSpace] = useState<Space | null>(null);
  const spacesData = useRecoilValue(spacesState);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const { spaceId } = params;
  const router = useRouter();

  useEffect(() => {
    if (!spaceId) return;

    const selectedSpace = spacesData.find((space) => space.id === spaceId);

    if (!selectedSpace) {
      router.push(ROUTES.APP);
      return;
    }

    setSpace(selectedSpace);
  }, [spacesData, router, spaceId]);

  const deleteSpace = () => {
    setOpenModal(true);
  };

  const onCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <TypographyH3>{space?.name}</TypographyH3>
        <Button
          size="sm"
          className="gap-1 bg-transparent text-destructive brightness-150 hover:bg-transparent hover:brightness-200 hover:text-destructive"
          variant="ghost"
          onClick={deleteSpace}
        >
          <Trash size={16} />
          Delete
        </Button>
      </div>

      <div className="divide-y-2 *:block">
        {space?.folders.map((folder, index) => (
          <Link
            className="relative"
            key={index}
            href={`${ROUTES.APP_SPACE}/${spaceId}/${ROUTES.APP_FOLDER}/${folder.id}`}
          >
            <FolderItem space={space} folder={folder} />

            <ChevronRight
              size={24}
              className="absolute top-[calc(50%-12px)] right-2"
            />
          </Link>
        ))}
      </div>
      {space && (
        <DeleteSpaceModal
          open={openModal}
          space={space}
          onClose={onCloseModal}
        />
      )}
    </div>
  );
};

export default SpacePage;
