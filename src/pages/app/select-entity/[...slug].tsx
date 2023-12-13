import EntitySelect from '@components/entities/EntitySelect';
import PageLayout from '@components/layout/PageLayout';
import { ROUTES } from '@constants/routes.const';
import { ADDRESS_TYPE } from '@models/address';
import { addressFormState } from '@states/address-form.atom';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useSetRecoilState } from 'recoil';

interface SelecteEntityPageProps {}

const SelectEntityPage: NextPage<SelecteEntityPageProps> = () => {
  const router = useRouter();
  const { slug } = router.query;
  const setAddressForm = useSetRecoilState(addressFormState);

  const profileId = slug && slug[0];
  const addressType: ADDRESS_TYPE = (slug && slug[1]) as ADDRESS_TYPE;

  const selectEntityTitle = `Select a ${
    addressType === ADDRESS_TYPE.CRYPTO ? 'Chain' : 'Bank'
  }`;

  return (
    <PageLayout
      title={selectEntityTitle}
      backPath={`${ROUTES.APP_PROFILE}/${profileId}/${addressType}`}
      backClick={() => setAddressForm({})}
    >
      <EntitySelect
        profileId={profileId || ''}
        addressType={addressType}
      ></EntitySelect>
    </PageLayout>
  );
};

export default SelectEntityPage;
