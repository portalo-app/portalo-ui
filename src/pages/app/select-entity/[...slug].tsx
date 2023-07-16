import EntitySelect from '@/components/entities/EntitySelect';
import PageLayout from '@/components/layout/PageLayout';
import { ROUTES } from '@/lib/constants/routes.const';
import { AddressType } from '@/lib/model/address';
import { addressFormState } from '@/lib/store/address-form.atom';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';

interface SelecteEntityPageProps {}

const SelectEntityPage: NextPage<SelecteEntityPageProps> = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [_, setAddressForm] = useRecoilState(addressFormState);

  const profileId = slug && slug[0];
  const addressType: AddressType = (slug && slug[1]) as AddressType;

  const selectEntityTitle = `Select a ${
    addressType === 'CRYPTO' ? 'Chain' : 'Bank'
  }`;

  return (
    <PageLayout
      title={selectEntityTitle}
      backPath={`${ROUTES.APP_PROFILE}/${profileId}/${addressType}`}
      backClick={() => setAddressForm({})}
    >
      <EntitySelect
        profileId={profileId || ''}
        entityType={addressType}
      ></EntitySelect>
    </PageLayout>
  );
};

export default SelectEntityPage;
