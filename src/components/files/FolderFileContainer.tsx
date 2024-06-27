// 'use client';

// import { ROUTES } from '@constants/routes.const';
// import { TypographyH1 } from '@core/ui/Typography';
// import { FolderFile } from '@models/business/file';
// import { Folder } from '@models/business/folder';
// import { profilesState } from '@states/profiles.atom';
// import { useRouter } from 'next/navigation';
// import { FC, useEffect, useState } from 'react';
// import { useRecoilValue } from 'recoil';
// // import FolderFileForm from './FolderFileForm';

// interface FolderFileContainerProps {
//   profileId: string;
//   folderId: string;
//   fileId?: string;
//   action: 'new' | 'edit';
// }

// const FolderFileContainer: FC<FolderFileContainerProps> = ({
//   profileId,
//   folderId,
//   action,
//   fileId,
// }) => {
//   const [folder, setFolder] = useState<Folder | null>(null);
//   const [file, setFile] = useState<FolderFile | null>(null);

//   const profilesData = useRecoilValue(profilesState);
//   const router = useRouter();

//   console.log('profilesData', profilesData);

//   useEffect(() => {
//     if (!profileId) return;

//     const selectedProfile = profilesData.find(
//       (profile) => profile.id === profileId
//     );
//     const selectedFolder = selectedProfile?.folders.find(
//       (folder) => folder.id === folderId
//     );

//     if (!selectedProfile || !selectedFolder) {
//       router.push(ROUTES.APP);
//       return;
//     }

//     if (action === 'edit' && fileId) {
//       const selectedFile = selectedFolder.files.find(
//         (file) => file.id === fileId
//       );

//       if (!selectedFile) {
//         router.push(
//           `${ROUTES.APP_PROFILE}/${profileId}${ROUTES.APP_FOLDER}/${folderId}`
//         );
//         return;
//       }

//       setFile(selectedFile);
//     }

//     setFolder(selectedFolder);
//   }, [profilesData, profileId, folderId, router, action, fileId]);

//   return (
//     <div className="flex flex-col gap-6">
//       <TypographyH1>
//         {action === 'new' ? 'Add' : 'Edit'} {folderId}
//       </TypographyH1>

//       {folder && (
//         <FolderFileForm
//           profileId={profileId}
//           folderId={folderId}
//           folderType={folder?.type}
//           initialData={file || undefined}
//           onComplete={() =>
//             router.push(
//               `${ROUTES.APP_PROFILE}/${profileId}${ROUTES.APP_FOLDER}/${folderId}`
//             )
//           }
//           action={action}
//         />
//       )}
//     </div>
//   );
// };

// export default FolderFileContainer;
