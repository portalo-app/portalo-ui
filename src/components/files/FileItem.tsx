'use client';

import EntityIcon from '@components/entities/EntityIcon';
import DeleteModal from '@core/components/DeleteModal';
import { Card } from '@core/ui/Card';
import ResponsiveDialog from '@core/ui/ResponsiveDialog';
import {
  TypographyH5,
  TypographyMuted,
  TypographyMutedXS,
} from '@core/ui/Typography';
import useFolderFile from '@hooks/files/useFolderFile';
import { motion } from 'framer-motion';
import { TrashIcon } from 'lucide-react';
import { MouseEvent, useState } from 'react';

interface FileListItemProps {
  profileId: string;
  folderId: string;
  file: File;
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

  console.log('element', file);

  // const navigateToEdit = () => {
  //   router.push(
  //     `${ROUTES.APP_PROFILE}/${profileId}${ROUTES.APP_FOLDER}/${folderId}/edit/${file.id}`
  //   );
  // };

  const handleDelete = (event: MouseEvent) => {
    event.stopPropagation();
    setIsDeleteModalOpen(true);
  };

  const variants = {
    open: {
      y: 0,
      opacity: 1,
      transition: {
        y: { stiffness: 2000, velocity: -100 },
      },
    },
    closed: {
      y: 10,
      opacity: 0,
      transition: {
        y: { stiffness: 2000 },
      },
    },
  };

  return (
    <>
      <ResponsiveDialog
        title=""
        trigger={
          <motion.div
            variants={variants}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
          >
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
          </motion.div>
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
