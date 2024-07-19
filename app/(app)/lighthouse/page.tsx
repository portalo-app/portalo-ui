'use client';

import { Button } from '@core/ui/Button';
import lighthouse from '@lighthouse-web3/sdk';
import { ethers } from 'ethers';
import { NextPage } from 'next';
import { useState } from 'react';

const Page: NextPage = () => {
  const [account, setAccount] = useState(null);

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

  const saveFile = async () => {
    const apiKey = process.env.NEXT_PUBLIC_LIGHTHOUSE_API_KEY!;
    const uploadResponse = await lighthouse.uploadText(
      'This is a Lighthouse test',
      apiKey,
      'testLighthouse'
    );

    console.log(uploadResponse);
  };

  const getUploadedFiles = async () => {
    const apiKey = process.env.NEXT_PUBLIC_LIGHTHOUSE_API_KEY!;
    const files = await lighthouse.getUploads(apiKey);

    console.log(files);
  };

  const getFileByCID = async () => {
    const cid = 'bafkreigz3m7a4om2l2vtzinjavyl7b7s5a3uh4fms57tjrjjt5vvduokvq';
    const file = await fetch(`https://gateway.lighthouse.storage/ipfs/${cid}`);

    console.log(await file.text());
  };

  return (
    <div className="flex flex-col gap-3 items-center">
      <h1>Lighthouse</h1>

      <Button onClick={connectToMetaMask}>Connect to MetaMask</Button>
      {account && <p>Connected account: {account}</p>}

      <Button onClick={() => saveFile()}>Press to Save File</Button>
      <Button onClick={() => getUploadedFiles()}>Get uploaded files</Button>
      <Button onClick={() => getFileByCID()}>Get File</Button>
    </div>
  );
};

export default Page;
