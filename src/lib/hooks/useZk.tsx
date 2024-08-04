import {
  BarretenbergBackend,
  CompiledCircuit,
} from '@noir-lang/backend_barretenberg';
import { Noir } from '@noir-lang/noir_js';
import { bufferToHex, sha256 } from 'ethereumjs-util';
import circuit from '../circuits/portalo_auth_circuit.json';

const useZk = () => {
  const generateProof = async (
    signature: string,
    profileId: string,
    nonce: string
  ) => {
    const backend = new BarretenbergBackend(circuit as CompiledCircuit);
    const noir = new Noir(circuit as CompiledCircuit);

    const encoder = new TextEncoder();
    const hashedSignature = sha256(Buffer.from(signature));
    const profileIdEncoded = encoder.encode(profileId);
    const nonceEnconded = encoder.encode(nonce);

    const key = [...hashedSignature, ...profileIdEncoded, ...nonceEnconded];
    const hashed_encryption_key = sha256(Buffer.from(key));

    const publicInputs = {
      profileId: Array.from(profileIdEncoded),
      nonce: Array.from(nonceEnconded),
      hashed_encryption_key: Array.from(hashed_encryption_key),
    };

    const input = {
      hashed_signature: Array.from(hashedSignature),
      ...publicInputs,
    };

    const { witness } = await noir.execute(input as any);

    const proof = await backend.generateProof(witness);

    const proofHash = bufferToHex(Buffer.from(proof.proof));

    return { proof: proofHash, publicInputs: proof.publicInputs };
  };

  return { generateProof };
};

export default useZk;
