import { SYMMETRIC_ALGORITHM_IV } from '@constants/constants.const';
import {
  Cipher,
  Decipher,
  createCipheriv,
  createDecipheriv,
  scryptSync,
} from 'crypto';
import { ethers } from 'ethers';
import * as forge from 'node-forge';

type SymmetricEncryptedData = {
  iv: string;
  encryptedData: string;
};

type EncryptHook = {
  encryptAsymmetric: (message: string) => Promise<string | null>;
  decryptAsymmetric: (
    encryptedMessage: string,
    privateKey: forge.pki.rsa.PrivateKey
  ) => Promise<string | null>;
  encryptSymmetric: (
    message: string,
    encryptionKey: string
  ) => SymmetricEncryptedData;
  decryptSymmetric: (encryptedMessage: string, decryptionKey: string) => string;
};

const useEncrypt = (): EncryptHook => {
  const symmetricAlgorithm = 'aes-256-cbc';
  const iv = SYMMETRIC_ALGORITHM_IV; // Vector de inicialización

  const initWeb3Context = async () => {
    const ethereumContext = (window as any).ethereum;

    if (!ethereumContext) return null;

    const provider = new ethers.BrowserProvider(ethereumContext);

    // Request access to wallet
    await provider.send('eth_requestAccounts', []);

    const signer = await provider.getSigner();
    const address = await signer.getAddress();

    return { provider, address };
  };

  const encryptAsymmetric = async (message: string): Promise<string | null> => {
    const web3Context = await initWeb3Context();
    if (!web3Context) return null;

    const { provider, address } = web3Context;

    try {
      // Encode the message in base64
      const encodedMessage = forge.util.encode64(message);

      // Encrypt the message using the Ethereum provider
      const encryptedMessage = await provider.send('eth_encrypt', [
        encodedMessage,
        address,
      ]);

      return forge.util.encode64(encryptedMessage);
    } catch (error) {
      console.error(`Error al encriptar el mensaje: ${message}`, error);
      return null;
    }
  };

  const decryptAsymmetric = async (
    encryptedMessage: string
  ): Promise<string | null> => {
    const web3Context = await initWeb3Context();
    if (!web3Context) return null;

    const { provider, address } = web3Context;

    const decodedMessage = forge.util.decode64(encryptedMessage);

    try {
      return await provider.send('eth_decrypt', [decodedMessage, address]);
    } catch (error) {
      console.error(
        `Error al desencriptar el mensaje: ${encryptedMessage}`,
        error
      );
      return null;
    }
  };

  const encryptSymmetric = (
    message: string,
    encryptionKey: string
  ): SymmetricEncryptedData => {
    const cipher: Cipher = createCipheriv(
      symmetricAlgorithm,
      scryptSync(encryptionKey, 'salt', 32),
      iv
    );

    const encryptedMessage =
      cipher.update(message, 'utf8', 'hex') + cipher.final('hex');

    return { iv: iv.toString('hex'), encryptedData: encryptedMessage };
  };

  const decryptSymmetric = (
    encryptedMessage: string,
    decryptionKey: string
  ): string => {
    const decipher: Decipher = createDecipheriv(
      symmetricAlgorithm,
      scryptSync(decryptionKey, 'salt', 32),
      iv
    );

    return (
      decipher.update(encryptedMessage, 'hex', 'utf8') + decipher.final('utf8')
    );
  };

  return {
    encryptAsymmetric,
    decryptAsymmetric,
    encryptSymmetric,
    decryptSymmetric,
  };
};

export default useEncrypt;
