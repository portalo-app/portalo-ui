import { ROUTES } from '@constants/routes.const';
import { ADDRESS_TYPE } from '@models/address';

export const getCreateAddressURL = (
  spaceId: string,
  addressType: ADDRESS_TYPE
) => {
  const params = new URLSearchParams({ space: spaceId, type: addressType });

  return `${ROUTES.APP_CREATE_ADDRESS}?${params.toString()}`;
};

export const getCreateVaultURL = (spaceId?: string) => {
  if (!spaceId) return '';

  return `${ROUTES.APP_SPACE}/${spaceId}/${ROUTES.APP_CREATE_VAULT}`;
};

export const getVaultURL = (spaceId?: string, vaultId?: string) => {
  if (!spaceId || !vaultId) return '';

  return `${ROUTES.APP_VAULT}/${vaultId}`;
};
