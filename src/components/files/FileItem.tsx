'use client';

import EntityIcon from '@components/entities/EntityIcon';
import { ROUTES } from '@constants/routes.const';
import DeleteModal from '@core/components/DeleteModal';
import { Card } from '@core/ui/Card';
import ResponsiveDialog from '@core/ui/ResponsiveDialog';
import {
  TypographyH5,
  TypographyMuted,
  TypographyMutedXS,
} from '@core/ui/Typography';
import useFolderFile from '@hooks/files/useFolderFile';
import { AddressFile, FolderFile, SocialFile } from '@models/profile';
import { TrashIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { MouseEvent, useState } from 'react';
import FileDetail from './FileDetail';

interface FileItemProps {
  profileId: string;
  folderId: string;
  file: FolderFile;
}

// TODO: Complete the FileItem component
const FileItem: React.FC<FileItemProps> = ({ file, profileId, folderId }) => {
  const router = useRouter();
  const { deleteFile } = useFolderFile();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const entity = file.entity;
  const mainData = (file as SocialFile).username
    ? (file as SocialFile).username || ''
    : (file as AddressFile).name || '';
  const secondaryData = (file as SocialFile).url
    ? (file as SocialFile).url
    : (file as AddressFile).address;

  const navigateToEdit = () => {
    router.push(
      `${ROUTES.APP_PROFILE}/${profileId}${ROUTES.APP_FOLDER}/${folderId}/edit/${file.id}`
    );
  };

  const handleDelete = (event: MouseEvent) => {
    event.stopPropagation();
    setIsDeleteModalOpen(true);
  };

  return (
    <>
      <ResponsiveDialog
        title=""
        trigger={
          <Card className="relative p-4 space-y-2 border-muted-foreground/20 bg-muted hover:cursor-pointer">
            <div className="flex items-center gap-2 w-100">
              <EntityIcon entity={entity.value} width={24} height={24} />

              <TypographyMuted>{entity.label}</TypographyMuted>

              <TrashIcon
                className="w-4 h-4 ml-auto mr-1 hover:text-red-600"
                onClick={handleDelete}
              />
            </div>

            <div className="text-left">
              <TypographyH5>{mainData}</TypographyH5>

              <TypographyMutedXS>{secondaryData}</TypographyMutedXS>
            </div>
          </Card>
        }
        closeButtonLabel="Close"
      >
        <FileDetail
          mainData={mainData}
          secondaryData={secondaryData}
          entity={entity}
          navigateToEdit={navigateToEdit}
        />
      </ResponsiveDialog>

      <DeleteModal
        message={`Are you sure you want to delete this ${entity.label.toLowerCase()}?`}
        onDelete={() => (
          deleteFile(profileId, folderId, file.id), setIsDeleteModalOpen(false)
        )}
        onClose={() => setIsDeleteModalOpen(false)}
        open={isDeleteModalOpen}
        title="Delete File"
      />
    </>
  );
};

export default FileItem;
