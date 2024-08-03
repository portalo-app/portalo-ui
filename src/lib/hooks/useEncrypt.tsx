'use client';
import {
  Cipher,
  Decipher,
  createCipheriv,
  createDecipheriv,
  randomBytes,
} from 'crypto';
import { ethers } from 'ethers';
import * as forge from 'node-forge';

type SymmetricEncryptedData = {
  iv: string;
  encryptedData: string;
};

type EncryptHook = {
  // encryptAsymmetric: (
  //   message: string,
  //   publicKey: forge.pki.rsa.PublicKey
  // ) => null;
  decryptAsymmetric: (
    encryptedMessage: string,
    privateKey: forge.pki.rsa.PrivateKey
  ) => Promise<string | null>;
  encryptSymmetric: (message: string) => SymmetricEncryptedData;
  decryptSymmetric: (encryptedMessage: string, ivHex: string) => string;
};

const useEncrypt = (): EncryptHook => {
  const algorithm = 'aes-256-cbc';
  const symmetricKey = randomBytes(32); // Clave simétrica
  const iv = randomBytes(16); // Vector de inicialización

  // Asymmetric Encryption
  // const encryptAsymmetric = () => {};

  const decryptAsymmetric = async (
    encryptedMessage: string
  ): Promise<string | null> => {
    if ((window as any).ethereum) {
      const provider = new ethers.providers.Web3Provider(
        (window as any).ethereum
      );
      // const accounts = await provider.send('eth_requestAccounts', []);
      const signer = provider.getSigner();
      const address = await signer.getAddress();

      const decodedMessage = forge.util.decode64(encryptedMessage);

      try {
        const decryptedMessage = await provider.send('eth_decrypt', [
          decodedMessage,
          address,
        ]);
        return decryptedMessage;
      } catch (error) {
        console.error('Error al desencriptar el mensaje:', error);
        return null;
      }
    }
    return null;
  };

  // Symmetric Encryption
  const encryptSymmetric = (message: string): SymmetricEncryptedData => {
    const cipher: Cipher = createCipheriv(algorithm, symmetricKey, iv);
    let encryptedMessage = cipher.update(message, 'utf8', 'hex');
    encryptedMessage += cipher.final('hex');
    return { iv: iv.toString('hex'), encryptedData: encryptedMessage };
  };

  // Symmetric Decryption
  const decryptSymmetric = (
    encryptedMessage: string,
    ivHex: string
  ): string => {
    const decipher: Decipher = createDecipheriv(
      algorithm,
      symmetricKey,
      Buffer.from(ivHex, 'hex')
    );
    let decryptedMessage = decipher.update(encryptedMessage, 'hex', 'utf8');
    decryptedMessage += decipher.final('utf8');
    return decryptedMessage;
  };

  return {
    // encryptAsymmetric,
    decryptAsymmetric,
    encryptSymmetric,
    decryptSymmetric,
  };
};

export default useEncrypt;
