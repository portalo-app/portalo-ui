import { Abi } from 'viem';
import { useWriteContract } from 'wagmi';
import abi from '../../contracts/portalo_contract_abi.json';

const contract = process.env.NEXT_PUBLIC_PORTALO_CONTRACT_ADDRESS;

const useUploadProfile = () => {
  const { writeContract } = useWriteContract();

  const uploadProfile = () => {
    writeContract({
      abi: abi as unknown as Abi,
      address: contract as `0x${string}`,
      functionName: 'saveProfile',
      args: [],
    });
  };

  return { uploadProfile };
};

export default useUploadProfile;
