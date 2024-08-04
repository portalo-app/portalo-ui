import useEncrypt from '@hooks/useEncrypt';
import useZk from '@hooks/useZk';
import { ProfileDTO } from '@models/dto/profile.dto';
import { ZkProfile } from '@models/zk/zkProfile.model';
import { Abi } from 'viem';
import { useAccount, useSignMessage, useWriteContract } from 'wagmi';
import abi from '../../contracts/portalo_contract_abi.json';

const contract = process.env.NEXT_PUBLIC_PORTALO_CONTRACT_ADDRESS;

const useUploadProfile = () => {
  const { writeContractAsync } = useWriteContract();
  const { generateProof } = useZk();
  const { encryptSymmetric, decryptSymmetric } = useEncrypt();
  const { signMessageAsync } = useSignMessage();
  const { connector, address } = useAccount();

  const uploadProfile = async (profile: ProfileDTO) => {
    const nonce = ZkProfile.getNonce();
    const signature = await signMessageAsync({
      account: address,
      message: nonce,
      connector,
    });

    const key = ZkProfile.generateEncryptionKey(signature, profile.id, nonce);
    const encryptedKey = (await encryptSymmetric(key, signature)) || ''; // encryptAsymmetric(key);
    const encryptedData =
      (await encryptSymmetric(JSON.stringify(profile), key)) || ''; // encryptSymmetric(profile.key, key);

    const decryptedKey = await decryptSymmetric(encryptedKey, signature);
    console.log({ decryptedKey });

    const decryptedData = await decryptSymmetric(encryptedData, key);
    console.log({ decryptedData });

    const { proof, publicInputs } = await generateProof(
      signature,
      profile.id,
      nonce
    );

    const zkProfile = new ZkProfile(
      profile.id,
      nonce,
      encryptedKey,
      encryptedData,
      false
    );

    await writeContractAsync({
      abi: abi as unknown as Abi,
      address: contract as `0x${string}`,
      functionName: 'saveProfile',
      args: [zkProfile, proof, publicInputs, false],
    });
  };

  return { uploadProfile };
};

export default useUploadProfile;
