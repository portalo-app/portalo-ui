import AddressForm from '@/components/addresses/AddressForm';
import PageLayout from '@/components/layout/PageLayout';
import { ROUTES } from '@/lib/constants/routes.const';
import { AddressType } from '@/lib/model/address';
import { NextPage } from 'next';
import { useRouter } from 'next/router';

interface CreateAddressPageProps {}

const CreateAddressPage: NextPage<CreateAddressPageProps> = () => {
  const router = useRouter();
  const { slug } = router.query;

  const profileId = slug && slug[0];
  const addressType: AddressType = (slug && slug[1]) as AddressType;

  const createAddressTitle = 'Create Address';
  const backPath = profileId
    ? `${ROUTES.APP_PROFILE}/${profileId}`
    : ROUTES.APP;

  // TODO: Handle invalid slug data
  return (
    <PageLayout title={createAddressTitle} backPath={backPath}>
      <AddressForm
        action="CREATE"
        profileId={profileId || ''}
        addressType={addressType}
        onComplete={() => router.push(backPath)}
      />
    </PageLayout>
  );
};

export default CreateAddressPage;
