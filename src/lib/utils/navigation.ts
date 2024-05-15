import { ROUTES } from '@constants/routes.const';
import { ADDRESS_TYPE } from '@models/address';

export const getCreateAddressURL = (
  spaceId: string,
  addressType: ADDRESS_TYPE
) => {
  const params = new URLSearchParams({ space: spaceId, type: addressType });

  return `${ROUTES.APP_CREATE_ADDRESS}?${params.toString()}`;
};
