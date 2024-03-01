'use client';

import AddressList from '@components/addresses/AddressList';
import PageLayout from '@components/layout/PageLayout';
import { ROUTES } from '@constants/routes.const';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@core/ui/Tab';
import { TypographySmall } from '@core/ui/Typography';
import useSecretContract from '@hooks/useSecretContract';
import { ADDRESS_TYPE } from '@models/address';
import { Profile } from '@models/profile';
import { NextPage } from 'next';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface ViewProfilePageProps {}

const ViewProfilePage: NextPage<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ViewProfilePageProps & { params: { slug: any } }
> = ({ params }) => {
  const { slug } = params;

  const [profileData, setProfileData] = useState<Profile>();

  const [addressType, setAddressType] = useState('crypto');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const { getDataByViewingKey } = useSecretContract();
  useEffect(() => {
    setIsLoading(true);
    /*PARAMS: 
    - Viewing Key del Profile
    - ADDRESS_TYPE
    */

    // When we generate the sharable link we have to use encodeURIComponent
    const viewingKey = slug && decodeURIComponent(slug[0]);

    if (!viewingKey) return;

    const queryContract = async () => {
      const data = await getDataByViewingKey(viewingKey);
      setProfileData(data);

      setIsLoading(false);
    };

    queryContract();
  }, [router, slug]);

  const handleChange = (newValue: string) => {
    setAddressType(newValue);
  };

  return (
    <PageLayout
      title={`${profileData?.name}'s Profile` || 'Loading...'}
      backPath={ROUTES.APP}
    >
      <div className="my-4">
        <TypographySmall className="capitalize">
          {profileData?.name} payment addresses
        </TypographySmall>
      </div>
      <Tabs
        defaultValue="crypto"
        value={addressType}
        onValueChange={handleChange}
      >
        <TabsList className="space-x-4">
          <TabsTrigger value="crypto">
            {`Crypto Accounts (${profileData?.cryptoAddresses?.length || 0})`}
          </TabsTrigger>
          <TabsTrigger value="fiat">{`Bank Accounts (${
            profileData?.fiatAddresses?.length || 0
          })`}</TabsTrigger>
        </TabsList>
        <TabsContent value="crypto">
          {isLoading ? (
            'loading...' // TODO ->  add skeleton
          ) : (
            <div>
              <AddressList
                profileId={profileData?.id || ''}
                addresses={profileData?.cryptoAddresses || []}
                addressType={ADDRESS_TYPE.CRYPTO}
                editable={false}
              />
            </div>
          )}
        </TabsContent>
        <TabsContent value="fiat">
          {isLoading ? (
            'loading...' // TODO -> add skeleton
          ) : (
            <div>
              <AddressList
                profileId={profileData?.id || ''}
                addresses={profileData?.fiatAddresses || []}
                addressType={ADDRESS_TYPE.FIAT}
                editable={false}
              />
            </div>
          )}
        </TabsContent>
      </Tabs>
    </PageLayout>
  );
};

export default ViewProfilePage;
