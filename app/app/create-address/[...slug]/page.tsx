'use client';

import AddressForm from '@components/addresses/AddressForm';
import PageLayout from '@components/layout/PageLayout';
import { ROUTES } from '@constants/routes.const';
import { TypographySmall } from '@core/ui/Typography';
import { ADDRESS_TYPE } from '@models/address';
import { addressFormState } from '@states/address-form.atom';
import { NextPage } from 'next';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';

interface CreateAddressPageProps { }

const CreateAddressPage: NextPage<
  // TODO Add corresponding type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  CreateAddressPageProps & { params: { slug: any } }
> = ({ params }) => {
  const router = useRouter();
  const { slug } = params;

  const [{ action }, setAddressForm] = useRecoilState(addressFormState); //entity

  const profileId = slug && slug[0];
  const addressType: ADDRESS_TYPE = (slug && slug[1]) as ADDRESS_TYPE;

  const createAddressTitle =
    action === 'CREATE' ? 'Add payment address' : 'Edit Address';

  const subtitle = action === 'CREATE' ? 'Great! Now lets add the payment details' : 'Edit adress';

  const backPath = profileId
    ? `${ROUTES.APP_SELECT_ENTITY}/${profileId}/${addressType}`
    : ROUTES.APP;

  useEffect(() => {
    // if (!entity) router.push(backPath);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // TODO: Handle invalid slug data
  return (
    <PageLayout title={createAddressTitle} backPath={backPath}>
      <TypographySmall className='block text-center'>{subtitle}</TypographySmall>
      <AddressForm
        action={action || 'CREATE'}
        profileId={profileId || ''}
        addressType={addressType}
        onComplete={() => {
          router.push(`${ROUTES.APP_PROFILE}/${profileId}/${addressType}`);
          setAddressForm({});
        }}
      />
    </PageLayout>
  );
};

export default CreateAddressPage;
