import { bufferToHex, sha256 } from 'ethereumjs-util';
import { ethers } from 'ethers';

export class ZkProfile {
  public profileId: string;
  public nonce: string;
  public profileEncryptionKey: string;
  public encryptedData: string;
  public isPublic: boolean;

  constructor(
    profileId: string,
    nonce: string,
    profileEncryptionKey: string,
    encryptedData: string,
    isPublic: boolean
  ) {
    this.profileId = profileId;
    this.nonce = nonce;
    this.profileEncryptionKey = profileEncryptionKey;
    this.encryptedData = encryptedData;
    this.isPublic = isPublic;
  }

  public static generateEncryptionKey(
    signature: string,
    profileId: string,
    nonce: string
  ): string {
    const hashedSignature = sha256(Buffer.from(signature));
    const encoder = new TextEncoder();
    const profileIdEncoded = encoder.encode(profileId);
    const nonceEnconded = encoder.encode(nonce);

    const key = Buffer.from([
      ...hashedSignature,
      ...profileIdEncoded,
      ...nonceEnconded,
    ]);

    return bufferToHex(key);
  }

  public static async getProfileSignature(nonce: string) {
    const provider = new ethers.JsonRpcProvider();
    const signer = await provider.getSigner();

    const signature = await signer.signMessage(nonce);
    return signature;
  }

  public static hashKey(key: string): string {
    return bufferToHex(sha256(Buffer.from(key)));
  }

  public static getNonce(): string {
    return bufferToHex(Buffer.from(ethers.randomBytes(8)));
  }
}
