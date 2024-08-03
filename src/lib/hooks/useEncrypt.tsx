import {
  Cipher,
  Decipher,
  createCipheriv,
  createDecipheriv,
  randomBytes,
} from 'crypto';
import * as forge from 'node-forge';

type SymmetricEncryptedData = {
  iv: string;
  encryptedData: string;
};

type EncryptHook = {
  encryptAsymmetric: (
    message: string,
    publicKey: forge.pki.rsa.PublicKey
  ) => string;
  decryptAsymmetric: (
    encryptedMessage: string,
    privateKey: forge.pki.rsa.PrivateKey
  ) => string;
  encryptSymmetric: (message: string) => SymmetricEncryptedData;
  decryptSymmetric: (encryptedMessage: string, ivHex: string) => string;
};

const useEncrypt = (): EncryptHook => {
  const algorithm = 'aes-256-cbc';
  const symmetricKey = randomBytes(32); // Clave simétrica
  const iv = randomBytes(16); // Vector de inicialización

  // Asymmetric Encryption
  const encryptAsymmetric = (
    message: string,
    publicKey: forge.pki.rsa.PublicKey
  ): string => {
    const encryptedMessage = publicKey.encrypt(message, 'RSA-OAEP');
    return forge.util.encode64(encryptedMessage);
  };

  // Asymmetric Decryption
  const decryptAsymmetric = (
    encryptedMessage: string,
    privateKey: forge.pki.rsa.PrivateKey
  ): string => {
    const decodedMessage = forge.util.decode64(encryptedMessage);
    const decryptedMessage = privateKey.decrypt(decodedMessage, 'RSA-OAEP');
    return decryptedMessage;
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
    encryptAsymmetric,
    decryptAsymmetric,
    encryptSymmetric,
    decryptSymmetric,
  };
};

export default useEncrypt;
