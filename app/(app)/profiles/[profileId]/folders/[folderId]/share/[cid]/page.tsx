'use client';

import FileListItem from '@components/files/FileListItem';
import { ROUTES } from '@constants/routes.const';
import State from '@core/components/State';
import { Button } from '@core/ui/Button';
import Icon from '@core/ui/Icon';
import { TypographyH3 } from '@core/ui/Typography';
import useFileStorage from '@hooks/useFileStorage';
import useFolderType from '@hooks/useFolderType';
import { FileDTO } from '@models/dto/file.dto';
import { FolderDTO } from '@models/dto/folder.dto';
import { walletState } from '@states/wallet.atom';
import { motion } from 'framer-motion';
import { NextPage } from 'next';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';

interface FolderDetailsProps {
  params: { profileId: string; folderId: string; cid: string };
}

const FolderDetail: NextPage<FolderDetailsProps> = ({ params }) => {
  const router = useRouter();
  const pathName = usePathname();

  const account = useRecoilValue(walletState);
  const [folder, setFolder] = useState<FolderDTO | null>(null);

  const { cid, folderId, profileId } = params;

  const { readEncryptedFolder } = useFileStorage();
  const { getFolderIcon, getFolderType } = useFolderType();

  if (!cid || !profileId || !folderId) {
    router.push(ROUTES.APP);
    return;
  }

  return (
    <>
      {folder ? (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Icon
                name={getFolderIcon(folder?.folderTypeId)}
                className="text-muted-foreground"
              />
              <TypographyH3>
                {getFolderType(folder.folderTypeId).label} folder
              </TypographyH3>
            </div>
          </div>

          <div className="space-y-4">
            {(folder?.files?.length ?? 0 > 0) ? (
              folder?.files.map((file: FileDTO, index: number) => (
                <motion.div
                  key={index}
                  variants={{
                    open: { opacity: 1 },
                    closed: { opacity: 0 },
                  }}
                  initial="closed"
                  animate="open"
                  transition={{ delay: index * 0.2 }}
                >
                  <FileListItem
                    profileId={profileId}
                    folderId={folderId}
                    file={file}
                    folderType={getFolderType(folder.folderTypeId)}
                  />
                </motion.div>
              ))
            ) : (
              <State
                type="empty"
                label="You don't have any files yet"
                action={{
                  label: 'Create File',
                  onClick: () => router.push(`${pathName}/new`),
                }}
              />
            )}
          </div>
        </div>
      ) : (
        <>
          {account ? (
            <Button
              onClick={() =>
                readEncryptedFolder(cid).then((folder) => setFolder(folder))
              }
            >
              Read Encrypted Folder
            </Button>
          ) : (
            <TypographyH3>Please connect your account</TypographyH3>
          )}
        </>
      )}
    </>
  );
};

export default FolderDetail;
