'use client';

import AddressList from '@components/addresses/AddressList';
import PageLayout from '@components/layout/PageLayout';
import { ROUTES } from '@constants/routes.const';
import { Button } from '@core/ui/Button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@core/ui/Tab';
import { TypographySmall } from '@core/ui/Typography';
import { ADDRESS_TYPE } from '@models/address';
import { Profile } from '@models/profile';
import { addressFormState } from '@states/address-form.atom';
import { profilesState } from '@states/profiles.atom';
import { NextPage } from 'next';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

interface ProfilePageProps {}

const ProfilePage: NextPage<
  // TODO Add corresponding type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ProfilePageProps & { params: { slug: any } }
> = ({ params }) => {
  const { slug } = params;

  const profilesData = useRecoilValue(profilesState);

  const setAddressForm = useSetRecoilState(addressFormState);
  const [addressType, setAddressType] = useState('crypto');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [profile, setProfile] = useState<Profile | null>(null);
  const router = useRouter();

  useEffect(() => {
    setIsLoading(true);

    const id = slug && slug[0];
    const type: ADDRESS_TYPE = (slug && slug[1]) as ADDRESS_TYPE;

    if (type) setAddressType(type === ADDRESS_TYPE.FIAT ? 'fiat' : 'crypto');

    if (!id) return;

    setIsLoading(false);
    const selectedProfile = profilesData.find((profile) => profile.id === id);

    if (!selectedProfile) {
      router.push(ROUTES.APP);
      return;
    }

    setProfile(selectedProfile);
  }, [profilesData, router, slug]);

  const handleChange = (newValue: string) => {
    setAddressType(newValue);
  };

  const handleCreateAddress = () => {
    const type =
      addressType === 'crypto' ? ADDRESS_TYPE.CRYPTO : ADDRESS_TYPE.FIAT;

    setAddressForm((currentValue) => ({ ...currentValue, action: 'CREATE' }));
    router.push(`${ROUTES.APP_SELECT_ENTITY}/${profile?.id}/${type}`);
  };

  return (
    <PageLayout
      title={`Hello ${profile?.name}!` || 'Loading...'}
      backPath={ROUTES.APP}
    >
      <div className="flex justify-between mt-6">
        <TypographySmall className="flex items-center">
          Your payment addresses
        </TypographySmall>
        <Button variant="secondary" onClick={handleCreateAddress}>
          + Add Address
        </Button>
      </div>
      <Tabs
        defaultValue="crypto"
        className="flex flex-col w-full justify-center content-center"
        onValueChange={handleChange}
      >
        <TabsList className="space-x-6">
          <TabsTrigger value="crypto">
            {`Crypto Accounts (${profile?.cryptoAddresses?.length || 0})`}
          </TabsTrigger>
          <TabsTrigger value="fiat">{`Bank Accounts (${
            profile?.fiatAddresses?.length || 0
          })`}</TabsTrigger>
        </TabsList>
        <TabsContent value="crypto">
          {isLoading ? (
            'loading...' // TODO ->  add skeleton
          ) : (
            <div>
              <AddressList
                profileId={profile?.id || ''}
                addresses={profile?.cryptoAddresses || []}
                addressType={ADDRESS_TYPE.CRYPTO}
                onClick={handleCreateAddress}
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
                profileId={profile?.id || ''}
                addresses={profile?.fiatAddresses || []}
                addressType={ADDRESS_TYPE.FIAT}
                onClick={handleCreateAddress}
              />
            </div>
          )}
        </TabsContent>
      </Tabs>
    </PageLayout>
  );
};

export default ProfilePage;
