import AddressForm from '@/components/addresses/AddressForm';
import PageLayout from '@/components/layout/PageLayout';
import { ROUTES } from '@/lib/constants/routes.const';
import { ADDRESS_TYPE } from '@/lib/model/address';
import { addressFormState } from '@/lib/store/address-form.atom';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';

interface CreateAddressPageProps {}

const CreateAddressPage: NextPage<CreateAddressPageProps> = () => {
  const router = useRouter();
  const { slug } = router.query;

  const [{ action, entity }, setAddressForm] = useRecoilState(addressFormState);

  const profileId = slug && slug[0];
  const addressType: ADDRESS_TYPE = (slug && slug[1]) as ADDRESS_TYPE;

  const createAddressTitle =
    action === 'CREATE' ? 'Create Address' : 'Edit Address';
  const backPath = profileId
    ? `${ROUTES.APP_SELECT_ENTITY}/${profileId}/${addressType}`
    : ROUTES.APP;

  useEffect(() => {
    if (!entity) router.push(backPath);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // TODO: Handle invalid slug data
  return (
    <PageLayout title={createAddressTitle} backPath={backPath}>
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
