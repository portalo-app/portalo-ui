import useEncrypt from '@hooks/useEncrypt';
import * as forge from 'node-forge';
import React from 'react';

const ExampleEncrypt: React.FC = () => {
  // Generar el par de claves RSA en el componente
  const rsaKeyPair = forge.pki.rsa.generateKeyPair({ bits: 2048 });

  const {
    encryptAsymmetric,
    decryptAsymmetric,
    encryptSymmetric,
    decryptSymmetric,
  } = useEncrypt();

  const message = 'Hello, World!';

  // Asymmetric Encryption/Decryption
  const encryptedAsymmetric = encryptAsymmetric(message, rsaKeyPair.publicKey);
  const decryptedAsymmetric = decryptAsymmetric(
    encryptedAsymmetric,
    rsaKeyPair.privateKey
  );

  // Symmetric Encryption/Decryption
  const { iv, encryptedData } = encryptSymmetric(message);
  const decryptedSymmetric = decryptSymmetric(encryptedData, iv);

  return (
    <div>
      <h1>Crypto Example</h1>
      <p>Original Message: {message}</p>
      <p>Asymmetric Encrypted: {encryptedAsymmetric}</p>
      <p>Asymmetric Decrypted: {decryptedAsymmetric}</p>
      <p>Symmetric Encrypted: {encryptedData}</p>
      <p>Symmetric Decrypted: {decryptedSymmetric}</p>
    </div>
  );
};

export default ExampleEncrypt;
