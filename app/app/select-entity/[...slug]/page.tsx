'use client';

import EntitySelect from '@components/entities/EntitySelect';
import PageLayout from '@components/layout/PageLayout';
import { ROUTES } from '@constants/routes.const';
import { ADDRESS_TYPE } from '@models/address';
import { addressFormState } from '@states/address-form.atom';
import { NextPage } from 'next';
import { useSetRecoilState } from 'recoil';

interface SelecteEntityPageProps { }
const SelectEntityPage: NextPage<
  // TODO Add corresponding type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  SelecteEntityPageProps & { params: { slug: any } }
> = ({ params }) => {
  const { slug } = params;
  const setAddressForm = useSetRecoilState(addressFormState);

  const profileId = slug && slug[0];
  const addressType: ADDRESS_TYPE = (slug && slug[1]) as ADDRESS_TYPE;

  // const selectEntityTitle = `Select a ${addressType === ADDRESS_TYPE.CRYPTO ? 'Chain' : 'Bank'}`;

  const titlePage = 'Add payment address'

  return (
    <PageLayout
      title={titlePage}
      backPath={`${ROUTES.APP_PROFILE}/${profileId}/${addressType}`}
      backClick={() => setAddressForm({})}
    >
      <p className='text-center'>Select a payment account type</p>
      <EntitySelect
        profileId={profileId || ''}
      // addressType={addressType}
      ></EntitySelect>
    </PageLayout>
  );
};

export default SelectEntityPage;
