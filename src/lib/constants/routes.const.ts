export const ROUTES = {
  APP: '/',
  APP_HELP: '/help',
  APP_SPACE: '/spaces',
  APP_CREATE_SPACE: '/spaces/new',
  APP_CREATE_ADDRESS: '/create-address',
  APP_SELECT_ENTITY: '/select-entity',
} as const;

export type ObjectValues<T> = T[keyof T];

export type Routes = ObjectValues<typeof ROUTES>;
export type RoutesKeys = keyof typeof ROUTES;
