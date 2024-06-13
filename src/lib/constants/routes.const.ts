export const ROUTES = {
  APP: '/',
  APP_HELP: '/help',
  APP_SPACE: '/spaces',
  APP_CREATE_SPACE: '/spaces/new',
  APP_VAULT: '/vaults',
  APP_CREATE_VAULT: '/vaults/new',
  APP_ADDRESS: '/addresses',
  APP_CREATE_ADDRESS: '/addresses/new',
  APP_SELECT_ENTITY: '/select-entity',
  APP_NOTIFICATION: '/notifications',
  APP_SETTINGS: '/settings',
  APP_ABOUT: '/about',
} as const;

export type ObjectValues<T> = T[keyof T];

export type Routes = ObjectValues<typeof ROUTES>;
export type RoutesKeys = keyof typeof ROUTES;

export type route = {
  title: string;
  url: Routes;
  readOnly: boolean;
};

export const ROUTES_LAYOUT: route[] = [
  {
    title: 'Home',
    url: ROUTES.APP,
    readOnly: true,
  },
  {
    title: 'Help',
    url: ROUTES.APP_HELP,
    readOnly: true,
  },
  {
    title: 'Spaces',
    url: ROUTES.APP_SPACE,
    readOnly: true,
  },
  {
    title: 'Create Space',
    url: ROUTES.APP_CREATE_SPACE,
    readOnly: true,
  },
  {
    title: 'Vaults',
    url: ROUTES.APP_VAULT,
    readOnly: true,
  },
  {
    title: 'Create Vaults',
    url: ROUTES.APP_CREATE_VAULT,
    readOnly: true,
  },
  {
    title: 'Addresses',
    url: ROUTES.APP_ADDRESS,
    readOnly: true,
  },
  {
    title: 'Create Address',
    url: ROUTES.APP_CREATE_ADDRESS,
    readOnly: true,
  },
  {
    title: 'Select Entity',
    url: ROUTES.APP_SELECT_ENTITY,
    readOnly: true,
  },
  {
    title: 'Notifications',
    url: ROUTES.APP_NOTIFICATION,
    readOnly: true,
  },
  {
    title: 'Settings',
    url: ROUTES.APP_SETTINGS,
    readOnly: true,
  },
  {
    title: 'About',
    url: ROUTES.APP_ABOUT,
    readOnly: true,
  },
];
