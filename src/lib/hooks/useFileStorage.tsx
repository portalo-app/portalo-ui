import lighthouse from '@lighthouse-web3/sdk';
import { FolderDTO } from '@models/dto/folder.dto';
import { walletState } from '@states/wallet.atom';
import { useRecoilValue } from 'recoil';
import useWallet from './useWallet';

const useFileStorage = () => {
  const { signMessage } = useWallet();
  const account = useRecoilValue(walletState);

  const signAuthenticationMessage = async (): Promise<string> => {
    const messageToSign = await (
      await fetch(
        `https://encryption.lighthouse.storage/api/message/${account}`
      )
    ).json();

    return await signMessage(messageToSign[0].message);
  };

  const saveEncryptedFolder = async (profileId: string, folder: FolderDTO) => {
    // Get authentication signed message
    const signedMessage = await signAuthenticationMessage();

    const uploadResponse = await lighthouse.textUploadEncrypted(
      JSON.stringify(folder),
      process.env.NEXT_PUBLIC_LIGHTHOUSE_API_KEY!,
      account!,
      signedMessage,
      profileId + folder.id
    );

    console.log(uploadResponse);
  };

  const getCIDByFolderId = async (profileId: string, folderId: string) => {
    const files = await lighthouse.getUploads(
      process.env.NEXT_PUBLIC_LIGHTHOUSE_API_KEY!
    );

    return files.data.fileList.find(
      (file) => file.fileName === profileId + folderId
    )?.cid;
  };

  const readEncryptedFolder = async (cid: string): Promise<FolderDTO> => {
    const signedMessage = await signAuthenticationMessage();

    const fileEncryptionKey = await lighthouse.fetchEncryptionKey(
      cid,
      account!,
      signedMessage
    );

    const decrypted = await lighthouse.decryptFile(
      cid,
      fileEncryptionKey!.data!.key!
    );

    const folder = JSON.parse(await decrypted.text()) as FolderDTO;

    return folder;
  };

  return { saveEncryptedFolder, getCIDByFolderId, readEncryptedFolder };
};

export default useFileStorage;
