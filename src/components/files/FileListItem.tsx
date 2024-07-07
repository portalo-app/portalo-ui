'use client';

import FileVariantEntityIcon from '@components/entities/FileVariantEntityIcon';
import { ROUTES } from '@constants/routes.const';
import DeleteModal from '@core/components/DeleteModal';
import { Card } from '@core/ui/Card';
import ResponsiveDialog from '@core/ui/ResponsiveDialog';
import {
  TypographyH5,
  TypographyMuted,
  TypographyMutedXS,
} from '@core/ui/Typography';
import useFile from '@hooks/files/useFile';
import { FolderType } from '@models/business/folder/folderType';
import { FileDTO } from '@models/dto/file.dto';
import { TrashIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { MouseEvent, useMemo, useState } from 'react';
import FileDetail from './FileDetail';

interface FileListItemProps {
  profileId: string;
  folderId: string;
  file: FileDTO;
  folderType: FolderType;
}

const FileListItem: React.FC<FileListItemProps> = ({
  profileId,
  folderId,
  file,
  folderType,
}) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const router = useRouter();
  const { deleteFile } = useFile();

  const entity = useMemo(
    () =>
      folderType.fileType.variants
        .find((variant) => variant.id === file.data.variant)!
        .availableEntities.find((entity) => entity.id === file.data.entity)!,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [file.data.entity]
  );

  if (!folderType || !entity) return;

  const keyData = folderType.fileType.getKeyData(file.data);

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
              <FileVariantEntityIcon entity={entity} />

              <TypographyMuted>{entity.label}</TypographyMuted>

              <TrashIcon
                className="w-4 h-4 ml-auto mr-1 hover:text-red-600"
                onClick={handleDelete}
              />
            </div>

            <div className="text-left">
              <TypographyH5>{keyData.primary}</TypographyH5>

              <TypographyMutedXS>{keyData.secondary}</TypographyMutedXS>
            </div>
          </Card>
        }
      >
        <FileDetail
          file={file}
          fileType={folderType.fileType}
          navigateToEdit={navigateToEdit}
        />
      </ResponsiveDialog>

      <DeleteModal
        message={`Are you sure you want to delete the ${entity.label} file?`}
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

export default FileListItem;
