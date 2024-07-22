'use client';

import { Button } from '@core/ui/Button';
import lighthouse from '@lighthouse-web3/sdk';
import { ethers } from 'ethers';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';

const Page: NextPage = () => {
  const [account, setAccount] = useState<string>('');
  const [authMessage, setAuthMessage] = useState('');

  const connectToMetaMask = async () => {
    if ((window as any).ethereum) {
      const provider = new ethers.providers.Web3Provider(
        (window as any).ethereum
      );
      const accounts = await provider.send('eth_requestAccounts', []);
      setAccount(accounts[0]);
    } else {
      alert('MetaMask is not installed');
    }
  };

  const lighthouseAuth = async () => {
    const messageToSign = await (
      await fetch(
        `https://encryption.lighthouse.storage/api/message/${account}`
      )
    ).json();

    setAuthMessage(messageToSign[0].message);
    console.log(messageToSign[0].message);
  };

  const signMessage = async (): Promise<string> => {
    const provider = new ethers.providers.Web3Provider(
      (window as any).ethereum
    );
    const signer = provider.getSigner();
    return await signer.signMessage(authMessage);
  };

  const saveEncryptedFile = async () => {
    const apiKey = process.env.NEXT_PUBLIC_LIGHTHOUSE_API_KEY!;

    const signedMessage = await signMessage();

    console.log(signedMessage);

    const uploadResponse = await lighthouse.textUploadEncrypted(
      'This is a Lighthouse test encrypted',
      apiKey,
      account!,
      signedMessage,
      'testLighthouseEncrypted'
    );

    console.log(uploadResponse);
  };

  const getUploadedFiles = async () => {
    const apiKey = process.env.NEXT_PUBLIC_LIGHTHOUSE_API_KEY!;
    const files = await lighthouse.getUploads(apiKey);

    console.log(files);
  };

  const getFileByCID = async () => {
    const cid = 'bafkreicxgzu5xzxnh66bue557ondbn6lskpsfc4xtho6zsbqi6w7pp53iq';
    const file = await fetch(`https://gateway.lighthouse.storage/ipfs/${cid}`);

    console.log(await file.text());
  };

  const readEncryptedFile = async () => {
    const cid = 'bafkreicxgzu5xzxnh66bue557ondbn6lskpsfc4xtho6zsbqi6w7pp53iq';
    const signedMessage = await signMessage();

    const fileEncryptionKey = await lighthouse.fetchEncryptionKey(
      cid,
      account!,
      signedMessage
    );

    const decrypted = await lighthouse.decryptFile(
      cid,
      fileEncryptionKey!.data!.key!
    );

    console.log(await decrypted.text());
  };

  const shareEncryptedFile = async () => {
    const cid = 'bafkreicxgzu5xzxnh66bue557ondbn6lskpsfc4xtho6zsbqi6w7pp53iq';
    const signedMessage = await signMessage();
    const receiverPk = '0x4795B7bfB19D804b68E921ADbf2a5134467eEBf6';

    const shareResponse = await lighthouse.shareFile(
      account!,
      [receiverPk],
      cid,
      signedMessage
    );

    console.log({ shareResponse });
  };

  return (
    <div className="flex flex-col gap-3 items-center">
      <h1>Lighthouse</h1>

      {!account && (
        <Button onClick={connectToMetaMask}>Connect to MetaMask</Button>
      )}
      {account && <p>Connected account: {account}</p>}
      {account && (
        <AccountSelector
          account={account}
          setAccount={(account: string) => setAccount(account)}
        />
      )}

      {account && (
        <Button onClick={() => lighthouseAuth()}>Lighthouse Auth</Button>
      )}
      <Button onClick={() => saveEncryptedFile()}>Press to Save File</Button>
      <Button onClick={() => getUploadedFiles()}>Get uploaded files</Button>
      <Button onClick={() => getFileByCID()}>Get File</Button>
      <Button onClick={() => readEncryptedFile()}>Read Encrypted File</Button>
      <Button onClick={() => shareEncryptedFile()}>Share Encrypted File</Button>
    </div>
  );
};

const AccountSelector: React.FC<{
  account: string;
  setAccount: (account: string) => void;
}> = ({ account, setAccount }) => {
  const [accounts, setAccounts] = useState<string[]>([]);

  useEffect(() => {
    const fetchAccounts = async () => {
      if ((window as any).ethereum) {
        const provider = new ethers.providers.Web3Provider(
          (window as any).ethereum
        );
        const accounts = await provider.send('eth_requestAccounts', []);
        setAccounts(accounts);
      }
    };

    fetchAccounts();
  }, []);

  const handleAccountChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setAccount(event.target.value);
  };

  return (
    <div>
      <label htmlFor="account">Select Account:</label>
      <select id="account" value={account} onChange={handleAccountChange}>
        {accounts.map((acc) => (
          <option key={acc} value={acc}>
            {acc}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Page;
