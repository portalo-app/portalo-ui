'use client';

import { Button } from '@core/ui/Button';
import { Card } from '@core/ui/Card';
import ResponsiveDialog from '@core/ui/ResponsiveDialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@core/ui/Tab';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@core/ui/Tooltip';
import { TypographyH4, TypographyMutedXS } from '@core/ui/Typography';
import useEncrypt from '@hooks/useEncrypt';
import { ProfileDTO } from '@models/dto/profile.dto';
import { ZkProfile } from '@models/zk/zkProfile.model';
import Avvvatars from 'avvvatars-react';
import { Cloud, HardDrive, Share2, TriangleAlert, Users } from 'lucide-react';
import lzString from 'lz-string';
import { QRCodeSVG } from 'qrcode.react';
import { FC, useState } from 'react';
import { Abi } from 'viem';
import { useAccount, useReadContract, useSignMessage } from 'wagmi';
import abi from '../../lib/contracts/portalo_contract_abi.json';
import CopyButton from './CopyButton';

interface ShareButtonProps {
  profile: ProfileDTO;
  title?: string;
}

const contract = process.env.NEXT_PUBLIC_PORTALO_CONTRACT_ADDRESS;

const ShareButton: FC<ShareButtonProps> = ({ profile, title }) => {
  const { decryptSymmetric } = useEncrypt();
  const { signMessageAsync } = useSignMessage();
  const { connector, address } = useAccount();

  const [selectedTab, setSelectedTab] = useState('cloud');
  const [cloudURL, setCloudUrl] = useState('');

  const { data } = useReadContract({
    abi: abi as unknown as Abi,
    address: contract as `0x${string}`,
    functionName: 'getProfileById',
    args: [profile.id],
  });

  const profileToShare = {
    ...profile,
    folders: profile.folders.filter((folder) => folder.files.length > 0),
  };

  const JSONProfile = JSON.stringify(profileToShare);
  const compressed = lzString.compressToEncodedURIComponent(JSONProfile);

  const localURL = `${window.location.origin}/profiles/share?profile=${compressed}`;

  // TODO: Model 'OFFLINE' or 'CLOUD'
  const profileStatus = 'OFFLINE';

  // TODO: Implement
  const goToManageAccess = () => {
    // router.push(`/profiles/${profile.id}/manage-access`);
  };

  const getUrl = async () => {
    const signature = await signMessageAsync({
      account: address,
      message: (data as ZkProfile).nonce,
      connector,
    });

    // desencriṕtar la key
    const key = await decryptSymmetric(
      (data as ZkProfile).profileEncryptionKey,
      signature
    );

    setCloudUrl(
      `${window.location.origin}/profiles/cloudshare?id=${(data as ZkProfile).profileId}&key=${key}`
    );
  };

  // TODO: Implement
  const goToUpload = () => {
    // router.push(`/profiles/${profile.id}/upload`);
  };

  const handleTabChange = (value: string) => {
    setSelectedTab(value);
  };

  return (
    <ResponsiveDialog
      title={''}
      trigger={
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger className="w-full">
              <Button
                variant="outline"
                className="flex gap-2 rounded-xl w-full"
                onClick={getUrl}
              >
                <Share2 size={20} />
                {title}
              </Button>
            </TooltipTrigger>
            <TooltipContent className="text-wrap max-w-[100ch]">
              Share Profile
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      }
    >
      <div className="text-center space-y-2 grid place-items-center">
        <div className="flex justify-center items-center rounded w-full">
          {/* TOOLBAR */}
          <div className="flex items-center gap-2">
            <Avvvatars value={profile.name} size={42} />

            <TypographyH4 className="text-left">{profile.name}</TypographyH4>
          </div>
        </div>

        <Tabs
          className="px-4 pt-2"
          defaultValue={selectedTab}
          onValueChange={handleTabChange}
        >
          <TabsList className="w-full border border-muted rounded-full h-10 px-1 bg-muted/25 *:flex-1 *:gap-2">
            <TabsTrigger value="cloud">
              <Cloud />
              Cloud
            </TabsTrigger>

            <TabsTrigger value="local">
              <HardDrive />
              Local
            </TabsTrigger>
          </TabsList>

          <TabsContent value="cloud">
            <div className="w-full space-y-2">
              {profileStatus === 'OFFLINE' && (
                <Card
                  className="flex items-center p-2 gap-2 text-destructive border-destructive"
                  onClick={goToUpload}
                >
                  <TriangleAlert />

                  <Button variant="link" className="text-destructive">
                    Click to upload this profile to the cloud
                  </Button>
                </Card>
              )}

              <QRCodeSVG
                includeMargin
                value={cloudURL}
                size={512}
                className="w-full h-fit rounded-3xl"
              />

              <TypographyMutedXS className="max-w-[50ch] overflow-hidden text-nowrap text-ellipsis">
                {cloudURL}
              </TypographyMutedXS>
            </div>
          </TabsContent>

          <TabsContent value="local">
            <div className="w-full space-y-2">
              <QRCodeSVG
                includeMargin
                value={localURL}
                size={512}
                className="w-full h-fit rounded-3xl"
              />
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex flex-col gap-3 w-full pb-3 pt-5">
          <div className="flex *:flex-1 gap-2">
            <CopyButton text={cloudURL} />

            <Button variant="outline" className="gap-2">
              <Share2 />
              Share
            </Button>
          </div>

          {selectedTab === 'cloud' && (
            <Button className="gap-2" onClick={goToManageAccess} disabled>
              <Users />
              Manage Access
            </Button>
          )}
        </div>
      </div>
    </ResponsiveDialog>
  );
};

export default ShareButton;
