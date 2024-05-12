'use client';

import EntitySelect from '@components/entities/EntitySelect';
import PageLayout from '@components/layout/PageLayout';
import { ROUTES } from '@constants/routes.const';
import { TypographySmall } from '@core/ui/Typography';
import { ADDRESS_TYPE } from '@models/address';
import { addressFormState } from '@states/address-form.atom';
import { NextPage } from 'next';
import { useSetRecoilState } from 'recoil';

interface SelectEntityPageProps {
  params: { slug: any };
}

const SelectEntityPage: NextPage<SelectEntityPageProps> = ({ params }) => {
  const { slug } = params;
  const setAddressForm = useSetRecoilState(addressFormState);

  const spaceId = slug && slug[0];
  const addressType: ADDRESS_TYPE = (slug && slug[1]) as ADDRESS_TYPE;

  const titlePage = 'Add payment address';

  return (
    <PageLayout
      title={titlePage}
      backPath={`${ROUTES.APP_SPACE}/${spaceId}/${addressType}`}
      backClick={() => setAddressForm({})}
    >
      <TypographySmall className="block text-center">
        Select a payment account type
      </TypographySmall>

      <EntitySelect spaceId={spaceId || ''} />
    </PageLayout>
  );
};

export default SelectEntityPage;
