'use client';

import FileVariantEntityIcon from '@components/entities/FileVariantEntityIcon';
import DeleteModal from '@core/components/DeleteModal';
import { Card } from '@core/ui/Card';
import ResponsiveDialog from '@core/ui/ResponsiveDialog';
import {
  TypographyH5,
  TypographyMuted,
  TypographyMutedXS,
} from '@core/ui/Typography';
import useFolderFile from '@hooks/files/useFolderFile';
import { FileDTO } from '@models/dto/file.dto';
import { TrashIcon } from 'lucide-react';
import { MouseEvent, useState } from 'react';

interface FileListItemProps {
  profileId: string;
  folderId: string;
  file: FileDTO;
}

// TODO: Complete the FileItem component
const FileListItem: React.FC<FileListItemProps> = ({
  file,
  profileId,
  folderId,
}) => {
  // const router = useRouter();
  const { deleteFile } = useFolderFile();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const entity = file.entity;
  const mainData = (file as SocialFile).username
    ? (file as SocialFile).username || ''
    : (file as AddressFile).name || '';
  const secondaryData = (file as SocialFile).url
    ? (file as SocialFile).url
    : (file as AddressFile).address;

  // const alias = (file as AddressFile).alias || '';
  // const notes = (file as AddressFile).notes || '';

  // const navigateToEdit = () => {
  //   router.push(
  //     `${ROUTES.APP_PROFILE}/${profileId}${ROUTES.APP_FOLDER}/${folderId}/edit/${file.id}`
  //   );
  // };

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
              <FileVariantEntityIcon
                entity={entity.value}
                width={24}
                height={24}
              />

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
      >
        {/* <FileDetail file={fileMock} navigateToEdit={navigateToEdit} /> */}
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

export default FileListItem;
