import { SYMMETRIC_ALGORITHM_IV } from '@constants/constants.const';
import { bufferToHex } from 'ethereumjs-util';
import { hexToBytes } from 'viem';

const useEncrypt = () => {
  const iv = SYMMETRIC_ALGORITHM_IV; // Vector de inicialización

  async function deriveKey(password: string) {
    const salt = iv;
    const keyMaterial = await window.crypto.subtle.importKey(
      'raw',
      new TextEncoder().encode(password),
      'PBKDF2',
      false,
      ['deriveBits', 'deriveKey']
    );

    const key = await window.crypto.subtle.deriveKey(
      {
        name: 'PBKDF2',
        salt: salt,
        iterations: 100000,
        hash: 'SHA-256',
      },
      keyMaterial,
      { name: 'AES-GCM', length: 256 },
      true,
      ['encrypt', 'decrypt']
    );

    return { key, salt };
  }

  const encryptSymmetric = async (
    message: string,
    key: string
  ): Promise<string | null> => {
    const { key: rsaKey } = await deriveKey(key);

    const encrypted = await window.crypto.subtle.encrypt(
      {
        name: 'AES-GCM',
        iv: iv,
      },
      rsaKey,
      new TextEncoder().encode(message).buffer
    );

    const encryptedString = bufferToHex(Buffer.from(encrypted));

    return encryptedString;
  };

  const decryptSymmetric = async (
    hexEncryptedMessage: string,
    key: string
  ): Promise<string | null> => {
    const { key: rsaKey } = await deriveKey(key);

    const encryptedMessage = hexToBytes(hexEncryptedMessage as `0x${string}`);

    const decrypted = await window.crypto.subtle.decrypt(
      {
        name: 'AES-GCM',
        iv: iv,
      },
      rsaKey,
      Buffer.from(encryptedMessage).buffer
    );

    return new TextDecoder().decode(decrypted);
  };

  return {
    encryptSymmetric,
    decryptSymmetric,
  };
};

export default useEncrypt;
