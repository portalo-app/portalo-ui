'use client';

import AddressForm from '@components/addresses/AddressForm';
import PageLayout from '@components/layout/PageLayout';
import { ROUTES } from '@constants/routes.const';
import { TypographySmall } from '@core/ui/Typography';
import { ADDRESS_TYPE } from '@models/address';
import { addressFormState } from '@states/address-form.atom';
import { NextPage } from 'next';
import { useRouter, useSearchParams } from 'next/navigation';
import { useRecoilState } from 'recoil';

interface CreateAddressPageProps {
  searchParams: {
    space: string | undefined;
    type: string | undefined;
  };
}

const CreateAddressPage: NextPage<CreateAddressPageProps> = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const spaceId = searchParams.get('space');
  const type = searchParams.get('type');

  const [{ action }, setAddressForm] = useRecoilState(addressFormState);

  const createAddressTitle =
    action === 'CREATE' ? 'Add payment address' : 'Edit Address';

  const subtitle =
    action === 'CREATE'
      ? 'Great! Now lets add the payment details'
      : 'Edit adress';

  const backPath = spaceId
    ? `${ROUTES.APP_SELECT_ENTITY}/${spaceId}/${type}`
    : ROUTES.APP;

  // TODO: Handle invalid slug data
  return (
    <PageLayout title={createAddressTitle} backPath={backPath}>
      <TypographySmall>{subtitle}</TypographySmall>

      <AddressForm
        action={action || 'CREATE'}
        spaceId={spaceId || ''}
        addressType={type as ADDRESS_TYPE}
        onComplete={() => {
          router.push(`${ROUTES.APP_SPACE}/${spaceId}/${type}`);
          setAddressForm({});
        }}
      />
    </PageLayout>
  );
};

export default CreateAddressPage;
