import useZk from '@hooks/useZk';
import { ProfileDTO } from '@models/dto/profile.dto';
import { ZkProfile } from '@models/zk/zkProfile.model';
import { Abi } from 'viem';
import { useWriteContract } from 'wagmi';
import abi from '../../contracts/portalo_contract_abi.json';

const contract = process.env.NEXT_PUBLIC_PORTALO_CONTRACT_ADDRESS;

const useUploadProfile = () => {
  const { writeContract } = useWriteContract();
  const { generateProof } = useZk();

  const uploadProfile = async (profile: ProfileDTO) => {
    const nonce = ZkProfile.getNonce();
    const signature = await ZkProfile.getProfileSignature(nonce);
    const key = ZkProfile.generateEncryptionKey(signature, profile.id, nonce);
    const hashedKey = ZkProfile.hashKey(key);
    const encryptedKey = 'encryptedKey'; //encryptKey

    const { proof, publicInputs } = await generateProof(
      signature,
      profile.id,
      nonce
    );

    const zkProfile = new ZkProfile(
      profile.id,
      nonce,
      hashedKey,
      encryptedKey,
      false
    );

    writeContract({
      abi: abi as unknown as Abi,
      address: contract as `0x${string}`,
      functionName: 'saveProfile',
      args: [
        zkProfile,
        proof,
        [
          ...publicInputs.profileId,
          ...publicInputs.nonce,
          ...publicInputs.hashed_encryption_key,
        ],
      ],
    });
  };

  return { uploadProfile };
};

export default useUploadProfile;
