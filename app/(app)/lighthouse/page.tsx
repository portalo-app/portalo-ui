'use client';

import { Button } from '@core/ui/Button';
import lighthouse from '@lighthouse-web3/sdk';
import { NextPage } from 'next';

const Page: NextPage = () => {
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
      <p>Page with lighthouse score of 100</p>
      <Button onClick={() => saveFile()}>Press to Save File</Button>
      <Button onClick={() => getUploadedFiles()}>Get uploaded files</Button>
      <Button onClick={() => getFileByCID()}>Get File</Button>
    </div>
  );
};

export default Page;
